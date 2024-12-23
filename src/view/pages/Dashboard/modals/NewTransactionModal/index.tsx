import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form action="" onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.05px] text-xs">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.05px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
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
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="bankAccountId"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                options={accounts.map((account) => ({
                  label: account.name,
                  value: account.id,
                }))}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Button isLoading={isLoading}>Criar</Button>
        </div>
      </form>
    </Modal>
  );
}
