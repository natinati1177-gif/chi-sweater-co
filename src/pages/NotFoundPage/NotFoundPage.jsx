import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background watermark */}
      <span className="absolute font-space-grotesk font-black text-[180px] md:text-[280px] leading-none text-black/[0.03] select-none pointer-events-none">
        404
      </span>

      <div className="relative z-10">
        <div className="w-20 h-20 bg-red-600 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-white text-4xl">sports_basketball</span>
        </div>
        <span className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-4 block">
          Out of Bounds
        </span>
        <h1 className="font-space-grotesk font-black text-5xl md:text-7xl uppercase leading-none mb-4">
          Missed<br />Shot.
        </h1>
        <p className="font-space-grotesk text-gray-500 mb-10 max-w-sm mx-auto">
          That page doesn't exist. Head back to the shop and find something worth wearing on game night.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-black text-white px-10 py-4 font-space-grotesk font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="border-2 border-black text-black px-10 py-4 font-space-grotesk font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Shop All
          </Link>
        </div>
      </div>
    </section>
  )
}
