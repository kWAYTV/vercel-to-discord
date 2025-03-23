export const COLORS = {
  PROMOTED: 0xd998e3, // Bright purple
  SUCCESS: 0x2ecc71, // Bright green
  ERROR: 0xe74c3c, // Bright red
  CANCELED: 0x95a5a6, // Light gray
  INFO: 0x3498db, // Bright blue
  PENDING: 0xf1c40f, // Bright yellow,
  WARNING: 0xff9800, // Orange for warnings
  REFUNDED: 0x607d8b, // Blue gray
  PAID: 0x4caf50, // Green for payments
  CONNECTED: 0x2196f3, // Blue for connections
  DISCONNECTED: 0xf44336, // Red for disconnections
  CREATED: 0x8bc34a, // Light green for creations
  REMOVED: 0xff5722, // Deep orange for removals
  UPGRADED: 0x9c27b0, // Purple for upgrades
  CONFIRMED: 0x00bcd4, // Cyan for confirmations
} as const;

export const EMOJIS = {
  PROMOTED: "🔗",
  SUCCESS: "✅",
  ERROR: "❌",
  CANCELED: "🚫",
  PENDING: "⏳",
  BRANCH: "🌿",
  COMMIT: "📝",
  PROJECT: "📦",
  DEPLOY: "🚀",
  REFRESH: "🔄", // For check-rerequested
  CLEANUP: "🧹", // For cleanup actions
  DOMAIN: "🌐", // For domain events
  UPGRADE: "🔼", // For permission upgrades
  DISCONNECT: "🔌", // For removing/disconnecting
  CONFIRM: "✅", // For confirmations
  CONNECT: "🔗", // For connections
  UNLOCK: "🔓", // For disconnections
  INVOICE: "📝", // For invoice created
  WARNING: "⚠️", // For not paid
  PAYMENT: "💵", // For paid
  MONEY: "💸", // For refunded
  NEW: "🆕", // For created
  TRASH: "🗑️", // For removed
  ENV: "🔗", // For environment
  URL: "🌐", // For URLs
  MESSAGE: "💬", // For commit messages
} as const;
