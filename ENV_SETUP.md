# Google OAuth Setup Guide

To use the Google authentication in this TanStack Start project, you need to configure your Google OAuth credentials.

## 1. Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application** as the application type
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://your-domain.com/api/auth/callback/google` (for production)
7. Copy the **Client ID** and **Client Secret**

## 2. Environment Variables

Add the following to your environment variables (`.env.local` for development):

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## 3. Cloudflare Workers

If using Cloudflare Workers, add the secrets using:

```bash
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

## 4. Features Implemented

✅ **Google OAuth Integration**: Complete Google sign-in flow
✅ **Session Management**: Persistent user sessions with proper expiration
✅ **Protected Routes**: Components to protect authenticated-only content
✅ **User Profile Display**: Show user information and avatar
✅ **Responsive Design**: Mobile-friendly authentication UI
✅ **Error Handling**: Proper error states and loading indicators
✅ **TanStack Query Integration**: Optimistic updates and caching
✅ **TypeScript Support**: Fully typed authentication utilities

## 5. Usage Examples

### Using the Auth Button
```tsx
import { AuthButton } from "@/components/auth/auth-button";

// In your component
<AuthButton />
```

### Protecting Routes
```tsx
import { ProtectedRoute } from "@/components/auth/protected-route";

<ProtectedRoute>
  <div>This content is only visible to authenticated users</div>
</ProtectedRoute>
```

### Accessing User Data
```tsx
import { useAuth } from "@/lib/auth-client";

const { user, isAuthenticated, isLoading } = useAuth();
```

### Forcing Authentication
```tsx
import { useAuthenticatedUser } from "@/lib/auth-client";

// This will throw an error if user is not authenticated
const user = useAuthenticatedUser();
```

## 6. Navigation

- **Auth Demo**: `/login-demo` - Complete authentication demonstration
- **Auth Callback**: `/api/auth/callback/google` - Handles Google OAuth redirect
- **Auth API**: `/api/auth/*` - Better Auth endpoints

The authentication system is now fully integrated into your TanStack Start application with a clean, reusable component architecture!