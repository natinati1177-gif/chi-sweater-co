import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartCount } = useCart()

  const isActive = (path) => location.pathname === path
  const isShopActive = location.pathname === '/shop' && !location.search.includes('badge=LIMITED')
  const isLimitedActive = location.pathname === '/shop' && location.search.includes('badge=LIMITED')

  const activeClass = 'text-red-600 border-b-2 border-red-600 pb-1'
  const inactiveClass = 'text-black dark:text-white hover:text-red-600'
  const baseClass = 'font-space-grotesk font-bold uppercase tracking-tighter transition-colors duration-200'

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b-2 border-black dark:border-neutral-800">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto relative">
        <Link to="/" className="text-2xl font-black text-black dark:text-white tracking-widest font-space-grotesk uppercase">
          NATI HIP HOP SHOP
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className={`${baseClass} ${isActive('/') ? activeClass : inactiveClass}`}>HOME</Link>
          <Link to="/about" className={`${baseClass} ${isActive('/about') ? activeClass : inactiveClass}`}>ABOUT</Link>
          <Link to="/shop" className={`${baseClass} ${isShopActive ? activeClass : inactiveClass}`}>SHOP</Link>
          <Link to="/shop?badge=LIMITED" className={`${baseClass} ${isLimitedActive ? activeClass : inactiveClass}`}>LIMITED_EDITION</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <Link
              to="/admin/dashboard"
              className="material-symbols-outlined text-black dark:text-white active:scale-95 transition-transform duration-200 hover:text-red-600"
              title="Admin Panel"
            >
              admin_panel_settings
            </Link>
          )}
          {user ? (
            <button
              onClick={handleSignOut}
              className="material-symbols-outlined text-black dark:text-white active:scale-95 transition-transform duration-200 hover:text-red-600"
              title="Sign Out"
            >
              logout
            </button>
          ) : (
            <Link to="/signin" className="material-symbols-outlined text-black dark:text-white active:scale-95 transition-transform duration-200 hover:text-red-600">
              person
            </Link>
          )}
          <Link to="/cart" className="relative active:scale-95 transition-transform duration-200 hover:text-red-600">
            <span className="material-symbols-outlined text-black dark:text-white hover:text-red-600">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden material-symbols-outlined text-black dark:text-white active:scale-95 transition-transform duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'close' : 'menu'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black border-b-2 border-black dark:border-neutral-800 md:hidden z-40">
            <nav className="flex flex-col px-6 py-4 gap-4">
              <Link to="/" className={`${baseClass} ${isActive('/') ? 'text-red-600' : 'text-black dark:text-white hover:text-red-600'} py-2 border-b border-neutral-100`} onClick={() => setMenuOpen(false)}>HOME</Link>
              <Link to="/about" className={`${baseClass} ${isActive('/about') ? 'text-red-600' : 'text-black dark:text-white hover:text-red-600'} py-2 border-b border-neutral-100`} onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link to="/shop" className={`${baseClass} text-black dark:text-white hover:text-red-600 py-2 border-b border-neutral-100`} onClick={() => setMenuOpen(false)}>SHOP</Link>
              <Link to="/shop?badge=LIMITED" className={`${baseClass} text-black dark:text-white hover:text-red-600 py-2 border-b border-neutral-100`} onClick={() => setMenuOpen(false)}>LIMITED_EDITION</Link>
              {user && (
                <button className={`${baseClass} text-black dark:text-white hover:text-red-600 py-2 text-left`} onClick={() => { handleSignOut(); setMenuOpen(false) }}>SIGN OUT</button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
