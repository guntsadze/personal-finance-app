import { BaseService } from "../../common/services/base.service.js";
import { potModel } from "./pot.model.js";

class PotService extends BaseService {
  constructor() {
    super(potModel);
  }

  create = async (data) => {
    const newItem = await this.model.create(data);
    return newItem;
  };
}

export const potService = new PotService();
