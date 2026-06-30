import { BaseController } from "../../common/controllers/base.controller.js";
import { potService } from "./pot.service.js";

class PotController extends BaseController {
  constructor() {
    super(potService);
  }
  create = async (req, res, next) => {
    console.log("🚀 ~ PotController ~ req:", req.userId);
    try {
      const userId = req.userId || (req.user && req.user._id);

      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found in request" });
      }

      // 2. ვქმნით სუფთა ობიექტს სერვისისთვის
      const potData = {
        ...req.body,
        userId: userId, // <-- აქ ვსვამთ იუზერის ID-ს
      };

      // 3. ვიძახებთ სერვისს
      const newItem = await this.service.create(potData);

      // 4. ვაბრუნებთ 201 სტატუსს წარმატებულ შექმნაზე
      return res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  };
}

export const potController = new PotController();
