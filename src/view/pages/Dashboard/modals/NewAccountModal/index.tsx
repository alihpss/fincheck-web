import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdowninput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    errors,
    handleSubmit,
    register,
    control,
    isPending,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form action="" onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.05px] text-xs">
            Saldo inicial
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.05px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.type?.message}
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                options={[
                  { value: "CHECKING", label: "Conta Corrente" },
                  { value: "INVESTMENT", label: "Investimentos" },
                  { value: "CASH", label: "Dinheiro Físico" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdowninput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Button isLoading={isPending}>Criar</Button>
        </div>
      </form>
    </Modal>
  );
}
