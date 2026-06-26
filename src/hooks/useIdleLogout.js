import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const IDLE_MS = 15 * 60 * 1000
const WARN_SECS = 60

export function useIdleLogout() {
  const { user } = useAuth()
  const [showWarning, setShowWarning] = useState(false)
  const [countdown, setCountdown] = useState(WARN_SECS)
  const idleTimer = useRef(null)
  const countdownTimer = useRef(null)
  const isWarning = useRef(false)

  const doSignOut = useCallback(async () => {
    isWarning.current = false
    setShowWarning(false)
    clearInterval(countdownTimer.current)
    await supabase.auth.signOut()
  }, [])

  const schedule = useCallback(() => {
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      isWarning.current = true
      setShowWarning(true)
      setCountdown(WARN_SECS)
      countdownTimer.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(countdownTimer.current)
            doSignOut()
            return 0
          }
          return c - 1
        })
      }, 1000)
    }, IDLE_MS)
  }, [doSignOut])

  const stayLoggedIn = useCallback(() => {
    isWarning.current = false
    setShowWarning(false)
    clearInterval(countdownTimer.current)
    setCountdown(WARN_SECS)
    schedule()
  }, [schedule])

  useEffect(() => {
    if (!user) {
      clearTimeout(idleTimer.current)
      clearInterval(countdownTimer.current)
      setShowWarning(false)
      return
    }

    const onActivity = () => { if (!isWarning.current) schedule() }
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }))
    schedule()

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity))
      clearTimeout(idleTimer.current)
      clearInterval(countdownTimer.current)
    }
  }, [user, schedule])

  return { showWarning, countdown, stayLoggedIn, signOut: doSignOut }
}
