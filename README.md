# Vercel to Discord

![Deployment Notification Example](https://pbgegowfpr.ufs.sh/f/5Ajhdz1iWCoOvQQd7AZPbPwa8o1hxYgHdu5VtCizUOKsrmcA)

A professional integration service that connects Vercel deployments with Discord, delivering real-time status notifications to your team channels. This lightweight solution enhances your DevOps workflow by providing immediate visibility into your deployment pipeline without leaving your communication platform.

## Features

- **Real-time Updates** - Receive immediate notifications for all deployment lifecycle events (creation, success, failure, promotion)
- **Comprehensive Event Support** - Full support for all Vercel webhook event types including deployments, domains, projects, and more
- **Rich Embeds** - Informative, visually distinct Discord messages with status-specific colors and icons
- **Deep Linking** - Direct access to Vercel deployments, projects, and GitHub commits via embedded links
- **Context-rich Information** - View branch names, commit hashes, messages, and deployment environments in a single interface
- **Reliable Delivery** - Built-in retry mechanism handles Discord rate limits and connection issues
- **Customizable** - Easy to extend for additional event types or modify notification appearance

## Setup Guide

### 1. Configure Discord Webhook

1. Open your Discord server settings → Integrations → Webhooks
2. Create a new webhook and assign it to your desired channel
3. Customize the webhook name and avatar if desired
4. Copy the generated webhook URL

![Discord Webhook Setup](https://pbgegowfpr.ufs.sh/f/5Ajhdz1iWCoOqCtS5ozZobQTyXmEqudMpnZIcB8hgk3jw96H)

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
4. Select the event types you want notifications for (recommended: all deployment events)

![Vercel Webhook Configuration](https://pbgegowfpr.ufs.sh/f/5Ajhdz1iWCoOFC7MeJptgNcYPhDMdF4apry536Vj1AUzvS8K)

## Security Considerations

- Store your webhook secret securely and generate a unique value for each integration
- The service validates all incoming webhooks using HMAC-SHA1 signatures to prevent unauthorized requests
- Webhook payloads are validated against a strict schema to ensure data integrity

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Originally conceptualized by [@rewbs](https://github.com/rewbs). This implementation represents a complete architectural redesign with expanded features and improved error handling.
