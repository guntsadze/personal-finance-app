import { BaseController } from "../../common/controllers/base.controller.js";
import { transactionsService } from "./transactions.service.js";

class TransactionsController extends BaseController {
  constructor() {
    super(transactionsService);
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

export const transactionsController = new TransactionsController();
