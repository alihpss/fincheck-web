import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { DeleteTransactionParams } from "../../../../../app/services/transactionsService/remove";
import { UpdateTransactionParams } from "../../../../../app/services/transactionsService/update";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

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

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const queryClient = useQueryClient();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  const { mutateAsync: removeTransaction, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: (data: DeleteTransactionParams) =>
        transactionsService.remove(data),
    });

  const { mutateAsync: updateTransaction, isPending } = useMutation({
    mutationFn: (data: UpdateTransactionParams) =>
      transactionsService.update(data),
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getAllBankAccounts"],
      });
      toast.success(
        transaction?.type === "EXPENSE"
          ? "Despesa atualizada com sucesso!"
          : "Receita atualizada com sucesso!"
      );
      onClose();
    } catch {
      toast.error(
        transaction?.type === "EXPENSE"
          ? "Erro ao salvar despesa"
          : "Erro ao salvar receita"
      );
    }
  });

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  async function handleConfirmDeleteTransaction() {
    try {
      await removeTransaction({ id: transaction!.id });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["getAllBankAccounts"] });
      toast.success("Transação removida com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao deletar transação");
    }
  }

  return {
    register,
    control,
    errors,
    accounts,
    categories,
    isLoading: isPending,
    handleSubmit,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteTransaction,
    handleOpenDeleteModal,
  };
}
