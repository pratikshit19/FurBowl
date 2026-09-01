import app from './app.js';
import env from './config/env.js';

const start = async () => {
  try {
    app.listen(env.port, () => {
      console.log(`\n  🐾 FurBowl API Server`);
      console.log(`  ─────────────────────────`);
      console.log(`  Environment : ${env.nodeEnv}`);
      console.log(`  Port        : ${env.port}`);
      console.log(`  Frontend    : ${env.frontendUrl}`);
      console.log(`  Health      : http://localhost:${env.port}/api/health`);
      console.log(`  API Base    : http://localhost:${env.port}/api/v1\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
