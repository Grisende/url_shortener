const { connectRedis } = require("./db/redis");

const PORT = process.env.PORT || 3000;

async function start() {
  await connectRedis();
  const app = require('./app');

  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});