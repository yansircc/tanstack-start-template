import { createFileRoute } from '@tanstack/react-router'
import { createAuthClient } from 'better-auth/client'
import { useNavigate } from '@tanstack/react-router'

const authClient = createAuthClient()

export const Route = createFileRoute('/login-demo')({
  loader: async () => {
    try {
      const session = await authClient.getSession()
      return { user: session.data?.user || null }
    } catch (error) {
      console.error('Auth check failed:', error)
      return { user: null }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/login-demo'
    })
  }

  const handleSignOut = async () => {
    await authClient.signOut()
    navigate({ to: '/login-demo', replace: true })
  }

  if (user) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1>Login Demo</h1>

        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3>✅ Successfully Logged In!</h3>
          <p><strong>Email:</strong> {user.email}</p>
          {user.name && <p><strong>Name:</strong> {user.name}</p>}
          {user.image && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Avatar:</strong>
              <div>
                <img
                  src={user.image}
                  alt="User avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginTop: '0.5rem'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login Demo</h1>
      <p>This is a simple OAuth login demonstration using Google</p>

      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <p><strong>❌ Not logged in</strong></p>
        <p>Click the button below to sign in with Google</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={handleGoogleSignIn}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
