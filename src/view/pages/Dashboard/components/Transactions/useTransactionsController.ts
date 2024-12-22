import { useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { transactions, isLoading, isInitialLoading } =
    useTransactions(filters);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdit, setTransactionBeingEdited] =
    useState<null | Transaction>(null);

  function handleCloseEditTransactionModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
  }

  function handleOpenEditTransactionModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) {
        return;
      }

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(filters.bankAccountId);
    handleChangeFilters("year")(filters.year);
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    filters,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdit,
    handleCloseEditTransactionModal,
    handleOpenEditTransactionModal,
  };
}
