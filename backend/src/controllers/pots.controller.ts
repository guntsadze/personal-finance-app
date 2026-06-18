import type { Request, Response } from "express";

export async function getPots(_req: Request, res: Response) {
  res.json([]);
}

export async function createPot(req: Request, res: Response) {
  res.status(201).json({ message: "not implemented yet", body: req.body });
}

export async function updatePot(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id, body: req.body });
}

export async function deletePot(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id });
}

export async function addMoneyToPot(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id, body: req.body });
}

export async function withdrawFromPot(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id, body: req.body });
}
