export default function TeamSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <h2 className="font-headline-lg text-headline-lg uppercase mb-12">
        The People<br />Behind the Brand.
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Photo */}
        <div className="w-full md:w-[380px] flex-shrink-0">
          <div className="overflow-hidden aspect-[3/4] border-2 border-black bg-neutral-100">
            <img
              src="https://kwhvzqakxbadvvajdftp.supabase.co/storage/v1/object/public/product-images/WhatsApp%20Image%202026-06-22%20at%2014.00.31.jpeg"
              alt="Founder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex-1 pt-2">
          <p className="font-label-bold text-secondary uppercase tracking-widest text-sm mb-2">
            Founder & Creative Director
          </p>
          <h3 className="font-headline-lg text-headline-lg uppercase mb-6">
            Nati Sendeke.
          </h3>
          <p className="font-body-lg text-body-lg opacity-80 mb-6">
            From a young age, I had two loves: hip-hop and the NBA. Not two separate worlds — one world that moved together. The music, the courts, the players, the style.
          </p>
          <p className="font-body-lg text-body-lg opacity-80 mb-6">
            I used to wake up in the middle of the night just to watch Kobe do what nobody else could. Michael making it look easy. The show, the moment, the feeling — only those who lived it really understand.
          </p>
          <p className="font-body-lg text-body-lg opacity-80 mb-6">
            I grew up wearing jerseys, scarves, caps — anything that connected me to that culture. But nothing ever felt right. The gear was generic. The streetwear didn't carry the soul. I always felt like something was missing.
          </p>
          <p className="font-body-lg text-body-lg opacity-80 mb-6">
            So I took the passion I grew up with and built something of my own. NATI NBA SHOP is the brand I always wanted to buy from. Every piece is personally designed by me, every drop is limited, and everything we make is rooted in the culture that raised me — the court, the block, and everything in between.
          </p>
          <div className="flex gap-8 border-t-2 border-black pt-8 mt-8">
            <div>
              <p className="font-label-bold uppercase text-secondary text-xs tracking-widest mb-1">Est.</p>
              <p className="font-headline-md text-2xl uppercase">2019</p>
            </div>
            <div>
              <p className="font-label-bold uppercase text-secondary text-xs tracking-widest mb-1">Drops / Year</p>
              <p className="font-headline-md text-2xl uppercase">24+</p>
            </div>
            <div>
              <p className="font-label-bold uppercase text-secondary text-xs tracking-widest mb-1">Ships To</p>
              <p className="font-headline-md text-2xl uppercase">Worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
