import { Link } from 'react-router-dom'

const FAQS = [
  {
    q: 'How do I cancel an order?',
    a: 'Contact us within 24 hours of placing your order. Once an order is shipped, it cannot be cancelled — but you can return it within 30 days.',
  },
  {
    q: 'How do I return a product?',
    a: 'We offer free 30-day returns on all orders. Reach out via email or WhatsApp with your order ID and we\'ll handle the rest.',
  },
  {
    q: 'When will my order arrive?',
    a: 'Standard delivery takes 3–7 business days. You\'ll receive a confirmation email once your order ships.',
  },
  {
    q: 'I didn\'t receive a confirmation email — what do I do?',
    a: 'Check your spam folder first. If it\'s not there, contact us with the email address you used at checkout and we\'ll look it up.',
  },
]

export default function ContactPage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">

      {/* Header */}
      <div className="mb-14">
        <p className="font-label-bold text-secondary uppercase tracking-widest text-sm mb-3">Get In Touch</p>
        <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-4">
          We're Here<br />For You.
        </h1>
        <p className="font-body-lg opacity-60 max-w-lg">
          Questions about an order, a return, or just want to talk about the game? We respond within 24 hours.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Contact methods */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">

          <a
            href="mailto:natinati1177@gmail.com"
            className="group flex items-center gap-5 border-2 border-black p-6 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-200">
              <span className="material-symbols-outlined text-white group-hover:text-red-600 transition-colors duration-200">mail</span>
            </div>
            <div>
              <p className="font-label-bold uppercase tracking-widest text-xs opacity-50 mb-1">Email</p>
              <p className="font-headline-md text-base uppercase">natinati1177@gmail.com</p>
              <p className="text-xs opacity-40 mt-1">Response within 24 hours</p>
            </div>
            <span className="material-symbols-outlined ml-auto opacity-20 group-hover:opacity-60 transition-opacity">arrow_forward</span>
          </a>

          <a
            href="https://wa.me/972501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 border-2 border-black p-6 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-200">
              <span className="material-symbols-outlined text-white group-hover:text-red-600 transition-colors duration-200">chat</span>
            </div>
            <div>
              <p className="font-label-bold uppercase tracking-widest text-xs opacity-50 mb-1">WhatsApp</p>
              <p className="font-headline-md text-base uppercase">Message Us</p>
              <p className="text-xs opacity-40 mt-1">Fastest way to reach us</p>
            </div>
            <span className="material-symbols-outlined ml-auto opacity-20 group-hover:opacity-60 transition-opacity">arrow_forward</span>
          </a>

          {/* Trust strip */}
          <div className="border-2 border-black p-6 bg-black text-white mt-2">
            <div className="flex flex-col gap-3">
              {[
                ['30-Day Free Returns', 'local_shipping'],
                ['Order Cancellation within 24h', 'cancel'],
                ['Authentic Products Only', 'verified'],
              ].map(([text, icon]) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500 text-[18px]">{icon}</span>
                  <span className="font-label-bold uppercase tracking-widest text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-headline-md uppercase text-lg mb-6">Common Questions</h2>
          <div className="flex flex-col divide-y-2 divide-black border-y-2 border-black">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group py-5 cursor-pointer">
                <summary className="flex justify-between items-center font-label-bold uppercase text-sm tracking-wide list-none">
                  {q}
                  <span className="material-symbols-outlined text-[18px] text-red-600 transition-transform duration-200 group-open:rotate-45 flex-shrink-0 ml-4">
                    add
                  </span>
                </summary>
                <p className="font-body-md opacity-60 text-sm mt-3 pr-8 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 border-l-4 border-red-600 pl-5">
            <p className="font-body-md opacity-60 text-sm">
              Can't find what you're looking for? Email us directly and we'll get back to you within one business day.
            </p>
            <a
              href="mailto:natinati1177@gmail.com"
              className="inline-block mt-3 font-label-bold uppercase tracking-widest text-xs text-red-600 hover:text-black transition-colors"
            >
              natinati1177@gmail.com →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
