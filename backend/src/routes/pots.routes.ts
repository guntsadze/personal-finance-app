import { Router } from "express";
import {
  getPots,
  createPot,
  updatePot,
  deletePot,
  addMoneyToPot,
  withdrawFromPot,
} from "../controllers/pots.controller";

export const potsRoutes = Router();

potsRoutes.get("/", getPots);
potsRoutes.post("/", createPot);
potsRoutes.put("/:id", updatePot);
potsRoutes.delete("/:id", deletePot);
potsRoutes.post("/:id/add-money", addMoneyToPot);
potsRoutes.post("/:id/withdraw", withdrawFromPot);
