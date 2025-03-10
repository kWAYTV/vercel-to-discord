# Vercel to Discord

![Deployment Notification Example](https://i.imgur.com/a3KtlZG.png)

> Real-time Vercel deployment notifications in your Discord channels

A lightweight service that bridges Vercel with Discord, providing instant deployment status updates to your team. Monitor build success, failures, and promotions without leaving your communication hub.

## Features

- 🚀 **Real-time updates** - Immediate notifications when deployments start, succeed, fail or get promoted
- 🎨 **Rich embeds** - Attractive, information-dense Discord messages with status colors and emojis
- 🔗 **Deep linking** - Direct links to Vercel deployments, projects, and GitHub commits
- 💬 **Commit context** - View branch, commit hash, and commit messages directly in Discord
- 🔄 **Reliable delivery** - Built-in retry logic for API rate limits or network issues

## Quick Setup

### 1. Configure Discord Webhook

- Open Discord channel settings → Integrations → Create Webhook
- Customize name/avatar if desired
- Copy the webhook URL

![Discord Webhook Setup](https://github.com/rewbs/vercel-to-discord/assets/74455/25162948-fc16-4865-b356-584d1566c704)

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kWAYTV/vercel-to-discord)

- Add these environment variables during deployment:
  ```
  DISCORD_WEBHOOK_URL=your_discord_webhook_url
  WEBHOOK_INTEGRATION_SECRET=generate_a_secure_random_value
  ```

### 3. Connect Vercel Project

- Go to Vercel project → Settings → Webhooks
- Add webhook: `https://<your-deployed-url>/api/vercel-webhook`
- Use the same secret you set in `WEBHOOK_INTEGRATION_SECRET`
- Select the events you want to monitor

![Vercel Webhook Configuration](https://github.com/rewbs/vercel-to-discord/assets/74455/d62d4ad1-6c8a-4839-8b57-c3f92487465d)

## Development

```bash
# Clone and install
git clone https://github.com/yourusername/vercel-to-discord.git
cd vercel-to-discord
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
pnpm dev
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Original concept by [@rewbs](https://github.com/rewbs). This implementation represents a complete architectural redesign and rewrite.
