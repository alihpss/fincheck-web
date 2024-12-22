import { httpClient } from "../httpClient";

export interface DeleteTransactionParams {
  id: string;
}

export async function remove({ id }: DeleteTransactionParams) {
  const { data } = await httpClient.delete(`/transactions/${id}`);

  return data;
}
