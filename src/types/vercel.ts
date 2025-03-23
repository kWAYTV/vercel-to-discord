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

// Webhook payload schema
export const webhookSchema = z.object({
  id: z.string(),
  region: z.string().optional(),
  createdAt: z.number(),
  type: z.enum([
    "deployment.created",
    "deployment.succeeded",
    "deployment.ready",
    "deployment.promoted",
    "deployment.canceled",
    "deployment.error",
    "deployment.check-rerequested",
  ]),
  payload: z.object({
    user: projectSchema,
    team: projectSchema,
    deployment: deploymentSchema,
    links: linksSchema,
    name: z.string(),
    plan: z.string(),
    project: projectSchema,
    regions: z.array(z.string()),
    target: z.string().nullable().optional(),
    type: z.string().optional(),
    url: z.string(),
    alias: z.array(z.string()).optional().default([]),
  }),
});

export type VercelWebhook = z.infer<typeof webhookSchema>;

/**
 * Type representing the possible webhook types from Vercel
 */
export type WebhookType = VercelWebhook["type"];
