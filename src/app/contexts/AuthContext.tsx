import React, { createContext } from "react";

interface AuthContextValue {
  signedIn: boolean;
}

interface ChildrenType {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: ChildrenType) {
  return (
    <AuthContext.Provider value={{ signedIn: false }}>
      {children}
    </AuthContext.Provider>
  );
}
