import { BaseService } from "../../common/services/base.service.js";
import { budgetModel } from "./budgets.model.js";

class BudgetsService extends BaseService {
  constructor() {
    super(budgetModel);
  }

  create = async (data) => {
    const newItem = await this.model.create(data);
    return newItem;
  };
}

export const budgetsService = new BudgetsService();
