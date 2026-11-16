import { Router } from "express";
import { db } from "../../prisma/db";

const userRoutes: Router = Router();

userRoutes.get("/", async (_req, res) => {
  const data = {
    name: "John Doe",
    username: "johndoe",
    email: "jhon@doe.com",
    password: "password",
  };
  const user = await db.orm.public.User.create(data);
  res.status(200).json({
    message: "Hello from User Route",
    data: user,
  });
});

export default userRoutes;
