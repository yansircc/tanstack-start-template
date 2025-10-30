import { ReactNode } from "react";
import { useAuth } from "@/lib/auth-client";
import { GoogleLoginButton } from "./google-login-button";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-64 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sign in Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in with Google to access this content.
            </p>
          </div>
          <GoogleLoginButton />
        </div>
      )
    );
  }

  return <>{children}</>;
}
