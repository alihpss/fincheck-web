import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, "Saldo inicial é obrigatório"),
    z.number().min(1, "Saldo inicial é obrigatório"),
  ]),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  type: z.enum(["INVESTMENT", "CASH", "CHECKING"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.currentBalance,
    },
  });

  const [isDeleteModalOpen, setIsdeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await bankAccountService.update({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      return res;
    },
  });

  const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: async (id: string) => {
        const res = await bankAccountService.remove({
          id,
        });

        return res;
      },
    });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateAccount(data);

      queryClient.invalidateQueries({ queryKey: ["getAllBankAccounts"] });
      toast.success("Conta editada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao salvar alterações");
    }
  });

  function handleOpenDeleteModal() {
    setIsdeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsdeleteModalOpen(false);
  }

  async function handleConfirmDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ["getAllBankAccounts"] });
      toast.success("Conta removida com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao deletar conta");
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    accountBeingEdited,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDeleteAccount,
    isLoadingDelete,
  };
}
