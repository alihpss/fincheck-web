import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

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
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await bankAccountService.create({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      return res;
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      toast.success("Conta cadastrada com sucesso!");
      closeNewAccountModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ["getAllBankAccounts"] });
    } catch {
      toast.error("Erro ao criar conta");
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  };
}
