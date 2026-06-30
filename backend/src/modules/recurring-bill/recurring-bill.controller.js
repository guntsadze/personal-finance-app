import { BaseController } from "../../common/controllers/base.controller.js";
import { recurringBillService } from "./recurring-bill.service.js";

class RecurringBillController extends BaseController {
  constructor() {
    super(recurringBillService);
  }

  getAll = async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      const result = await this.service.getAllBillsByUser(userId, req.query);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      const billData = {
        ...req.body,
        userId: userId,
      };

      const newItem = await this.service.create(billData);
      return res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  };
}

export const recurringBillController = new RecurringBillController();
