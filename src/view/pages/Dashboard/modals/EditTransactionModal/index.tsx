import { Controller } from "react-hook-form";
import { Transaction } from "../../../../../app/entities/Transaction";
import { Button } from "../../../../components/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export function EditTransactionModal({
  transaction,
  onClose,
  open,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    register,
    accounts,
    categories,
    isLoading,
    handleSubmit,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteTransaction,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title={`Tem certeza que deseja excluir essa ${
          isExpense ? "despesa" : "receita"
        }`}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTransaction}
        isLoading={isLoadingDelete}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
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
            placeholder={isExpense ? "Editar Despesa" : "Editar Receita"}
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

          <Button isLoading={isLoading}>Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}
