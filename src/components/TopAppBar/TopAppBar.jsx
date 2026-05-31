import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const isActive = (path) => location.pathname === path

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
          CHI_SWEATER_CO
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className={`${baseClass} ${isActive('/') ? activeClass : inactiveClass}`}>HOME</Link>
          <Link to="/about" className={`${baseClass} ${isActive('/about') ? activeClass : inactiveClass}`}>ABOUT</Link>
          <a className={`${baseClass} ${inactiveClass}`} href="#">SHOP</a>
          <a className={`${baseClass} ${inactiveClass}`} href="#">LIMITED_EDITION</a>
        </nav>

        <div className="flex items-center gap-4">
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
          <Link to="/cart" className="material-symbols-outlined text-black dark:text-white active:scale-95 transition-transform duration-200 relative hover:text-red-600">
            shopping_cart
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
              <a className={`${baseClass} text-black dark:text-white hover:text-red-600 py-2 border-b border-neutral-100`} href="#" onClick={() => setMenuOpen(false)}>SHOP</a>
              <a className={`${baseClass} text-black dark:text-white hover:text-red-600 py-2 border-b border-neutral-100`} href="#" onClick={() => setMenuOpen(false)}>LIMITED_EDITION</a>
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
