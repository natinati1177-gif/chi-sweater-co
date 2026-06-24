export default function ShippingPage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-3xl">
      <p className="font-label-bold text-secondary uppercase tracking-widest text-sm mb-3">Legal</p>
      <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-12">Shipping Policy</h1>

      <div className="flex flex-col gap-10 font-body-md opacity-80 leading-relaxed">

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Processing Time</h2>
          <p>All orders are processed within 1–3 business days. Orders placed on weekends or public holidays will be processed on the next business day. You will receive a shipping confirmation email with a tracking number once your order has been dispatched.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Shipping Rates & Delivery</h2>
          <div className="border-2 border-black overflow-hidden">
            {[
              ['Standard Shipping (US)', '3–7 Business Days', '$5.99'],
              ['Express Shipping (US)', '1–3 Business Days', '$14.99'],
              ['Free Standard Shipping (US)', '3–7 Business Days', 'Orders over $75'],
              ['International Shipping', '7–21 Business Days', '$19.99+'],
            ].map(([method, time, price], i) => (
              <div key={method} className={`grid grid-cols-3 px-5 py-4 text-sm ${i % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}>
                <span className="font-label-bold uppercase">{method}</span>
                <span className="opacity-60">{time}</span>
                <span className="font-label-bold text-red-600">{price}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">International Orders</h2>
          <p>We ship worldwide. International customers are responsible for any customs duties, taxes, or import fees charged by their country. These charges are not included in our shipping rates and are beyond our control.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Order Tracking</h2>
          <p>Once your order ships, you'll receive a confirmation email with a tracking link. Please allow up to 24 hours for tracking information to update after you receive the shipping email.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">Lost or Damaged Packages</h2>
          <p>If your order arrives damaged or is lost in transit, please contact us at <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a> within 7 days of the expected delivery date. We will work with the carrier to resolve the issue and send a replacement if necessary.</p>
        </div>

        <div className="border-l-4 border-red-600 pl-5">
          <p className="text-sm">Questions about your shipment? Reach us at <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a> — we respond within 24 hours.</p>
        </div>
      </div>
    </section>
  )
}
