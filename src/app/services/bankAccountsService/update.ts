import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  id: string;
}

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}
