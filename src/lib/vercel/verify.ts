import crypto from "crypto";

import { logger } from "@/lib/logger";
import { env } from "@/env";

export function verifySignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) {
    logger.error("No signature provided");
    return false;
  }

  const computedSignature = crypto
    .createHmac("sha1", env.WEBHOOK_INTEGRATION_SECRET)
    .update(rawBody)
    .digest("hex");

  logger.info(`Computed signature: ${computedSignature}`);
  logger.info(`Received signature: ${signature}`);

  return computedSignature === signature;
}
