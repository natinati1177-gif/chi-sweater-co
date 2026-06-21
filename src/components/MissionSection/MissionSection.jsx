const stats = [
  { label: 'Est.', value: '2019' },
  { label: 'Fabric Weight', value: '500GSM' },
  { label: 'Based In', value: 'Chicago, IL' },
]

export default function MissionSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-white border-b-2 border-black">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left: text */}
        <div className="w-full lg:w-2/3">
          <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Our Mission</span>
          <h2 className="font-headline-lg text-headline-lg uppercase mb-8">
            Born in the Loop.<br />
            <span className="text-secondary">Built to Last.</span>
          </h2>
          <p className="font-body-lg text-body-lg mb-6 opacity-80">
            NATI NBA SHOP started in a small studio off the Chicago Riverwalk in 2019. We were tired of streetwear that looked premium but fell apart after a season. So we engineered something different — garments with the same structural integrity as the city that inspired them.
          </p>
          <p className="font-body-lg text-body-lg mb-6 opacity-80">
            We source only 500GSM heavyweight cotton fleece, dyed with low-impact pigments that hold their color through Chicago winters. Every seam is double-stitched. Every drop is capped at 100 units. We don't restock. We don't compromise.
          </p>
          <p className="font-body-lg text-body-lg opacity-80">
            This city taught us that confidence isn't loud — it's precise. That's the energy we put into every piece.
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
