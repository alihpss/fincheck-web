import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Informe um e-mail válido")
    .min(1, "E-mail é obrigatório"),
  password: z.string().min(8, "Senha deve conter pelo menos 8 dígitos"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      console.log("🚀 ~ handleSubmit ~ accessToken:", accessToken);
      toast.success("Conta criada com sucesso");
    } catch {
      toast.error("Erro ao criar a conta");
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    isPending,
  };
}
