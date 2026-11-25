import { Router } from "express";
import userRoutes from "../modules/User/user.route";
import { reportRoutes } from "../modules/Report/report.route";

const routes: Router = Router();

const moduleRoutes = [
//   {
//     path: "/auth",
//     route: AuthRoutes,
//   },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/reports",
    route: reportRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
