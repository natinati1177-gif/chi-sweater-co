import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <span className="material-symbols-outlined text-6xl mb-6 block text-green-600">mark_email_read</span>
          <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Check Your Email</h1>
          <p className="font-body-md opacity-60 mb-2">We sent a reset link to:</p>
          <p className="font-label-bold mb-8">{email}</p>
          <p className="font-body-md opacity-50 text-sm mb-8">Click the link in the email to reset your password.</p>
          <Link to="/signin" className="font-label-bold uppercase text-sm border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-colors">
            ← Back to Sign In
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Password Recovery</span>
        <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Forgot Password</h1>
        <p className="font-body-md opacity-60 mb-10">Enter your email and we'll send you a reset link.</p>

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

          {error && (
            <p className="text-secondary font-label-bold text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/signin" className="font-label-bold uppercase text-sm border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-colors">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}
