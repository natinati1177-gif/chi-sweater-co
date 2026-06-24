const SIZES = [
  { size: 'XS', chest: '32–34"', waist: '26–28"', hips: '34–36"', height: '5\'3"–5\'5"' },
  { size: 'S',  chest: '35–37"', waist: '29–31"', hips: '37–39"', height: '5\'5"–5\'7"' },
  { size: 'M',  chest: '38–40"', waist: '32–34"', hips: '40–42"', height: '5\'7"–5\'9"' },
  { size: 'L',  chest: '41–43"', waist: '35–37"', hips: '43–45"', height: '5\'9"–5\'11"' },
  { size: 'XL', chest: '44–46"', waist: '38–40"', hips: '46–48"', height: '5\'11"–6\'1"' },
  { size: 'XXL',chest: '47–50"', waist: '41–44"', hips: '49–52"', height: '6\'1"–6\'3"' },
]

export default function SizeGuidePage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-3xl">
      <p className="font-label-bold text-secondary uppercase tracking-widest text-sm mb-3">Help</p>
      <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-4">Size Guide</h1>
      <p className="font-body-md opacity-60 mb-12 max-w-lg">All measurements are in inches. If you're between sizes, we recommend sizing up for a more relaxed, streetwear fit.</p>

      {/* Size table */}
      <div className="border-2 border-black overflow-hidden mb-14">
        <div className="grid grid-cols-5 bg-black text-white px-5 py-3">
          {['Size', 'Chest', 'Waist', 'Hips', 'Height'].map((h) => (
            <span key={h} className="font-label-bold uppercase text-xs tracking-widest">{h}</span>
          ))}
        </div>
        {SIZES.map((row, i) => (
          <div key={row.size} className={`grid grid-cols-5 px-5 py-4 text-sm border-t border-neutral-200 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
            <span className="font-black text-red-600 uppercase">{row.size}</span>
            <span className="font-body-md opacity-70">{row.chest}</span>
            <span className="font-body-md opacity-70">{row.waist}</span>
            <span className="font-body-md opacity-70">{row.hips}</span>
            <span className="font-body-md opacity-70">{row.height}</span>
          </div>
        ))}
      </div>

      {/* How to measure */}
      <h2 className="font-label-bold uppercase tracking-widest text-sm mb-6">How to Measure</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {[
          { label: 'Chest', icon: 'straighten', desc: 'Measure around the fullest part of your chest, keeping the tape parallel to the floor.' },
          { label: 'Waist', icon: 'compress', desc: 'Measure around your natural waistline, about 1 inch above your belly button.' },
          { label: 'Hips', icon: 'expand', desc: 'Measure around the fullest part of your hips, keeping the tape parallel to the floor.' },
        ].map(({ label, icon, desc }) => (
          <div key={label} className="border-2 border-black p-5">
            <span className="material-symbols-outlined text-red-600 text-2xl mb-3 block">{icon}</span>
            <p className="font-label-bold uppercase text-sm mb-2">{label}</p>
            <p className="font-body-md text-sm opacity-60 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Fit guide */}
      <h2 className="font-label-bold uppercase tracking-widest text-sm mb-6">Our Fit</h2>
      <div className="flex flex-col gap-4 mb-14">
        {[
          ['Oversized / Streetwear Fit', 'Size up 1–2 sizes for the baggy, dropped-shoulder look. Common for hoodies and tees.'],
          ['Regular Fit', 'True to size. Use the measurements above to find your size.'],
          ['Slim Fit', 'Size down 1 size if you prefer a closer fit.'],
        ].map(([fit, desc]) => (
          <div key={fit} className="flex gap-4 items-start border-l-4 border-red-600 pl-5 py-1">
            <div>
              <p className="font-label-bold uppercase text-sm mb-1">{fit}</p>
              <p className="font-body-md text-sm opacity-60">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-l-4 border-red-600 pl-5">
        <p className="font-body-md text-sm opacity-70">Still unsure about your size? Email us at <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a> and we'll help you find the right fit.</p>
      </div>
    </section>
  )
}
