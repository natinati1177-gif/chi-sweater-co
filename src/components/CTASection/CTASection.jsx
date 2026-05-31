export default function CTASection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white border-y-4 border-black">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-2/3">
          <h2 className="font-display-xl text-display-xl uppercase leading-none mb-6">
            Upgrade Your<br />Streetwear Game
          </h2>
          <p className="font-body-lg text-body-lg opacity-80 max-w-xl">
            Join the collective. Get early access to limited drops and exclusive Chicago-only events. The streets are waiting.
          </p>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <button className="w-full bg-black text-white px-10 py-6 font-display-xl text-headline-md uppercase tracking-widest hover:bg-secondary transition-all duration-300">
            Shop Collection
          </button>
          <div className="flex items-center gap-4 border-b-2 border-black pb-2">
            <input
              className="bg-transparent w-full font-label-bold uppercase placeholder:text-neutral-400 border-none focus:ring-0"
              placeholder="JOIN THE LIST"
              type="email"
            />
            <button className="material-symbols-outlined">arrow_forward</button>
          </div>
        </div>
      </div>
    </section>
  )
}
