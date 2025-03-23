import { logger } from "@/lib/logger";
import { webhookSchema } from "@/types/vercel";
import { verifySignature } from "@/lib/verify";
import {
  createMessageFromWebhook,
  sendDiscordNotification,
} from "@/lib/notify";
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

    const message = createMessageFromWebhook(webhook);
    await sendDiscordNotification(message);

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
