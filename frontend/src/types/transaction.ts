export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  avatarUrl?: string;
  avatarColor?: string;
  recurring: boolean;
}
