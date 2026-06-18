export const CATEGORY_COLORS = [
  "green",
  "yellow",
  "cyan",
  "navy",
  "red",
  "purple",
  "orchid",
  "turquoise",
  "brown",
  "magenta",
  "blue",
  "navy-grey",
  "army-green",
  "gold",
  "orange",
] as const;

export type CategoryColor = (typeof CATEGORY_COLORS)[number];

export const CATEGORIES = [
  "General",
  "Dining Out",
  "Groceries",
  "Entertainment",
  "Bills",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
] as const;

export type Category = (typeof CATEGORIES)[number];
