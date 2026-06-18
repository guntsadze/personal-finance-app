import type { Request, Response } from "express";

export async function getBudgets(_req: Request, res: Response) {
  res.json([]);
}

export async function createBudget(req: Request, res: Response) {
  res.status(201).json({ message: "not implemented yet", body: req.body });
}

export async function updateBudget(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id, body: req.body });
}

export async function deleteBudget(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id });
}
