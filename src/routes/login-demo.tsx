import { createFileRoute } from "@tanstack/react-router";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { UserMenu } from "@/components/auth/user-menu";
import { useAuth } from "@/lib/auth-client";

export const Route = createFileRoute("/login-demo")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Google OAuth Demo
          </h1>
          <p className="text-lg text-gray-600">
            Complete authentication system with TanStack Start and Better Auth
          </p>
        </div>

        {/* Authentication Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Authentication Status</h2>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ) : isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-green-800">
                    Successfully Authenticated
                  </h3>
                  <p className="text-green-600">
                    You are logged in with Google
                  </p>
                </div>
              </div>

              {user && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      User Profile
                    </h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Email:</dt>
                        <dd className="font-medium">{user.email}</dd>
                      </div>
                      {user.name && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Name:</dt>
                          <dd className="font-medium">{user.name}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {user.image && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Avatar</h4>
                      <img
                        alt={user.name || "User avatar"}
                        className="w-20 h-20 rounded-full border-2 border-gray-200"
                        height={80}
                        src={user.image}
                        width={80}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t">
                <UserMenu />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Not Authenticated
              </h3>
              <p className="text-gray-600 mb-6">
                Sign in with Google to access all features
              </p>
              <GoogleLoginButton callbackURL="/login-demo" />
            </div>
          )}
        </div>

        {/* Protected Content Demo */}
        <ProtectedRoute>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              🔒 Protected Content
            </h2>
            <p className="text-gray-600 mb-4">
              This content is only visible to authenticated users. It
              demonstrates how route protection works in the application.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">
                Welcome to the protected area!
              </h3>
              <p className="text-blue-700">
                You can only see this because you're authenticated.
              </p>
            </div>
          </div>
        </ProtectedRoute>

        {/* Feature Showcase */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">
              🚀 Features Implemented
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Google OAuth integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Persistent user sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Protected routes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>User profile management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Responsive UI components</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">🛠 Tech Stack</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>TanStack Start</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Better Auth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>TanStack Query</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Tailwind CSS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Lucide React</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
