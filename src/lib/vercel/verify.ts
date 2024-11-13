import crypto from "crypto";

import { logger } from "@/lib/logger";
import { CONFIG } from "@/lib/config";

export function verifySignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) {
    logger.error("No signature provided");
    return false;
  }

  const computedSignature = crypto
    .createHmac("sha1", CONFIG.WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  logger.info(`Computed signature: ${computedSignature}`);
  logger.info(`Received signature: ${signature}`);

  return computedSignature === signature;
}
