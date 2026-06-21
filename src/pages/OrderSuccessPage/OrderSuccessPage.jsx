import { useLocation, Link } from 'react-router-dom'

export default function OrderSuccessPage() {
  const { state } = useLocation()
  const total = state?.total ?? 0

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-black flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-white text-4xl">check</span>
      </div>
      <h1 className="font-space-grotesk font-black text-3xl uppercase tracking-tight mb-4">Order Placed!</h1>
      <p className="font-space-grotesk text-gray-500 mb-2">Thank you for your order.</p>
      <p className="font-space-grotesk font-bold text-xl mb-10">Total: ${total.toFixed(2)}</p>
      <Link
        to="/shop"
        className="bg-black text-white px-10 py-5 font-space-grotesk font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
      >
        Continue Shopping
      </Link>
    </section>
  )
}
