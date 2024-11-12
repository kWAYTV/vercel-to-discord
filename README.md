# 🚀 Vercel to Discord Notifications

A lightweight Next.js app that pushes Vercel deployment events directly to your Discord channel. Stay in the loop with your deployments without leaving Discord.

![image](https://github.com/user-attachments/assets/d9bf4982-d82f-4b00-9969-7356044726c4)

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

1. Clone and build:

```bash
git clone https://github.com/kWAYTV/vercel-to-discord
cd vercel-to-discord
pnpm install
pnpm build
```

2. Choose your hosting method:

#### Option A: Direct with PM2

```bash
npm install -g pm2
pm2 start "pnpm start" --name "vercel-discord"
pm2 save
```

#### Option B: Nginx Reverse Proxy

1. Install Nginx:

```bash
sudo apt install nginx
```

2. Create Nginx config in `/etc/nginx/sites-available/vercel-discord`:

```nginx
server {
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/vercel-discord /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 💻 Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Expose locally (choose one):
npx ngrok http 3000
# or use VS Code's port forwarding
```

## 🐳 Docker Support

Contributions welcome! Want to help? Add:

- Dockerfile
- Docker Compose setup
- Container deployment docs
