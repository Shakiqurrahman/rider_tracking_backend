import app from "./app";

import { env } from "./config/config";
import { logger } from "./utils/logger";

import { db } from "./prisma/db";

const server = app.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT },
    "Application started"
  );
});

let shuttingDown = false;

const shutdown = (signal: string) => {
  if (shuttingDown) return;

  shuttingDown = true;

  logger.info({ signal }, "Graceful shutdown started");

  const forceExit = setTimeout(() => {
    logger.fatal("Shutdown timed out");
    process.exit(1);
  }, 15000);

  forceExit.unref();

  server.close(async (error) => {
    try {
      if (error) {
        logger.error(error, "HTTP shutdown failed");
        process.exitCode = 1;
      }

      await db.close();

      logger.info("Database connection closed");
    } catch (err) {
      logger.error(err, "Database shutdown failed");
      process.exitCode = 1;
    } finally {
      clearTimeout(forceExit);
    }
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));