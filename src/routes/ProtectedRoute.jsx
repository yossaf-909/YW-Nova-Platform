import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-skin-base px-4">
        <div className="panel max-w-md p-8 text-center">
          <p className="text-lg font-semibold">Loading secure workspace...</p>
          <p className="mt-2 text-sm text-skin-soft">Checking your session and restoring dashboard access.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}
