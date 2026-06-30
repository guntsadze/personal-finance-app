import { Router } from "express";
import { isAuthMiddleware } from "../../middlewares/is-auth.middleware.js";
import { isValidMongoIdMiddleware } from "../../middlewares/is-valid-mongo-id.middleware.js";
import { transactionsController } from "./transactions.controller.js";

const router = Router();

router
  .route("/")
  .get(isAuthMiddleware, transactionsController.getAll)
  .post(isAuthMiddleware, transactionsController.create);

router
  .route("/:id")
  .get(
    isAuthMiddleware,
    isValidMongoIdMiddleware,
    transactionsController.getById,
  )
  .put(
    isAuthMiddleware,
    isValidMongoIdMiddleware,
    transactionsController.update,
  )
  .delete(
    isAuthMiddleware,
    isValidMongoIdMiddleware,
    transactionsController.delete,
  );

export const transactionsRouter = router;
