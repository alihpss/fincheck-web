import { httpClient } from "../httpClient";

export interface DeleteBankAccountParams {
  id: string;
}

export async function remove({ id }: DeleteBankAccountParams) {
  const { data } = await httpClient.delete(`/bank-accounts/${id}`);

  return data;
}
