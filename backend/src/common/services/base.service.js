import {
  getPaginationParams,
  formatPaginationResult,
} from "../utils/pagination.utils.js";

export class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll({ filter = {}, sort = "desc", page, take } = {}) {
    const sortOrder = sort === "asc" ? 1 : -1;

    const { pageNum, takeNum, skip } = getPaginationParams(page, take);

    const [data, totalItems] = await Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(takeNum),
      this.model.countDocuments(filter),
    ]);

    return formatPaginationResult({
      page: pageNum,
      take: takeNum,
      totalItems,
      data,
    });
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(dto) {
    const newItem = new this.model(dto);
    return await newItem.save();
  }

  async update(id, dto) {
    return await this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
