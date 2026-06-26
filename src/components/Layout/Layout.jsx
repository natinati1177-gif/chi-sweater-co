import TopAppBar from '../TopAppBar/TopAppBar'
import Footer from '../Footer/Footer'
import BackToTop from '../BackToTop/BackToTop'
import IdleLogoutModal from '../IdleLogoutModal/IdleLogoutModal'
import { useIdleLogout } from '../../hooks/useIdleLogout'

export default function Layout({ children }) {
  const { showWarning, countdown, stayLoggedIn, signOut } = useIdleLogout()

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary selection:text-white">
      <TopAppBar />
      <main className="max-w-[1440px] mx-auto">
        {children}
      </main>
      <Footer />
      <BackToTop />
      {showWarning && (
        <IdleLogoutModal
          countdown={countdown}
          onStay={stayLoggedIn}
          onLogout={signOut}
        />
      )}
    </div>
  )
}
