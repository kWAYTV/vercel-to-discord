import { logger } from "@/lib/logger";
import { webhookSchema } from "@/lib/vercel/types";
import { verifySignature } from "@/lib/vercel/verify";
import {
  createDeploymentMessage,
  sendDiscordNotification,
} from "@/lib/discord/notify";
import HttpStatusCode from "@/enums/http-status-codes";

export async function POST(req: Request) {
  try {
    logger.info("Received webhook request");

    const rawBody = await req.text();
    const signature = req.headers.get("x-vercel-signature");

    if (!verifySignature(rawBody, signature)) {
      return Response.json(
        { code: "invalid_signature", error: "Signature verification failed" },
        { status: HttpStatusCode.UNAUTHORIZED_401 }
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
        { status: HttpStatusCode.BAD_REQUEST_400 }
      );
    }

    return Response.json(
      { success: false, error: "Internal server error" },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 }
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
      { status: HttpStatusCode.METHOD_NOT_ALLOWED_405 }
    );
  } catch (error) {
    logger.error("Webhook verification failed", error);

    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 }
      );
    }

    return Response.json(
      { success: false, error: "Internal server error" },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 }
    );
  }
}
