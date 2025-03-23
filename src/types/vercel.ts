import { z } from "zod";

// Base schemas
export const deploymentMetaSchema = z.record(z.string());

export const deploymentSchema = z.object({
  id: z.string(),
  meta: deploymentMetaSchema,
  name: z.string(),
  url: z.string(),
  inspectorUrl: z.string(),
});

export const linksSchema = z.object({
  deployment: z.string().url(),
  project: z.string().url(),
});

export const projectSchema = z.object({
  id: z.string(),
});

export const domainSchema = z.object({
  name: z.string(),
  delegated: z.boolean().optional(),
});

export const configurationSchema = z.object({
  id: z.string(),
  projects: z.array(z.string()).optional(),
  projectSelection: z.enum(["all", "selected"]).optional(),
  scopes: z.array(z.string()).optional(),
});

export const integrationResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  integration: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const marketplaceInvoiceSchema = z.object({
  id: z.string(),
});

// Webhook type enum with all supported event types
export const webhookTypeEnum = z.enum([
  // Deployment events
  "deployment.created",
  "deployment.succeeded",
  "deployment.ready",
  "deployment.promoted",
  "deployment.canceled",
  "deployment.error",
  "deployment.check-rerequested",
  "deployment.integration.action.cancel",
  "deployment.integration.action.cleanup",
  "deployment.integration.action.start",

  // Domain events
  "domain.created",

  // Integration configuration events
  "integration-configuration.permission-upgraded",
  "integration-configuration.removed",
  "integration-configuration.scope-change-confirmed",

  // Integration resource events
  "integration-resource.project-connected",
  "integration-resource.project-disconnected",

  // Marketplace events
  "marketplace.invoice.created",
  "marketplace.invoice.notpaid",
  "marketplace.invoice.paid",
  "marketplace.invoice.refunded",

  // Project events
  "project.created",
  "project.removed",
]);

// Webhook payload schema
export const webhookSchema = z.object({
  id: z.string(),
  region: z.string().optional(),
  createdAt: z.number(),
  type: webhookTypeEnum,
  payload: z
    .object({
      // Common properties
      user: projectSchema.optional(),
      team: projectSchema.optional(),

      // Deployment specific properties (conditional based on type)
      deployment: deploymentSchema.optional(),
      links: linksSchema.optional(),
      name: z.string().optional(),
      plan: z.string().optional(),
      project: projectSchema.optional(),
      regions: z.array(z.string()).optional(),
      target: z.string().nullable().optional(),
      type: z.string().optional(),
      url: z.string().optional(),
      alias: z.array(z.string()).optional().default([]),

      // Domain specific properties
      domain: domainSchema.optional(),

      // Integration configuration properties
      configuration: configurationSchema.optional(),
      projects: z
        .object({
          added: z.array(z.string()).optional(),
          removed: z.array(z.string()).optional(),
        })
        .optional(),

      // Integration resource properties
      resource: integrationResourceSchema.optional(),

      // Marketplace invoice properties
      invoice: marketplaceInvoiceSchema.optional(),
    })
    .passthrough(),
});

export type VercelWebhook = z.infer<typeof webhookSchema>;

/**
 * Type representing the possible webhook types from Vercel
 */
export type WebhookType = z.infer<typeof webhookTypeEnum>;
