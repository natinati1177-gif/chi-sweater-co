const benefits = [
  { icon: 'diamond', title: 'Premium Materials', description: 'Heavyweight 500GSM cotton fleece.' },
  { icon: 'local_shipping', title: 'Fast Shipping', description: 'Overnight delivery across the Loop.' },
  { icon: 'apparel', title: 'Streetwear Design', description: 'Oversized fits for maximum comfort.' },
  { icon: 'warning', title: 'Limited Drops', description: 'Never restocked. Only 100 per style.' },
]

export default function BenefitsSection() {
  return (
    <section className="bg-white border-b-2 border-black py-16 grid grid-cols-2 lg:grid-cols-4 px-margin-mobile md:px-margin-desktop gap-8">
      {benefits.map((benefit) => (
        <div key={benefit.icon} className="flex flex-col items-center text-center gap-4 group">
          <div className="w-16 h-16 bg-surface-container flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
            <span className="material-symbols-outlined text-3xl group-hover:text-white">
              {benefit.icon}
            </span>
          </div>
          <h3 className="font-label-bold uppercase">{benefit.title}</h3>
          <p className="text-sm opacity-60">{benefit.description}</p>
        </div>
      ))}
    </section>
  )
}
