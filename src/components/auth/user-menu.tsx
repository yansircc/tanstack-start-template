import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { authClient, useAuth } from "@/lib/auth-client";

export function UserMenu() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        aria-expanded={isMenuOpen}
        aria-label="User menu"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
      >
        {user.image ? (
          <img
            alt={user.name || "User avatar"}
            className="w-8 h-8 rounded-full"
            height={32}
            src={user.image}
            width={32}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User size={16} />
          </div>
        )}
        <span className="text-sm font-medium hidden md:block">
          {user.name || user.email}
        </span>
      </button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <div className="py-1">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                type="button"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                disabled={isSigningOut}
                onClick={handleSignOut}
                type="button"
              >
                <LogOut size={16} />
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
