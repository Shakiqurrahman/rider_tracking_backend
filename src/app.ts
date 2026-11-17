import cors from "cors";
import express, { type Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import pinoHttp from "pino-http";

import { env } from "./config/config";
import { logger } from "./utils/logger";

import { errorHandler } from "./middleware/error.middleware";
import notFoundHandler from "./middleware/notFound.middleware";
import userRoutes from "./modules/User/user.route";

const app: Express = express();

app.disable("x-powered-by");

if (env.NODE_ENV === "production") {
  // Change this to match your actual proxy topology.
  app.set("trust proxy", 1);
}

app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((x) => x.trim()),
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  }),
);

app.use(pinoHttp({ logger }));

app.get("/health/live", (_req, res) => {
  res.status(200).json({
    status: "alive",
  });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello from Rider Tracking App",
  });
});

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);

app.use("/api/users", userRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
