import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const empty = { full_name: '', email: '', phone: '', address: '', city: '' }

export default function CheckoutPage() {
  const { user } = useAuth()
  const { refreshCart } = useCart()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) { setLoading(false); return }
    supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setItems(data ?? [])
        setForm((f) => ({ ...f, email: user.email ?? '' }))
        setLoading(false)
      })
  }, [user])

  const total = items.reduce((sum, item) => sum + Number(item.products?.price ?? 0) * item.quantity, 0)

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return
    setPlacing(true)
    setError('')

    try {
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          total,
          status: 'pending',
        })
        .select()
        .single()

      if (orderErr) throw orderErr

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.products?.name ?? '',
        product_price: Number(item.products?.price ?? 0),
        quantity: item.quantity,
        image_url: item.products?.image_url ?? null,
      }))

      const { error: itemsErr } = await supabase.from('order_items').insert(orderItems)
      if (itemsErr) throw itemsErr

      await supabase.from('cart_items').delete().eq('user_id', user.id)
      refreshCart()

      navigate('/order-success', { state: { orderId: order.id, total } })
    } catch (err) {
      setError(err.message)
      setPlacing(false)
    }
  }

  if (!user) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Sign In to Checkout</h1>
        <Link to="/signin" className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300">
          Sign In
        </Link>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse font-label-bold uppercase tracking-widest opacity-40">Loading...</div>
      </section>
    )
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <h1 className="font-space-grotesk font-black text-3xl uppercase tracking-tight mb-10">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          {/* Left - form */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-space-grotesk font-bold uppercase text-sm mb-5">Delivery Details</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => set('full_name', e.target.value)}
                    required
                    placeholder="e.g. Nati Cohen"
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      required
                      className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="e.g. 050-1234567"
                      className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Address</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => set('address', e.target.value)}
                    required
                    placeholder="e.g. 123 Main Street"
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    required
                    placeholder="e.g. Tel Aviv"
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-600 p-4">
                <p className="text-red-600 font-bold text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right - order summary */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-space-grotesk font-bold uppercase text-sm mb-5">Order Summary</h2>
              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-14 h-16 border border-gray-200 overflow-hidden flex-shrink-0">
                      {item.products?.image_url ? (
                        <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-300 text-sm">checkroom</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-space-grotesk font-bold text-sm uppercase">{item.products?.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-space-grotesk font-bold text-sm">
                      ${(Number(item.products?.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-black pt-4 flex justify-between items-center mb-6">
                <span className="font-space-grotesk font-bold uppercase text-sm">Total</span>
                <span className="font-space-grotesk font-black text-xl">${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={placing || items.length === 0}
                className="w-full bg-black text-white py-4 font-space-grotesk font-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
              <Link
                to="/cart"
                className="block text-center mt-3 text-sm font-space-grotesk text-gray-400 hover:text-black transition-colors"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
