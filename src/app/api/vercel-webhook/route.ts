import { logger } from "@/lib/logger";
import { webhookSchema } from "@/lib/vercel/types";
import { verifySignature } from "@/lib/vercel/verify";
import {
  createDeploymentMessage,
  sendDiscordNotification,
} from "@/lib/discord/notify";

export async function POST(req: Request) {
  try {
    logger.info("Received webhook request");

    const rawBody = await req.text();
    const signature = req.headers.get("x-vercel-signature");

    if (!verifySignature(rawBody, signature)) {
      return Response.json(
        { code: "invalid_signature", error: "Signature verification failed" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);
    const webhook = webhookSchema.parse(payload);

    logger.info(`Processing ${webhook.type} event`);

    if (webhook.type.startsWith("deployment.")) {
      const message = createDeploymentMessage(webhook);
      await sendDiscordNotification(message);
    } else {
      logger.info(`Ignoring non-deployment event: ${webhook.type}`);
    }

    return Response.json({ status: "success" });
  } catch (error) {
    logger.error("Webhook processing failed", error);

    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return new Response(
    "This endpoint only accepts POST requests from Vercel webhooks",
    { status: 405 }
  );
}
