import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative h-[921px] min-h-[600px] flex items-center overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://images.unsplash.com/photo-1546519638405-a9f1eb90e71d?w=1600&q=80"
          alt="NBA basketball"
        />
        {/* Gradient overlay — stronger on left so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full text-white">
        <div className="max-w-3xl">
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-4">
            🏀 New Season Drops Available
          </p>
          <h1 className="font-display-xl text-display-xl mb-6 uppercase leading-none">
            NATI NBA SHOP.<br />
            <span className="text-red-600">Rep the Game.</span>
          </h1>
          <p className="font-body-lg text-body-lg mb-10 max-w-xl opacity-90">
            Premium NBA-inspired apparel for fans who live and breathe the game. Every drop is limited — once it's gone, it's gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto bg-red-600 text-white px-10 py-5 font-label-bold uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
            >
              Shop Now
            </Link>
            <Link
              to="/shop?badge=LIMITED"
              className="w-full sm:w-auto bg-transparent text-white px-10 py-5 font-label-bold uppercase tracking-widest text-center border-2 border-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
            >
              Limited Drops
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom right badge */}
      <div className="absolute bottom-10 right-10 hidden lg:block text-right">
        <div className="border-r-4 border-red-600 pr-4">
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-white/50 mb-1">Season</p>
          <p className="font-space-grotesk font-black text-white text-2xl uppercase">2026–27</p>
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-red-500 mt-1">Coming Soon</p>
        </div>
      </div>
    </section>
  )
}
