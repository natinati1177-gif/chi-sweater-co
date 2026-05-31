import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function SignInPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <span className="material-symbols-outlined text-5xl mb-4 block">check_circle</span>
          <h1 className="font-headline-lg text-headline-lg uppercase mb-4">You're Signed In</h1>
          <p className="font-body-md opacity-60 mb-8">{user.email}</p>
          <div className="flex flex-col gap-4">
            <Link to="/" className="bg-black text-white py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 text-center">
              Back to Shop
            </Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate('/') }}
              className="border-2 border-black py-5 font-label-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      navigate('/')
    }
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Welcome Back</span>
        <h1 className="font-headline-lg text-headline-lg uppercase mb-10">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-label-bold uppercase text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="editorial-input bg-transparent w-full py-3 font-body-md placeholder:text-neutral-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold uppercase text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="editorial-input bg-transparent w-full py-3 font-body-md placeholder:text-neutral-400 focus:outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-secondary font-label-bold text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center flex flex-col gap-3">
          <p className="font-body-md opacity-60 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-label-bold border-b-2 border-black pb-0.5 hover:text-secondary hover:border-secondary transition-colors">
              Sign Up
            </Link>
          </p>
          <Link to="/" className="font-label-bold uppercase text-sm border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-colors">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </section>
  )
}
