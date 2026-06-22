import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

export default function ProductCard({ id, name, price, badge, badgeVariant = 'black', image }) {
  const { user } = useAuth()
  const { refreshCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [wished, setWished] = useState(false)

  const handleAddToCart = async (e) => {
    if (e) e.preventDefault()
    if (!user) { navigate('/signin'); return }

    setAdding(true)
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', user.id)
      .eq('product_id', id)
      .maybeSingle()

    let error
    if (existing) {
      ;({ error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + 1 })
        .eq('id', existing.id))
    } else {
      ;({ error } = await supabase
        .from('cart_items')
        .insert({ user_id: user.id, product_id: id, quantity: 1 }))
    }

    setAdding(false)
    if (!error) {
      setAdded(true)
      refreshCart()
      showToast(`${name} added to cart`)
      setTimeout(() => setAdded(false), 2000)
    } else {
      showToast('Failed to add item', 'error')
    }
  }

  return (
    <div className="group relative flex flex-col">
      {/* Image container */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-[3/4] bg-neutral-50 border-2 border-black mb-3 flex-shrink-0">
        {/* Product image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Add — slides up from bottom on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`w-full py-4 font-space-grotesk font-black uppercase text-sm tracking-widest transition-colors ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-white text-black hover:bg-red-600 hover:text-white'
            } disabled:opacity-60`}
          >
            {adding ? 'Adding...' : added ? '✓ Added' : 'Quick Add'}
          </button>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
              badgeVariant === 'red' ? 'bg-red-600' : 'bg-black'
            }`}>
              {badge}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); setWished(w => !w) }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md ${
            wished ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-red-600 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: wished ? "'FILL' 1" : "'FILL' 0" }}>
            favorite
          </span>
        </button>
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <Link to={`/product/${id}`} className="group/title">
          <h3 className="font-space-grotesk font-black text-sm md:text-base uppercase leading-tight mb-1 group-hover/title:text-red-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="font-space-grotesk font-bold text-red-600 text-base">{price}</p>
      </div>
    </div>
  )
}
