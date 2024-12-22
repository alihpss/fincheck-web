import { useQuery } from "@tanstack/react-query";
import React, { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { localStorageKeys } from "../config/localStorageKeys";
import { User } from "../entities/User";
import { usersService } from "../services/usersService";

interface ChildrenType {
  children: React.ReactNode;
}

interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
  user?: User;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: ChildrenType) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storageAccessToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => {
      return usersService.me();
    },
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        user: data,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
