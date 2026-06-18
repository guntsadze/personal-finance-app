import type { Request, Response } from "express";

export async function registerUser(_req: Request, res: Response) {
  res.status(201).json({ message: "not implemented yet" });
}

export async function loginUser(_req: Request, res: Response) {
  res.status(200).json({ message: "not implemented yet" });
}

export async function logoutUser(_req: Request, res: Response) {
  res.status(200).json({ message: "not implemented yet" });
}

export async function getMe(_req: Request, res: Response) {
  res.status(200).json({ message: "not implemented yet" });
}
