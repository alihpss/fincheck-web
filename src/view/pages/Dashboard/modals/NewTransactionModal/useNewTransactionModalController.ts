import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { CreateTransactionParams } from "../../../../../app/services/transactionsService/create";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  value: z.union([
    z.string().min(1, "Valor é obrigatório"),
    z.number().min(1, "Valor é obrigatório"),
  ]),
  name: z.string().min(1, "Informe o nome"),
  categoryId: z.string().min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Informe uma conta"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      const res = await transactionsService.create(data);
      return res;
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      toast.success(
        newTransactionType === "EXPENSE"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!"
      );
      closeNewTransactionModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["getAllBankAccounts"],
      });
    } catch {
      toast.error(
        newTransactionType === "EXPENSE"
          ? "Erro ao cadastrar despesa"
          : "Erro ao cadastrar receita"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    handleSubmit,
    register,
    control,
    errors,
    accounts,
    categories,
    isLoading: isPending,
  };
}
