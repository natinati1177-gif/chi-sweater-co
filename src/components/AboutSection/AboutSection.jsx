export default function AboutSection() {
  return (
    <section className="py-section-gap flex flex-col md:flex-row items-center gap-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div className="w-full md:w-1/2 relative">
        <div className="hidden md:block absolute -top-10 -left-10 w-full h-full border-4 border-secondary -z-10"></div>
        <img
          className="w-full aspect-square object-cover border-2 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
          alt="Hip hop streetwear"
        />
      </div>
      <div className="w-full md:w-1/2">
        <span className="text-secondary font-label-bold uppercase tracking-widest mb-4 block">Our DNA</span>
        <h2 className="font-headline-lg text-headline-lg uppercase mb-8">
          Engineered for the<br />Midwest Cold.
        </h2>
        <p className="font-body-lg text-body-lg mb-6 opacity-80">
          Born in the heart of the Loop, NATI HIP HOP SHOP isn't just about apparel—it's a tribute to the resilience and rhythm of Chicago. Every stitch is inspired by the city's industrial past and its vibrant streetwear future.
        </p>
        <p className="font-body-lg text-body-lg mb-10 opacity-80">
          We use only the highest-grade cotton and sustainable dyes, ensuring that your look is as durable as the city itself. This is high-fashion minimalism for those who walk the streets with purpose.
        </p>
        <button className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300">
          Read Our Story
        </button>
      </div>
    </section>
  )
}
