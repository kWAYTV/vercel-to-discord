export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  timestamp?: string;
  footer?: {
    text: string;
  };
}

export interface DiscordMessage {
  embeds: DiscordEmbed[];
  username?: string;
  avatar_url?: string;
}

/**
 * Represents a single field in a Discord embed
 */
export type DiscordEmbedField = NonNullable<DiscordEmbed["fields"]>[number];

/**
 * Types of state properties that can be mapped to webhook types
 */
export type StateProperty = "color" | "emoji";
