import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white border-y-4 border-black">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-2/3">
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-600 mb-3">
            🏀 New Drops Every Friday
          </p>
          <h2 className="font-display-xl text-display-xl uppercase leading-none mb-6">
            Rep Your Team,<br />Rep the Game.
          </h2>
          <p className="font-body-lg text-body-lg opacity-80 max-w-xl">
            Be first to know about new NBA-inspired drops, exclusive limited releases, and game-day gear. Join thousands of fans who never miss a drop.
          </p>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <Link
            to="/shop"
            className="w-full bg-black text-white px-10 py-6 font-display-xl text-headline-md uppercase tracking-widest hover:bg-red-600 transition-all duration-300 text-center"
          >
            Shop Collection
          </Link>
          <div className="flex items-center gap-4 border-b-2 border-black pb-2">
            <input
              className="bg-transparent w-full font-label-bold uppercase placeholder:text-neutral-400 border-none focus:ring-0 focus:outline-none"
              placeholder="Join the Drop List"
              type="email"
            />
            <button className="material-symbols-outlined hover:text-red-600 transition-colors">arrow_forward</button>
          </div>
        </div>
      </div>
    </section>
  )
}
