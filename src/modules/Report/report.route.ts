import { Router } from "express";
import { reportController } from "./report.controller";

const router = Router();

router.get("/", reportController.getAllReports);

export const reportRoutes: Router = router;