import { Router } from "express";
import { potController } from "./pots.controller.js";
import { isAuthMiddleware } from "../../middlewares/is-auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(isAuthMiddleware, potController.getAll)
  .post(isAuthMiddleware, potController.create);

router
  .route("/:id")
  .get(isAuthMiddleware, potController.getById)
  .put(isAuthMiddleware, potController.update)
  .delete(isAuthMiddleware, potController.delete);

export const potsRouter = router;
