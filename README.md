# Vercel to Discord Notifications

A professional integration service that forwards Vercel deployment events to Discord channels through webhooks. Monitor your deployment status efficiently within your team's Discord workspace.

![Deployment Notification Example](https://i.imgur.com/a3KtlZG.png)

## Features

- Real-time deployment notifications
- Seamless integration with Vercel and Discord
- Minimal setup required
- Lightweight Next.js implementation

## Setup Guide

### Prerequisites

- A Vercel account with deployment access
- Discord server with administrative privileges
- Node.js and npm (for local development)

### Configuration Steps

1. **Vercel Webhook Configuration**

   - Navigate to your Vercel settings
   - Configure the webhook endpoint: `https://<your-domain>/api/vercel-webhook`
   - Save the generated webhook secret

   ![Vercel Webhook Configuration](https://github.com/rewbs/vercel-to-discord/assets/74455/d62d4ad1-6c8a-4839-8b57-c3f92487465d)

2. **Discord Webhook Setup**

   - Access your Discord server settings
   - Create a new webhook in the desired channel
   - Copy the webhook URL

   ![Discord Webhook Setup](https://github.com/rewbs/vercel-to-discord/assets/74455/25162948-fc16-4865-b356-584d1566c704)

3. **Environment Configuration**

   ```env
   # Vercel webhook secret (obtained from webhook setup)
   WEBHOOK_INTEGRATION_SECRET=your_webhook_secret

   # Discord webhook URL
   DISCORD_WEBHOOK_URL=your_discord_webhook_url
   ```

## Deployment Options

### Vercel Deployment (Recommended)

The fastest way to deploy this service is through Vercel's platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kWAYTV/vercel-to-discord)

### Self-Hosted Deployment

For self-hosted environments, we recommend using container orchestration platforms:

- [Dokploy](https://dokploy.com/) - Simplified container deployment
- [Coolify](https://coolify.io/) - Self-hosted PaaS solution

## Development

### Local Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Configure environment variables
4. Start development server: `pnpm run dev`

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Credits

Original concept by [@rewbs](https://github.com/rewbs). This implementation represents a complete architectural redesign and rewrite.

## License

This project is open-source and available under the MIT License. See [LICENSE](license) for details.
