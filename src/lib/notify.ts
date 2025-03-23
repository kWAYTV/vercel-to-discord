import { logger } from "@/lib/logger";
import { env } from "@/env";

import {
  type DiscordMessage,
  type DiscordEmbedField,
  type StateProperty,
} from "@/types/discord";
import { type VercelWebhook, type WebhookType } from "@/types/vercel";

import HttpStatusCode from "@/enums/http-status-codes";

import { COLORS, EMOJIS } from "@/consts/discord";

/**
 * Maps webhook types to their corresponding state properties (colors, emojis)
 */
function getStateProperty(
  type: WebhookType,
  property: StateProperty
): number | string {
  const mappings = {
    color: {
      "deployment.created": COLORS.PENDING,
      "deployment.succeeded": COLORS.SUCCESS,
      "deployment.ready": COLORS.SUCCESS,
      "deployment.promoted": COLORS.PROMOTED,
      "deployment.error": COLORS.ERROR,
      "deployment.canceled": COLORS.CANCELED,
      default: COLORS.INFO,
    },
    emoji: {
      "deployment.created": EMOJIS.PENDING,
      "deployment.succeeded": EMOJIS.SUCCESS,
      "deployment.ready": EMOJIS.SUCCESS,
      "deployment.promoted": EMOJIS.PROMOTED,
      "deployment.error": EMOJIS.ERROR,
      "deployment.canceled": EMOJIS.CANCELED,
      default: EMOJIS.DEPLOY,
    },
  };

  return (
    mappings[property][type as keyof (typeof mappings)[typeof property]] ||
    mappings[property].default
  );
}

/**
 * Creates GitHub-related fields for the Discord message
 */
function createGithubFields(
  deployment: VercelWebhook["payload"]["deployment"]
): DiscordEmbedField[] {
  if (!deployment.meta.githubCommitRef) {
    return [];
  }

  const fields: DiscordEmbedField[] = [];
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

  return fields;
}

/**
 * Creates the deployment URL field for successful deployments
 */
function createDeploymentUrlField(
  webhookType: WebhookType,
  deploymentUrl: string
): DiscordEmbedField[] {
  if (
    webhookType === "deployment.succeeded" ||
    webhookType === "deployment.ready"
  ) {
    return [
      {
        name: "🌐 Preview URL",
        value: `[${new URL(deploymentUrl).hostname}](${deploymentUrl})`,
        inline: false,
      },
    ];
  }

  return [];
}

export function createDeploymentMessage(
  webhook: VercelWebhook
): DiscordMessage {
  const { deployment, links } = webhook.payload;
  const state = webhook.type.split(".")[1];
  const stateEmoji = getStateProperty(webhook.type, "emoji") as string;
  const deploymentUrl = links.deployment;

  const baseFields = [
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

  const githubFields = createGithubFields(deployment);
  const deploymentUrlFields = createDeploymentUrlField(
    webhook.type,
    deploymentUrl
  );

  const allFields = [...baseFields, ...githubFields, ...deploymentUrlFields];

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
        color: getStateProperty(webhook.type, "color") as number,
        fields: allFields,
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
      const response = await fetch(env.DISCORD_WEBHOOK_URL, {
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
