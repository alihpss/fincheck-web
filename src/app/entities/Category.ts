export interface Category {
  id: string;
  name: string;
  icon: string;
  userId: string;
  type: "INCOME" | "EXPENSE";
}
