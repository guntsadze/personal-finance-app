import { BaseService } from "../../common/services/base.service.js";
import { recurringBillModel } from "../recurring-bill/recurring-bill.model.js";
import { transactionModel } from "./transactions.model.js";

class TransactionsService extends BaseService {
  constructor() {
    super(transactionModel);
  }

  create = async (data) => {
    console.log("🚀 ~ TransactionsService ~ data:", data);

    // 1. ვქმნით ძირითად ტრანზაქციას
    const newItem = await this.model.create(data);

    // 2. ვამოწმებთ, არის თუ არა მონიშნული როგორც განმეორებადი
    if (data.recurring === true) {
      // ტრანზაქციის თარიღიდან ვიგებთ, თვის რომელი რიცხვია (მაგ. 1-დან 31-მდე)
      const transactionDate = data.date ? new Date(data.date) : new Date();
      const dayOfMonth = transactionDate.getDate();

      // ვამზადებთ ბილის ობიექტს სქემის მიხედვით
      const recurringBillData = {
        userId: data.userId,
        name: data.name,
        // რადგან ხარჯები მინუსითაა, ბილებში ჯამები რომ სწორად დაჯდეს, ვინახავთ აბსოლუტურ (დადებით) მნიშვნელობას
        amount: Math.abs(data.amount),
        dueDayOfMonth: dayOfMonth,
        status: "upcoming", // საწყისი სტატუსი დეფოლტად
      };

      console.log("🚀 ავტომატურად იქმნება Recurring Bill:", recurringBillData);

      // ვინახავთ ბილების კოლექციაშიც
      await recurringBillModel.create(recurringBillData);
    }

    return newItem;
  };
}

export const transactionsService = new TransactionsService();
