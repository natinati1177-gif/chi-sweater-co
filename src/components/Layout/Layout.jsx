import TopAppBar from '../TopAppBar/TopAppBar'
import Footer from '../Footer/Footer'
import BackToTop from '../BackToTop/BackToTop'

export default function Layout({ children }) {
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary selection:text-white">
      <TopAppBar />
      <main className="max-w-[1440px] mx-auto">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
