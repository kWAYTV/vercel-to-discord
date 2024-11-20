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

    return Response.json({ success: true, message: "Webhook processed" });
  } catch (error) {
    logger.error("Webhook processing failed", error);

    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return Response.json(
      {
        success: true,
        message:
          "This endpoint only accepts POST requests from verified Vercel webhooks",
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Webhook verification failed", error);

    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
