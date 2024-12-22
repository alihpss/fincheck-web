import { httpClient } from "../httpClient";

export interface UpdateTransactionParams {
  name: string;
  value: number;
  date: string;
  type: "EXPENSE" | "INCOME";
  bankAccountId: string;
  categoryId: string;
  id: string;
}

export async function update({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
