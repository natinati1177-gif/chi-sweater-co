import { NavLink, Outlet, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

const TABS = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/orders', label: 'Orders' },
]

export default function AdminLayout() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/signin" replace />

  const initial = user.email?.[0]?.toUpperCase() ?? 'A'

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Top bar */}
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          <Link
            to="/"
            className="px-6 py-4 font-space-grotesk font-black uppercase tracking-widest text-sm text-white hover:text-red-400 transition-colors whitespace-nowrap"
          >
            NATI HIP HOP SHOP / Admin
          </Link>

          <nav className="flex">
            {TABS.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `px-5 py-4 font-space-grotesk font-bold uppercase tracking-tight text-sm transition-colors duration-150 ${
                    isActive ? 'bg-red-600 text-white' : 'text-white hover:bg-white/10'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 px-6">
            <button className="material-symbols-outlined text-white/60 hover:text-white transition-colors text-[20px]">
              notifications
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="material-symbols-outlined text-white/60 hover:text-red-400 transition-colors text-[20px]"
              title="Sign Out"
            >
              logout
            </button>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-black text-white text-xs">
              {initial}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
