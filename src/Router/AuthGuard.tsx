import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    // Redirect para login
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    // Redirect para / (dashboard)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
