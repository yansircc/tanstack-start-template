import { useAuth } from "@/lib/auth-client";
import { GoogleLoginButton } from "./google-login-button";
import { UserMenu } from "./user-menu";

export function AuthButton() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="w-32 h-9 bg-gray-700 rounded-lg animate-pulse" />;
  }

  if (isAuthenticated) {
    return <UserMenu />;
  }

  return <GoogleLoginButton />;
}
