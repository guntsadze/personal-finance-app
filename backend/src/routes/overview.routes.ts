import { Router } from "express";
import { getOverview } from "../controllers/overview.controller";

export const overviewRoutes = Router();

overviewRoutes.get("/", getOverview);
