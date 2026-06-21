export default function Footer() {
  return (
    <footer className="w-full px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-12 bg-black dark:bg-neutral-900 text-white dark:text-neutral-100 border-t-2 border-black">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-xl font-black text-white tracking-widest font-space-grotesk uppercase">
          NATI NBA SHOP
        </div>
        <p className="font-space-grotesk uppercase text-[12px] tracking-widest text-neutral-400">
          © 2024 NATI NBA SHOP. ENGINEERED IN CHICAGO.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {['SHIPPING', 'RETURNS', 'SIZE_GUIDE', 'PRIVACY'].map((link) => (
          <a
            key={link}
            className="font-space-grotesk uppercase text-[12px] tracking-widest text-neutral-400 hover:text-white transition-all duration-200 hover:line-through"
            href="#"
          >
            {link}
          </a>
        ))}
      </div>
      <div className="flex gap-6">
        {['brand_instagram', 'brand_tiktok', 'brand_youtube'].map((icon) => (
          <button key={icon} className="material-symbols-outlined text-white hover:text-secondary transition-colors">
            {icon}
          </button>
        ))}
      </div>
    </footer>
  )
}
