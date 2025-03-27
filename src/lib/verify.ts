import crypto from "crypto";

import { env } from "@/env";

export function verifySignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) {
    return false;
  }

  const computedSignature = crypto
    .createHmac("sha1", env.WEBHOOK_INTEGRATION_SECRET)
    .update(rawBody)
    .digest("hex");

  return computedSignature === signature;
}
