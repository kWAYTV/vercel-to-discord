module.exports = {
  apps: [
    {
      name: "vercel-discord",
      script: "pnpm",
      args: "start",
      interpreter: "/bin/bash",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
