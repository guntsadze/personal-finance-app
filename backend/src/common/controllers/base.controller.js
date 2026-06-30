export class BaseController {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res) => {
    const result = await this.service.getAll(req.query);
    return res.json(result);
  };

  getById = async (req, res) => {
    const item = await this.service.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "ჩანაწერი ვერ მოიძებნა" });
    }
    return res.json(item);
  };

  create = async (req, res) => {
    const newItem = await this.service.create(req.body);
    return res.status(201).json(newItem);
  };

  update = async (req, res) => {
    const updatedItem = await this.service.update(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "ჩანაწერი ვერ მოიძებნა" });
    }
    return res.json(updatedItem);
  };

  delete = async (req, res) => {
    const deletedItem = await this.service.delete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "ჩანაწერი ვერ მოიძებნა" });
    }
    return res.json({ message: "ჩანაწერი წაიშალა", deletedItem });
  };
}
