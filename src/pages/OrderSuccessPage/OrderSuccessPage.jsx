import { useLocation, Link } from 'react-router-dom'

export default function OrderSuccessPage() {
  const { state } = useLocation()
  const total = state?.total ?? 0
  const orderId = state?.orderId

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
      {/* Background watermark */}
      <span className="absolute font-space-grotesk font-black text-[200px] leading-none text-black/[0.03] select-none pointer-events-none">
        ✓
      </span>

      <div className="relative z-10 max-w-md w-full">
        {/* Icon */}
        <div className="w-24 h-24 bg-black flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        {/* Label */}
        <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-3">
          Order Confirmed
        </p>

        {/* Headline */}
        <h1 className="font-space-grotesk font-black text-4xl md:text-5xl uppercase leading-none mb-4">
          You're in the<br /><span className="text-red-600">Starting Five.</span>
        </h1>

        <p className="font-space-grotesk text-gray-500 mb-8">
          Your order is confirmed and being prepared. You'll receive an email update shortly.
        </p>

        {/* Order summary box */}
        <div className="border-2 border-black p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-gray-400">Order Total</span>
            <span className="font-space-grotesk font-black text-2xl">${total.toFixed(2)}</span>
          </div>
          {orderId && (
            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <span className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-gray-400">Order ID</span>
              <span className="font-space-grotesk text-xs text-gray-500 truncate max-w-[180px]">{orderId}</span>
            </div>
          )}
          <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
            <span className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-gray-400">Estimated Delivery</span>
            <span className="font-space-grotesk font-bold text-sm">3–7 Business Days</span>
          </div>
        </div>

        {/* Trust row */}
        <div className="flex justify-center gap-6 mb-10 text-xs font-space-grotesk text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-red-500">local_shipping</span>
            Free Shipping
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-red-500">replay</span>
            30-Day Returns
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-red-500">verified</span>
            Authentic
          </span>
        </div>

        {/* CTA */}
        <Link
          to="/shop"
          className="w-full block bg-red-600 text-white py-4 font-space-grotesk font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="block mt-3 font-space-grotesk text-sm text-gray-400 hover:text-black transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  )
}
