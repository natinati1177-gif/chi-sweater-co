export default function AboutSection() {
  return (
    <section className="py-section-gap flex flex-col md:flex-row items-center gap-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="w-full md:w-1/2 relative">
        <div className="hidden md:block absolute -top-10 -left-10 w-full h-full border-4 border-secondary -z-10"></div>
        <img
          className="w-full aspect-square object-cover border-2 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
          src="https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&q=80"
          alt="NBA fan gear"
        />
      </div>
      <div className="w-full md:w-1/2">
        <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Our DNA</span>
        <h2 className="font-headline-lg text-headline-lg uppercase mb-8">
          Built for the<br />Game. Worn for Life.
        </h2>
        <p className="font-body-lg text-body-lg mb-6 opacity-80">
          NATI NBA SHOP is more than a clothing brand — it's a tribute to the culture, passion, and legacy of basketball. Every piece we design is inspired by the icons of the game, the energy of game night, and the fans who live and breathe the sport year-round.
        </p>
        <p className="font-body-lg text-body-lg mb-10 opacity-80">
          We use only the highest-grade cotton and premium materials, so your gear is as tough as the players you cheer for. This is streetwear built for those who love the NBA — on the court, in the stands, and everywhere in between.
        </p>
        <button className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300">
          Read Our Story
        </button>
      </div>
    </section>
  )
}
