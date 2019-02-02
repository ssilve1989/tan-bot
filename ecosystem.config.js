// @ts-check
module.exports = {
  apps : [{
    name: 'tan-bot',
    cwd: './dist',
    script: 'main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
