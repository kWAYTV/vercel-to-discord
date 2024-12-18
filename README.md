# 🚀 Vercel to Discord Notifications

A lightweight Next.js app that pushes Vercel deployment events directly to your Discord channel. Stay in the loop with your deployments without leaving Discord.

![image](https://i.imgur.com/a3KtlZG.png)

## ⚡️ Quick Setup

### 1. Configure Vercel Webhook

Point Vercel to your instance at: `https://<your-domain>/api/vercel-webhook`

![Vercel Webhook Configuration](https://github.com/rewbs/vercel-to-discord/assets/74455/d62d4ad1-6c8a-4839-8b57-c3f92487465d)

### 2. Set Up Discord Webhook

Create a webhook in your Discord server settings to receive the notifications:

![Discord Webhook Setup](https://github.com/rewbs/vercel-to-discord/assets/74455/25162948-fc16-4865-b356-584d1566c704)

### 3. Environment Variables

```env
# Vercel webhook secret (from webhook setup)
WEBHOOK_INTEGRATION_SECRET=VAn**********************

# Discord webhook URL
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/**************/39NQ**************************************************************
```

## 🚀 Deployment Options

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kWAYTV/vercel-to-discord)

### Manual VPS Deployment

For manual VPS deployment, we recommend the use of tools like [Dokploy](https://dokploy.com/) or [Coolify](https://coolify.io/), which will ease a lot the deployment process.

## 🙏 Acknowledgments

Thanks to [@rewbs](https://github.com/rewbs) for the original idea. This is a complete rewrite with no remaining code from the original codebase.
