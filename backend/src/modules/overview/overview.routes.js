import { Router } from "express";
import { overviewController } from "./overview.controller.js";
import { isAuthMiddleware } from "../../middlewares/is-auth.middleware.js";

const router = Router();

router.get("/", isAuthMiddleware, overviewController.getOverview);

export const overviewRouter = router;
