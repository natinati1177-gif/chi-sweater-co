import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ADMIN_EMAIL = 'natinati1177@gmail.com'

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-white font-label-bold uppercase tracking-widest text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-red-600 mb-6 block">lock</span>
          <h1 className="text-white font-headline-lg text-4xl uppercase font-black mb-4 tracking-tighter">
            Access Denied
          </h1>
          <p className="text-neutral-400 font-body-md mb-8">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="inline-block bg-red-600 text-white px-8 py-4 font-label-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  return children
}
