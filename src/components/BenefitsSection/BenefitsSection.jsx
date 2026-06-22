const benefits = [
  { icon: 'diamond', title: 'Premium Quality', description: 'Heavyweight 500GSM cotton, built to last all season.' },
  { icon: 'local_shipping', title: 'Free Shipping', description: 'Free on all orders over $75. Fast nationwide delivery.' },
  { icon: 'sports_basketball', title: 'NBA Fan Gear', description: 'Officially inspired designs for true fans of the game.' },
  { icon: 'bolt', title: 'Limited Drops', description: 'Exclusive releases — never restocked. Get it before it\'s gone.' },
]

export default function BenefitsSection() {
  return (
    <section className="bg-white border-b-2 border-black py-16 grid grid-cols-2 lg:grid-cols-4 px-margin-mobile md:px-margin-desktop gap-8">
      {benefits.map((benefit) => (
        <div key={benefit.icon} className="flex flex-col items-center text-center gap-4 group">
          <div className="w-16 h-16 bg-surface-container flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
            <span className="material-symbols-outlined text-3xl group-hover:text-white transition-colors duration-300">
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
