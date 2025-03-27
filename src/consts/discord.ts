import { type StateProperty } from "@/types/discord";
import { type WebhookType } from "@/types/vercel";

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

/**
 * Maps webhook types to their corresponding state properties (colors, emojis)
 */
export function getStateProperty(
  type: WebhookType,
  property: StateProperty
): number | string {
  const mappings = {
    color: {
      // Deployment events
      "deployment.created": COLORS.PENDING,
      "deployment.succeeded": COLORS.SUCCESS,
      "deployment.ready": COLORS.SUCCESS,
      "deployment.promoted": COLORS.PROMOTED,
      "deployment.error": COLORS.ERROR,
      "deployment.canceled": COLORS.CANCELED,
      "deployment.check-rerequested": COLORS.INFO,
      "deployment.integration.action.start": COLORS.PENDING,
      "deployment.integration.action.cancel": COLORS.CANCELED,
      "deployment.integration.action.cleanup": COLORS.INFO,

      // Domain events
      "domain.created": COLORS.SUCCESS,

      // Integration configuration events
      "integration-configuration.permission-upgraded": COLORS.UPGRADED,
      "integration-configuration.removed": COLORS.ERROR,
      "integration-configuration.scope-change-confirmed": COLORS.CONFIRMED,

      // Integration resource events
      "integration-resource.project-connected": COLORS.CONNECTED,
      "integration-resource.project-disconnected": COLORS.DISCONNECTED,

      // Marketplace events
      "marketplace.invoice.created": COLORS.INFO,
      "marketplace.invoice.notpaid": COLORS.WARNING,
      "marketplace.invoice.paid": COLORS.PAID,
      "marketplace.invoice.refunded": COLORS.REFUNDED,

      // Project events
      "project.created": COLORS.CREATED,
      "project.removed": COLORS.REMOVED,

      default: COLORS.INFO,
    },
    emoji: {
      // Deployment events
      "deployment.created": EMOJIS.PENDING,
      "deployment.succeeded": EMOJIS.SUCCESS,
      "deployment.ready": EMOJIS.SUCCESS,
      "deployment.promoted": EMOJIS.PROMOTED,
      "deployment.error": EMOJIS.ERROR,
      "deployment.canceled": EMOJIS.CANCELED,
      "deployment.check-rerequested": EMOJIS.REFRESH,
      "deployment.integration.action.start": EMOJIS.PENDING,
      "deployment.integration.action.cancel": EMOJIS.CANCELED,
      "deployment.integration.action.cleanup": EMOJIS.CLEANUP,

      // Domain events
      "domain.created": EMOJIS.DOMAIN,

      // Integration configuration events
      "integration-configuration.permission-upgraded": EMOJIS.UPGRADE,
      "integration-configuration.removed": EMOJIS.DISCONNECT,
      "integration-configuration.scope-change-confirmed": EMOJIS.CONFIRM,

      // Integration resource events
      "integration-resource.project-connected": EMOJIS.CONNECT,
      "integration-resource.project-disconnected": EMOJIS.UNLOCK,

      // Marketplace events
      "marketplace.invoice.created": EMOJIS.INVOICE,
      "marketplace.invoice.notpaid": EMOJIS.WARNING,
      "marketplace.invoice.paid": EMOJIS.PAYMENT,
      "marketplace.invoice.refunded": EMOJIS.MONEY,

      // Project events
      "project.created": EMOJIS.NEW,
      "project.removed": EMOJIS.TRASH,

      default: EMOJIS.DEPLOY,
    },
  };

  return (
    mappings[property][type as keyof (typeof mappings)[typeof property]] ||
    mappings[property].default
  );
}
