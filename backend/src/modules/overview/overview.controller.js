import { BaseController } from "../../common/controllers/base.controller.js";
import { overviewService } from "./overview.service.js";

class OverviewController extends BaseController {
  constructor() {
    super(overviewService);
  }

  getOverview = async (req, res, next) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found in request" });
      }

      const overviewData = await this.service.getOverviewData(userId);

      return res.status(200).json(overviewData);
    } catch (error) {
      next(error);
    }
  };
}

export const overviewController = new OverviewController();
