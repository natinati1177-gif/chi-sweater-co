export default function HeroSection() {
  return (
    <section className="relative h-[921px] min-h-[600px] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ5aXHrKBckphhfKP1VbqM-hDYQYySQVUKnlgq-asc6LF9nIrqxXVgu1wM9XFZ2SnNRn0jZqp_HmHxt0Y-5ZuRU1rTUOOoNSsygScsroNKkAhuS677RMLSU1VIDNh-Xo-3IzXKtAnqtR9XmxRLbUMvKJOsg4z0jU0QHhfZwdzaR1wex4mQWRVUDI0sRGo6WJIqONYSaYQXDzdJf3Iq_ySbsVxltB_BXY6Eo1fujeh-poTSXtU3kZF6nkwGZ4O9CbR0pk0Zy06idf4O"
          alt="Chicago streetwear hero"
        />
      </div>
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full text-white">
        <div className="max-w-3xl">
          <h1 className="font-display-xl text-display-xl mb-6 uppercase">
            NATI NBA SHOP.<br />
            <span className="text-secondary">Built for the Streets.</span>
          </h1>
          <p className="font-body-lg text-body-lg mb-10 max-w-xl opacity-90">
            Premium comfort meets authentic hip hop energy. Our collection is engineered for the streets — raw rhythm, high-contrast lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest border-2 border-white hover:bg-secondary hover:border-secondary transition-all duration-300 active:scale-95">
              Shop Now
            </button>
            <button className="w-full sm:w-auto bg-transparent text-white px-10 py-5 font-label-bold uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="border-l-4 border-secondary pl-4">
          <p className="font-label-bold uppercase text-white opacity-60">Latitude/Longitude</p>
          <p className="font-headline-md text-white">41.8781° N, 87.6298° W</p>
        </div>
      </div>
    </section>
  )
}
