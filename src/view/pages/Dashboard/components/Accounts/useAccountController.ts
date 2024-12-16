import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { bankAccountService } from "./../../../../../app/services/bankAccountsService/index";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeggining: true,
    isEnd: false,
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ["getAllBankAccounts"],
    queryFn: bankAccountService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    toggleValueVisibility,
    areValuesVisible,
    openNewAccountModal,
    isLoading,
    accounts: data,
    currentBalance,
  };
}
