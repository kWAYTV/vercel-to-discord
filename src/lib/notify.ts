import { env } from "@/env";

import { type DiscordMessage, type DiscordEmbedField } from "@/types/discord";
import { type VercelWebhook, type WebhookType } from "@/types/vercel";

import HttpStatusCode from "@/enums/http-status-codes";

import { EMOJIS, getStateProperty } from "@/consts/discord";

// Define bot info centrally
const DISCORD_BOT_USERNAME = "Vercel";
const DISCORD_BOT_AVATAR_URL =
  "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png";

/**
 * Creates GitHub-related fields for the Discord message
 */
function createGithubFields(
  deployment?: VercelWebhook["payload"]["deployment"]
): DiscordEmbedField[] {
  if (!deployment?.meta?.githubCommitRef) {
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
      name: `${EMOJIS.MESSAGE} Commit Message`,
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
  deploymentUrl?: string
): DiscordEmbedField[] {
  if (
    deploymentUrl &&
    (webhookType === "deployment.succeeded" ||
      webhookType === "deployment.ready")
  ) {
    return [
      {
        name: `${EMOJIS.URL} Preview URL`,
        value: `[${new URL(deploymentUrl).hostname}](${deploymentUrl})`,
        inline: false,
      },
    ];
  }

  return [];
}

/**
 * Creates a message for deployment events
 */
export function createDeploymentMessage(
  webhook: VercelWebhook
): DiscordMessage {
  const { deployment, links } = webhook.payload;

  if (!deployment || !links) {
    return createGenericMessage(webhook);
  }

  const state = webhook.type.split(".")[1];
  const stateEmoji = getStateProperty(webhook.type, "emoji") as string;
  const stateColor = getStateProperty(webhook.type, "color") as number;
  const deploymentUrl = links.deployment;

  const baseFields = [
    {
      name: `${EMOJIS.PROJECT} Project`,
      value: `[${deployment.name}](${links.project})`,
      inline: true,
    },
    {
      name: `${EMOJIS.ENV} Environment`,
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

  // Simplified description building
  let description = `**Status**: ${
    state.charAt(0).toUpperCase() + state.slice(1)
  }`;
  if (webhook.type === "deployment.error" && deployment.meta.buildError) {
    description += `\n**Error**: \`\`\`\n${deployment.meta.buildError}\`\`\``;
  }

  return {
    embeds: [
      {
        title: `${stateEmoji} Deployment ${state}`,
        url: deploymentUrl,
        description: description,
        color: stateColor,
        fields: allFields,
        timestamp: new Date(webhook.createdAt).toISOString(),
        footer: {
          text: `Deployment ${deployment.id}`,
        },
      },
    ],
    username: DISCORD_BOT_USERNAME,
    avatar_url: DISCORD_BOT_AVATAR_URL,
  } satisfies DiscordMessage;
}

/**
 * Creates a message for domain events
 */
export function createDomainMessage(webhook: VercelWebhook): DiscordMessage {
  const { domain } = webhook.payload;
  const eventEmoji = getStateProperty(webhook.type, "emoji") as string;
  const eventColor = getStateProperty(webhook.type, "color") as number;

  if (!domain) {
    return createGenericMessage(webhook);
  }

  return {
    embeds: [
      {
        title: `${eventEmoji} Domain ${webhook.type.split(".")[1]}`,
        description: `**Domain**: ${domain.name}`,
        color: eventColor,
        timestamp: new Date(webhook.createdAt).toISOString(),
      },
    ],
    username: DISCORD_BOT_USERNAME,
    avatar_url: DISCORD_BOT_AVATAR_URL,
  } satisfies DiscordMessage;
}

/**
 * Creates a message for project events
 */
export function createProjectMessage(webhook: VercelWebhook): DiscordMessage {
  const { project } = webhook.payload;
  const eventEmoji = getStateProperty(webhook.type, "emoji") as string;
  const eventColor = getStateProperty(webhook.type, "color") as number;

  if (!project) {
    return createGenericMessage(webhook);
  }

  return {
    embeds: [
      {
        title: `${eventEmoji} Project ${webhook.type.split(".")[1]}`,
        description: `**Project**: ${project.id}`,
        color: eventColor,
        timestamp: new Date(webhook.createdAt).toISOString(),
      },
    ],
    username: DISCORD_BOT_USERNAME,
    avatar_url: DISCORD_BOT_AVATAR_URL,
  } satisfies DiscordMessage;
}

/**
 * Creates a generic message for any event type
 */
export function createGenericMessage(webhook: VercelWebhook): DiscordMessage {
  const eventType = webhook.type;
  const eventEmoji = getStateProperty(eventType, "emoji") as string;
  const eventColor = getStateProperty(eventType, "color") as number;
  const parts = eventType.split(".");

  // Format the event name for better readability
  const formattedEvent = parts
    .map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")
    )
    .join(" • ");

  return {
    embeds: [
      {
        title: `${eventEmoji} ${formattedEvent}`,
        description: `Webhook event received at ${new Date(
          webhook.createdAt
        ).toISOString()}`,
        color: eventColor,
        timestamp: new Date(webhook.createdAt).toISOString(),
        footer: {
          text: `Event ID: ${webhook.id}`,
        },
      },
    ],
    username: DISCORD_BOT_USERNAME,
    avatar_url: DISCORD_BOT_AVATAR_URL,
  } satisfies DiscordMessage;
}

/**
 * Creates the appropriate Discord message based on the webhook type
 */
const messageCreators: Partial<
  Record<string, (webhook: VercelWebhook) => DiscordMessage>
> = {
  deployment: createDeploymentMessage,
  domain: createDomainMessage,
  project: createProjectMessage,
};

export function createMessageFromWebhook(
  webhook: VercelWebhook
): DiscordMessage {
  const typePrefix = webhook.type.split(".")[0];
  const creator = messageCreators[typePrefix];

  if (creator) {
    return creator(webhook);
  }

  // For all other event types, use the generic message format
  return createGenericMessage(webhook);
}

/**
 * Sends a notification to Discord with retry capability
 */
export async function sendDiscordNotification(
  message: DiscordMessage
): Promise<void> {
  const MAX_RETRIES = 3;
  const calculateBackoff = (attempt: number): number => 1000 * attempt;

  const sendRequest = async (attempt: number = 0): Promise<void> => {
    if (attempt >= MAX_RETRIES) {
      throw new Error("Maximum retry attempts reached");
    }

    try {
      const response = await fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      // Handle rate limiting
      if (response.status === HttpStatusCode.TOO_MANY_REQUESTS_429) {
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = (parseInt(retryAfter ?? "5") + 1) * 1000;

        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return sendRequest(attempt);
      }

      if (!response.ok) {
        throw new Error(
          `Discord API returned ${response.status}: ${response.statusText}`
        );
      }

      return;
    } catch (error) {
      if (attempt === MAX_RETRIES - 1) throw error;

      // Exponential backoff before retry
      const backoffTime = calculateBackoff(attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, backoffTime));
      return sendRequest(attempt + 1);
    }
  };

  return sendRequest();
}
