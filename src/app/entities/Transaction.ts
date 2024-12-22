export interface Transaction {
  id: string;
  name: string;
  value: number;
  date: string;
  type: "EXPENSE" | "INCOME";
  category?: {
    id: string;
    icon: string;
    name: string;
  };
  bankAccountId: string;
  categoryId: string;
}
