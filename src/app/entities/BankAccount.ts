export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
  currentBalance: number;
}
