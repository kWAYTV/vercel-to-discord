if (!process.env.WEBHOOK_INTEGRATION_SECRET) {
  throw new Error("WEBHOOK_INTEGRATION_SECRET is required");
}

if (!process.env.DISCORD_WEBHOOK_URL) {
  throw new Error("DISCORD_WEBHOOK_URL is required");
}

export const CONFIG = {
  WEBHOOK_SECRET: process.env.WEBHOOK_INTEGRATION_SECRET,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
} as const;
