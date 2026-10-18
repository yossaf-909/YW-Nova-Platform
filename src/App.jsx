import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PublicPortfolioPage } from './pages/PublicPortfolioPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPortfolioPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App