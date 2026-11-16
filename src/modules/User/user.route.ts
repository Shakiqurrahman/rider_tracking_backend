import { Router } from "express";

const userRoutes: Router = Router();

userRoutes.get("/", async(_req, res) => {
    // const user = await db.u
  res.status(200).json({
    message: "Hello from User Route",
  });
});

export default userRoutes;