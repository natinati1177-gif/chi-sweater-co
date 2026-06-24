export default function ReturnsPage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-3xl">
      <p className="font-label-bold text-secondary uppercase tracking-widest text-sm mb-3">Legal</p>
      <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-12">Returns & Exchanges</h1>

      <div className="flex flex-col gap-10 font-body-md opacity-80 leading-relaxed">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['30 Days', 'Return window from delivery date'],
            ['Free Returns', 'On all domestic orders'],
            ['24h Cancellation', 'Cancel before your order ships'],
          ].map(([stat, desc]) => (
            <div key={stat} className="border-2 border-black p-5">
              <p className="font-headline-md text-2xl uppercase font-black text-red-600 mb-1">{stat}</p>
              <p className="font-label-bold uppercase text-xs opacity-60">{desc}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Return Policy</h2>
          <p>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Items that have been worn, washed, or damaged will not be accepted for return.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">How to Return</h2>
          <ol className="flex flex-col gap-3 list-none">
            {[
              'Email us at natinati1177@gmail.com with your order number and reason for return.',
              'We\'ll send you a prepaid return shipping label within 1 business day.',
              'Pack your item securely and drop it off at the nearest shipping location.',
              'Once we receive and inspect your return, a refund will be issued within 3–5 business days.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-7 h-7 bg-red-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Exchanges</h2>
          <p>We currently do not offer direct exchanges. If you need a different size or color, please return your original item and place a new order. This ensures you get the item before it sells out.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Order Cancellations</h2>
          <p>You may cancel your order within 24 hours of placing it, as long as it has not yet been shipped. To cancel, contact us immediately at <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a>. Once an order has been shipped, it cannot be cancelled — but you can return it after delivery.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Non-Returnable Items</h2>
          <ul className="flex flex-col gap-2 list-none">
            {['Items marked as Final Sale', 'Items without original tags', 'Items showing signs of wear or washing', 'Posters and printed items (due to hygiene)'].map((item) => (
              <li key={item} className="flex gap-3 items-center">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-red-600 pl-5">
          <p className="text-sm">Need help with a return? Email <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a> and we'll take care of you.</p>
        </div>
      </div>
    </section>
  )
}
