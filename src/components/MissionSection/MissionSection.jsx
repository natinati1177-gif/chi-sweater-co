const stats = [
  { label: 'Est.', value: '2019' },
  { label: 'Drops / Year', value: '24+' },
  { label: 'Ships To', value: 'Worldwide' },
]

export default function MissionSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white border-b-2 border-black">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left: text */}
        <div className="w-full lg:w-2/3">
          <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Our Mission</span>
          <h2 className="font-headline-lg text-headline-lg uppercase mb-8">
            Built for the Game.<br />
            <span className="text-secondary">Worn for Life.</span>
          </h2>
          <p className="font-body-lg text-body-lg mb-6 opacity-80">
            NATI NBA SHOP was born from a simple obsession — the culture, the players, the energy of basketball. We were tired of fan gear that looked cheap and felt worse. So we built something different: premium NBA-inspired apparel that lives up to the passion of the fans who wear it.
          </p>
          <p className="font-body-lg text-body-lg mb-6 opacity-80">
            Every piece is designed with the game in mind — from the icons who defined eras to the teams that move millions of people. We drop limited quantities, curated collections, and exclusive collaborations that celebrate the sport we love.
          </p>
          <p className="font-body-lg text-body-lg opacity-80">
            We don't do restocks. We don't do compromises. If you sleep on a drop, it's gone — just like a buzzer beater you'll be talking about for years.
          </p>
        </div>

        {/* Right: stats */}
        <div className="w-full lg:w-1/3 flex flex-col gap-0 border-2 border-black">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`p-8 ${i < stats.length - 1 ? 'border-b-2 border-black' : ''}`}>
              <p className="font-label-bold uppercase text-secondary mb-2">{stat.label}</p>
              <p className="font-headline-lg text-headline-lg uppercase leading-none">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
