export type BillStatus = "paid" | "due-soon" | "upcoming";

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  dueDayOfMonth: number;
  frequency: "monthly" | "weekly" | "annual";
  status: BillStatus;
  avatarUrl?: string;
  avatarColor?: string;
}
