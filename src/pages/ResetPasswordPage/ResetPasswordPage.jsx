import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }

    setError('')
    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({ password })

    setLoading(false)
    if (updateError) {
      setError(updateError.message)
    } else {
      setDone(true)
      setTimeout(() => navigate('/signin'), 2500)
    }
  }

  if (done) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <span className="material-symbols-outlined text-6xl mb-6 block text-green-600">check_circle</span>
          <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Password Updated!</h1>
          <p className="font-body-md opacity-60">Redirecting to sign in...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Password Recovery</span>
        <h1 className="font-headline-lg text-headline-lg uppercase mb-10">Create New Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-label-bold uppercase text-sm">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="editorial-input bg-transparent w-full py-3 font-body-md placeholder:text-neutral-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold uppercase text-sm">Confirm New Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </section>
  )
}
