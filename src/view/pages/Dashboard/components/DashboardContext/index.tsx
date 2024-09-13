import React, { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility: () => void;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: ChildrenProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValueVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
