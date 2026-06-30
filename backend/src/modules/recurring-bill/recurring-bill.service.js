import { BaseService } from "../../common/services/base.service.js";
import { recurringBillModel } from "./recurring-bill.model.js";

class RecurringBillService extends BaseService {
  constructor() {
    super(recurringBillModel);
  }

  getAllBillsByUser = async (userId, query = {}) => {
    const filter = { ...query.filter, userId };

    return await super.getAll({ ...query, filter });
  };
}

export const recurringBillService = new RecurringBillService();
