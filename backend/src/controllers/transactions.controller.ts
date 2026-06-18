import type { Request, Response } from "express";

export async function getTransactions(_req: Request, res: Response) {
  res.json([]);
}

export async function getTransaction(req: Request, res: Response) {
  res.json({ id: req.params.id });
}

export async function createTransaction(req: Request, res: Response) {
  res.status(201).json({ message: "not implemented yet", body: req.body });
}

export async function updateTransaction(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id, body: req.body });
}

export async function deleteTransaction(req: Request, res: Response) {
  res.json({ message: "not implemented yet", id: req.params.id });
}
