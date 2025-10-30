import { createAuthClient } from "better-auth/client";
import React from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
});

// Client-side only auth hook
export const useAuth = (): AuthState => {
  // Server-side fallback
  if (typeof window === "undefined") {
    return {
      user: null,
      isLoading: true,
      isAuthenticated: false,
    };
  }

  const [state, setState] = React.useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  React.useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await authClient.getSession();
        if (mounted) {
          setState({
            user: response.data?.user || null,
            isLoading: false,
            isAuthenticated: !!response.data?.user,
          });
        }
      } catch (_error) {
        if (mounted) {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
};

export const useAuthenticatedUser = (): User => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    throw new Error("User is not authenticated");
  }

  return user;
};
