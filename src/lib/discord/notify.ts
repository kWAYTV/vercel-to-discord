import { logger } from "@/lib/logger";
import { CONFIG } from "@/lib/config";

import { type DiscordMessage } from "@/lib/discord/types";
import { type VercelWebhook } from "@/lib/vercel/types";

import HttpStatusCode from "@/enums/http-error-codes";

const COLORS = {
  PROMOTED: 0xd998e3, // Bright purple
  SUCCESS: 0x2ecc71, // Bright green
  ERROR: 0xe74c3c, // Bright red
  CANCELED: 0x95a5a6, // Light gray
  INFO: 0x3498db, // Bright blue
  PENDING: 0xf1c40f, // Bright yellow
} as const;

const EMOJIS = {
  PROMOTED: "🔗",
  SUCCESS: "✅",
  ERROR: "❌",
  CANCELED: "🚫",
  PENDING: "⏳",
  BRANCH: "🌿",
  COMMIT: "📝",
  PROJECT: "📦",
  DEPLOY: "🚀",
} as const;

function getStateColor(type: VercelWebhook["type"]): number {
  switch (type) {
    case "deployment.created":
      return COLORS.PENDING;
    case "deployment.succeeded":
    case "deployment.ready":
      return COLORS.SUCCESS;
    case "deployment.promoted":
      return COLORS.PROMOTED;
    case "deployment.error":
      return COLORS.ERROR;
    case "deployment.canceled":
      return COLORS.CANCELED;
    default:
      return COLORS.INFO;
  }
}

function getStateEmoji(type: VercelWebhook["type"]): string {
  switch (type) {
    case "deployment.created":
      return EMOJIS.PENDING;
    case "deployment.succeeded":
    case "deployment.ready":
      return EMOJIS.SUCCESS;
    case "deployment.promoted":
      return EMOJIS.PROMOTED;
    case "deployment.error":
      return EMOJIS.ERROR;
    case "deployment.canceled":
      return EMOJIS.CANCELED;
    default:
      return EMOJIS.DEPLOY;
  }
}

export function createDeploymentMessage(
  webhook: VercelWebhook
): DiscordMessage {
  const { deployment, links } = webhook.payload;
  const state = webhook.type.split(".")[1];
  const stateEmoji = getStateEmoji(webhook.type);

  const deploymentUrl = links.deployment;

  const fields = [
    {
      name: `${EMOJIS.PROJECT} Project`,
      value: `[${deployment.name}](${links.project})`,
      inline: true,
    },
    {
      name: "🔗 Environment",
      value: deployment.meta.target || "production",
      inline: true,
    },
  ];

  if (deployment.meta.githubCommitRef) {
    const githubCommitUrl = `https://github.com/${deployment.meta.githubCommitOrg}/${deployment.meta.githubCommitRepo}/commit/${deployment.meta.githubCommitSha}`;
    const shortSha = deployment.meta.githubCommitSha?.slice(0, 7);

    fields.push(
      {
        name: `${EMOJIS.BRANCH} Branch`,
        value: `\`${deployment.meta.githubCommitRef}\``,
        inline: true,
      },
      {
        name: `${EMOJIS.COMMIT} Commit`,
        value: `[${shortSha}](${githubCommitUrl})`,
        inline: true,
      }
    );

    if (deployment.meta.githubCommitMessage) {
      fields.push({
        name: "💬 Commit Message",
        value: `\`\`\`\n${deployment.meta.githubCommitMessage}\`\`\``,
        inline: false,
      });
    }
  }

  // Add deployment URL for successful deployments
  if (
    webhook.type === "deployment.succeeded" ||
    webhook.type === "deployment.ready"
  ) {
    fields.push({
      name: "🌐 Preview URL",
      value: `[${new URL(deploymentUrl).hostname}](${deploymentUrl})`,
      inline: false,
    });
  }

  return {
    embeds: [
      {
        title: `${stateEmoji} Deployment ${state}`,
        url: deploymentUrl,
        description: [
          `**Status**: ${state.charAt(0).toUpperCase() + state.slice(1)}`,
          webhook.type === "deployment.error" && deployment.meta.buildError
            ? `\n**Error**: \`\`\`\n${deployment.meta.buildError}\`\`\``
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
        color: getStateColor(webhook.type),
        fields,
        timestamp: new Date(webhook.createdAt).toISOString(),
        footer: {
          text: `Deployment ${deployment.id}`,
        },
      },
    ],
    username: "Vercel",
    avatar_url:
      "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
  } satisfies DiscordMessage;
}

export async function sendDiscordNotification(
  message: DiscordMessage
): Promise<void> {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(CONFIG.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (response.status === HttpStatusCode.TOO_MANY_REQUESTS_429) {
        const retryAfter = response.headers.get("Retry-After");
        logger.warn(`Rate limited, retrying after ${retryAfter} seconds`);
        await new Promise((resolve) =>
          setTimeout(resolve, (parseInt(retryAfter ?? "5") + 1) * 1000)
        );
        continue;
      }

      if (!response.ok) {
        throw new Error(
          `Discord API returned ${response.status}: ${response.statusText}`
        );
      }

      logger.success("Discord notification sent successfully");
      return;
    } catch (error) {
      if (i === 2) throw error;
      logger.warn(`Retry ${i + 1}/3 after error`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
