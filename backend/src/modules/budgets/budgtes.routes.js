import { Router } from "express";
import { isAuthMiddleware } from "../../middlewares/is-auth.middleware.js";
import { budgetsController } from "./budgets.controller.js";
import { isValidMongoIdMiddleware } from "../../middlewares/is-valid-mongo-id.middleware.js";

const router = Router();

router
  .route("/")
  .get(isAuthMiddleware, budgetsController.getAll)
  .post(isAuthMiddleware, budgetsController.create);

router
  .route("/:id")
  .get(isAuthMiddleware, isValidMongoIdMiddleware, budgetsController.getById)
  .put(isAuthMiddleware, isValidMongoIdMiddleware, budgetsController.update)
  .delete(isAuthMiddleware, isValidMongoIdMiddleware, budgetsController.delete);

export const budgetsRouter = router;
