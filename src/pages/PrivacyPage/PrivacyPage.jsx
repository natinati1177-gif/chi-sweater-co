export default function PrivacyPage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-3xl">
      <p className="font-label-bold text-secondary uppercase tracking-widest text-sm mb-3">Legal</p>
      <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-4">Privacy Policy</h1>
      <p className="font-body-md opacity-50 text-sm mb-12">Last updated: June 2026</p>

      <div className="flex flex-col gap-10 font-body-md opacity-80 leading-relaxed">

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">1. Information We Collect</h2>
          <p className="mb-3">When you use NATI NBA SHOP, we collect the following types of information:</p>
          <ul className="flex flex-col gap-2">
            {[
              'Account information: name and email address when you register',
              'Order information: shipping address, items purchased, payment method (processed securely — we never store card details)',
              'Usage data: pages visited, products viewed, browser type',
              'Communications: emails you send us',
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">2. How We Use Your Information</h2>
          <ul className="flex flex-col gap-2">
            {[
              'To process and fulfill your orders',
              'To send order confirmations and shipping updates',
              'To respond to your customer support requests',
              'To send marketing emails (only if you opted in)',
              'To improve our website and product offerings',
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">3. Data Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
          <ul className="flex flex-col gap-2 mt-3">
            {[
              'Shipping carriers (to deliver your orders)',
              'Payment processors (to charge your card securely)',
              'Email service providers (to send transactional emails)',
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">4. Cookies</h2>
          <p>We use cookies and similar technologies to remember your preferences, keep you signed in, and understand how visitors use our site. You can disable cookies in your browser settings, but some features may not work correctly.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">5. Data Security</h2>
          <p>We take reasonable measures to protect your personal information. Your account is protected by a password, and payment information is processed using industry-standard SSL encryption. However, no internet transmission is 100% secure.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">6. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time. To exercise these rights, contact us at <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a>.</p>
        </div>

        <div>
          <h2 className="font-label-bold uppercase tracking-widest text-sm mb-3 opacity-100">7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>
        </div>

        <div className="border-l-4 border-red-600 pl-5">
          <p className="text-sm">Questions about your privacy? Contact us at <a href="mailto:natinati1177@gmail.com" className="text-red-600 hover:underline">natinati1177@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  )
}
