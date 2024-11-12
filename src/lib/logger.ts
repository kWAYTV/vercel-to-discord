const ICONS = {
  ERROR: "❌",
  SUCCESS: "✅",
  INFO: "ℹ️",
  WARNING: "⚠️",
} as const;

export const logger = {
  error: (message: string, error?: unknown) => {
    console.error(`${ICONS.ERROR} ${message}`, error || "");
  },
  success: (message: string) => {
    console.log(`${ICONS.SUCCESS} ${message}`);
  },
  info: (message: string) => {
    console.log(`${ICONS.INFO} ${message}`);
  },
  warn: (message: string) => {
    console.warn(`${ICONS.WARNING} ${message}`);
  },
};
