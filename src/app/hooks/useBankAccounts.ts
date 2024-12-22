import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../services/bankAccountsService";

export function useBankAccounts() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllBankAccounts"],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity,
  });

  return {
    accounts: data ?? [],
    isLoading,
  };
}
