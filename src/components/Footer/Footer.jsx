import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/shop', label: 'Shop All' },
  { to: '/shop?badge=LIMITED', label: 'Limited Edition' },
]

const INFO_LINKS = [
  { label: 'Shipping Policy', href: '#' },
  { label: 'Returns & Exchanges', href: '#' },
  { label: 'Size Guide', href: '#' },
  { label: 'Privacy Policy', href: '#' },
]

const SOCIALS = [
  { icon: 'photo_camera', label: 'Instagram', href: '#' },
  { icon: 'play_circle', label: 'TikTok', href: '#' },
  { icon: 'smart_display', label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Red accent top bar */}
      <div className="h-1 bg-red-600" />

      {/* Main footer body */}
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-xs">N</span>
              </div>
              <span className="text-lg font-black tracking-widest font-space-grotesk uppercase">
                NATI <span className="text-red-500">NBA</span> SHOP
              </span>
            </Link>
            <p className="font-body-md text-sm text-neutral-400 leading-relaxed max-w-[200px]">
              Premium NBA fan gear. Built for the game. Made to last.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              {SOCIALS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-neutral-700 flex items-center justify-center hover:border-red-600 hover:text-red-500 transition-all duration-200 group"
                >
                  <span className="material-symbols-outlined text-xl text-neutral-400 group-hover:text-red-500 transition-colors">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-bold uppercase tracking-widest text-xs text-red-500 mb-1">Shop</h4>
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-body-md text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Info links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-bold uppercase tracking-widest text-xs text-red-500 mb-1">Info</h4>
            {INFO_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-body-md text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Newsletter / Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-bold uppercase tracking-widest text-xs text-red-500 mb-1">Stay in the Loop</h4>
            <p className="font-body-md text-sm text-neutral-400">Get early access to drops and exclusive deals.</p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm font-body-md text-white placeholder:text-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button className="bg-red-600 hover:bg-white hover:text-black text-white px-4 py-3 font-label-bold uppercase text-xs tracking-widest transition-all duration-200 flex-shrink-0">
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-space-grotesk uppercase text-[11px] tracking-widest text-neutral-600">
            © 2026 NATI NBA SHOP. FOR THE FANS. FOR THE GAME.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="font-label-bold uppercase text-[11px] tracking-widest text-neutral-600">
              New drops every Friday
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
