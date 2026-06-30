import { BaseController } from "../../common/controllers/base.controller.js";
import { budgetsService } from "./budgets.service.js";

class BudgetsController extends BaseController {
  constructor() {
    super(budgetsService);
  }

  create = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not found in request" });
    }

    const potData = {
      ...req.body,
      userId: userId,
    };

    const newItem = await this.service.create(potData);

    return res.status(201).json(newItem);
  };
}

export const budgetsController = new BudgetsController();
