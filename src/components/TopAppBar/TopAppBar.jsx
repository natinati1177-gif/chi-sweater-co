import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const TICKER_ITEMS = [
  '🏀 FREE SHIPPING ON ORDERS $75+',
  '🔥 NEW DROPS EVERY FRIDAY',
  '⚡ 500GSM HEAVYWEIGHT COTTON',
  '🏙️ ENGINEERED IN CHICAGO',
  '💯 30-DAY RETURNS',
]

export default function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartCount } = useCart()

  const isAdmin = user?.email === 'natinati1177@gmail.com'
  const isActive = (path) => location.pathname === path
  const isShopActive = location.pathname === '/shop' && !location.search.includes('badge=LIMITED')
  const isLimitedActive = location.pathname === '/shop' && location.search.includes('badge=LIMITED')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <>
      {/* Scrolling announcement bar */}
      <div className="bg-neutral-900 text-neutral-300 overflow-hidden py-1.5 select-none">
        <div className="flex whitespace-nowrap" style={{ animation: 'ticker 36s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-label-bold uppercase tracking-widest text-[10px] mx-10">{item}</span>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-black'
          : 'bg-white border-b-2 border-black'
      }`}>
        <div className="flex justify-between items-center w-full px-6 py-3 max-w-[1440px] mx-auto relative">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-300">
              <span className="text-white font-black text-xs leading-none">N</span>
            </div>
            <span className="text-xl font-black text-black tracking-widest font-space-grotesk uppercase group-hover:text-red-600 transition-colors duration-300">
              NATI <span className="text-red-600 group-hover:text-black transition-colors duration-300">NBA</span> SHOP
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1 items-center">
            {[
              { to: '/', label: 'HOME', active: isActive('/') },
              { to: '/about', label: 'ABOUT', active: isActive('/about') },
              { to: '/shop', label: 'SHOP', active: isShopActive },
              { to: '/shop?badge=LIMITED', label: 'LIMITED', active: isLimitedActive },
              { to: '/contact', label: 'CONTACT', active: isActive('/contact') },
            ].map(({ to, label, active }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 font-space-grotesk font-bold uppercase tracking-tighter text-sm transition-all duration-200 group
                  ${active ? 'text-red-600' : 'text-black hover:text-red-600'}`}
              >
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-200 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                title="Admin Panel"
                className="hidden md:flex items-center gap-1 border border-black px-3 py-1.5 text-xs font-label-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200"
              >
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/orders"
                  title="My Orders"
                  className="hidden md:flex items-center gap-1 text-xs font-label-bold uppercase tracking-widest hover:text-red-600 transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-xl">package_2</span>
                  <span>My Orders</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="flex items-center gap-1 text-xs font-label-bold uppercase tracking-widest hover:text-red-600 transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-1 text-xs font-label-bold uppercase tracking-widest hover:text-red-600 transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-xl">person</span>
                <span className="hidden md:inline">Sign In</span>
              </Link>
            )}

            <Link to="/cart" className="relative group">
              <div className={`flex items-center gap-1 transition-colors duration-200 ${cartCount > 0 ? 'text-black' : 'text-black'} hover:text-red-600`}>
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <span className="hidden md:inline text-xs font-label-bold uppercase tracking-widest">Cart</span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 border-2 border-black hover:bg-black hover:text-white transition-all duration-200 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-0.5 bg-black group-hover:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-4 h-0.5 bg-black group-hover:bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-0.5 bg-black group-hover:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu — full overlay */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <nav className="bg-black text-white px-6 py-6 flex flex-col gap-0 border-t-2 border-red-600">
            {[
              { to: '/', label: 'HOME' },
              { to: '/about', label: 'ABOUT' },
              { to: '/shop', label: 'SHOP' },
              { to: '/shop?badge=LIMITED', label: 'LIMITED EDITION' },
              { to: '/contact', label: 'CONTACT' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-space-grotesk font-black text-2xl uppercase tracking-tighter py-4 border-b border-neutral-800 hover:text-red-500 transition-colors duration-200
                  ${location.pathname === to ? 'text-red-500' : 'text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="flex gap-4 mt-6">
              {user ? (
                <div className="flex flex-col gap-3 flex-1">
                  <Link
                    to="/orders"
                    className="border-2 border-white text-white py-3 font-label-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-200 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMenuOpen(false) }}
                    className="border-2 border-white text-white py-3 font-label-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="flex-1 border-2 border-white text-white py-3 font-label-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-200 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex-1 bg-red-600 text-white py-3 font-label-bold uppercase tracking-widest text-sm text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
