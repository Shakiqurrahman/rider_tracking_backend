import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../utils/AppError";

import { logger } from "../utils/logger";

import { env } from "../config/config";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  logger.error(
    {
      err,
      method: req.method,
      path: req.path,
    },
    "Unhandled application error"
  );

  res.status(500).json({
    success: false,
    message: "Internal server error",

    ...(env.NODE_ENV === "development" && {
      error: err instanceof Error ? err.message : String(err),
    }),
  });
};