import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import type { Secret } from "jsonwebtoken";
import { config } from "../../config/config";
import { jwtHelpers } from "../../helpers/jwt.helper";
import type { User } from "../../types/model.types";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../utils/prisma";

const registerUserIntoDB = async (
  payload: User,
): Promise<{
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
}> => {
  const existUser = await prisma.User.firstOrThrow({
    email: payload.email,
  });

  if (existUser) {
    throw new AppError(httpStatus.CONFLICT, "User already exists.");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await prisma.User.create({
    ...payload,
    password: hashedPassword,
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...user } = newUser;

  // generating token
  const accessToken = jwtHelpers.generateToken(
    {
      email: newUser.email,
      role: newUser.role,
      userId: user.id,
    },
    config.ACCESS_TOKEN_SECRET as Secret,
    config.ACCESS_TOKEN_EXPIRY as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      userId: user.id,
    },
    config.REFRESH_TOKEN_SECRET as Secret,
    config.REFRESH_TOKEN_EXPIRY as string,
  );

  return { user, refreshToken, accessToken };
};

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}): Promise<{
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await prisma.User.where((u) =>
    u.email.ilike(payload.email),
  ).firstOrThrow();

  if (!user) {
    throw new AppError(httpStatus.EXPECTATION_FAILED, "Invalid credentials.");
  }

  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.EXPECTATION_FAILED, "User is deleted.");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(httpStatus.EXPECTATION_FAILED, "Invalid credentials.");
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...cleanedUser } = user;

  // generating token
  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      name: user.name,
      userId: user.id,
      role: user.role,
    },
    config.ACCESS_TOKEN_SECRET as Secret,
    config.ACCESS_TOKEN_EXPIRY as string,
  );

  const refreshTokenExpiry = config.REFRESH_TOKEN_EXPIRY;

  const refreshToken = jwtHelpers.generateToken(
    {
      userId: user.id,
    },
    config.REFRESH_TOKEN_SECRET as Secret,
    refreshTokenExpiry as string,
  );

  return { user: cleanedUser, accessToken, refreshToken };
};

export const authService = {
  registerUserIntoDB,
  loginUserFromDB,
};
