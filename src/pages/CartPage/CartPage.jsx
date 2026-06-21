import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

export default function CartPage() {
  const { user } = useAuth()
  const { refreshCart } = useCart()
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCart = async () => {
    if (!user) { setLoading(false); return }

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', user.id)

    if (!error && data) setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetchCart() }, [user])

  const removeItem = async (itemId) => {
    await supabase.from('cart_items').delete().eq('id', itemId)
    setItems((prev) => prev.filter((i) => i.id !== itemId))
    refreshCart()
    showToast('Item removed from cart', 'info')
  }

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return
    await supabase.from('cart_items').update({ quantity: newQty }).eq('id', itemId)
    setItems((prev) => prev.map((i) => i.id === itemId ? { ...i, quantity: newQty } : i))
    refreshCart()
  }

  const total = items.reduce((sum, item) => sum + Number(item.products?.price ?? 0) * item.quantity, 0)

  if (!user) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl mb-6 opacity-20">shopping_cart</span>
        <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Sign In to View Cart</h1>
        <p className="font-body-lg opacity-60 mb-10 max-w-md">You need to be signed in to add items and view your cart.</p>
        <Link to="/signin" className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300">
          Sign In
        </Link>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse font-label-bold uppercase tracking-widest opacity-40">Loading cart...</div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl mb-6 opacity-20">shopping_cart</span>
        <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Your Cart is Empty</h1>
        <p className="font-body-lg opacity-60 mb-10 max-w-md">Browse our latest drops and find something worth owning.</p>
        <Link to="/" className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300">
          Shop Now
        </Link>
      </section>
    )
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <h1 className="font-headline-lg text-headline-lg uppercase mb-12">Your Cart</h1>

      <div className="flex flex-col gap-6 mb-12">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6 border-b border-neutral-200 pb-6 items-center">
            <div className="w-24 h-32 border-2 border-black overflow-hidden flex-shrink-0">
              <img src={item.products?.image_url} alt={item.products?.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-headline-md text-lg uppercase mb-1">{item.products?.name}</h3>
              <p className="font-body-md text-secondary font-bold">${Number(item.products?.price).toFixed(2)}</p>
              <div className="flex items-center gap-3 mt-1">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 border border-black font-bold hover:bg-black hover:text-white transition-colors">−</button>
                <span className="text-sm font-label-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 border border-black font-bold hover:bg-black hover:text-white transition-colors">+</button>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="material-symbols-outlined opacity-40 hover:opacity-100 hover:text-secondary transition-all"
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t-2 border-black pt-6">
        <div>
          <p className="font-label-bold uppercase text-sm opacity-40">Total</p>
          <p className="font-headline-md text-2xl uppercase">${total.toFixed(2)}</p>
        </div>
        <button className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300">
          Checkout
        </button>
      </div>
    </section>
  )
}
