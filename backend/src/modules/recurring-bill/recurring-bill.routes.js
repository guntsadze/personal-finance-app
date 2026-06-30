import { Router } from "express";
import { isAuthMiddleware } from "../../middlewares/is-auth.middleware.js";
import { recurringBillController } from "./recurring-bill.controller.js";

const router = Router();

router.use(isAuthMiddleware);

router.get("/", recurringBillController.getAll);
router.get("/:id", recurringBillController.getById);
router.post("/", recurringBillController.create);
router.put("/:id", recurringBillController.update);
router.delete("/:id", recurringBillController.delete);

export const recurringBillRouter = router;
