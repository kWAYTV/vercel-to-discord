# Vercel to Discord

A lightweight integration service that connects Vercel deployments with Discord, delivering real-time status notifications to your team channels. Enhance your DevOps workflow with immediate visibility into your deployment pipeline.

## Features !

- Real-time deployment event notifications
- Support for all Vercel webhook event types
- Rich Discord embeds with status-specific colors and icons
- Direct links to Vercel deployments, projects, and GitHub commits
- Context-rich information including branch, commit, and environment details
- Reliable delivery with retry mechanism for handling rate limits
- Easily extensible for customization

## Setup Guide

### 1. Configure Discord Webhook

1. Open your Discord server settings → Integrations → Webhooks
2. Create a new webhook and assign it to your desired channel
3. Copy the generated webhook URL

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kWAYTV/vercel-to-discord)

Configure the following environment variables during deployment:

```
DISCORD_WEBHOOK_URL=your_discord_webhook_url
WEBHOOK_INTEGRATION_SECRET=generate_a_secure_random_string
```

### 3. Connect Your Vercel Project

1. Navigate to your Vercel project → Settings → Webhooks
2. Add a new webhook with URL: `https://<your-deployed-url>/api/vercel-webhook`
3. Set the secret to match the `WEBHOOK_INTEGRATION_SECRET` value you configured
4. Select the event types you want notifications for

## Security Considerations

- Store your webhook secret securely with a unique value for each integration
- All incoming webhooks are validated using HMAC-SHA1 signatures
- Webhook payloads are validated against a strict schema to ensure data integrity

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Originally conceptualized by [@rewbs](https://github.com/rewbs).
