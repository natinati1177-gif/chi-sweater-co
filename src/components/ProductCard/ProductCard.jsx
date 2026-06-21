import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

export default function ProductCard({ id, name, price, badge, badgeVariant = 'black', image, offset = false }) {
  const { user } = useAuth()
  const { refreshCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/signin')
      return
    }

    setAdding(true)
    const { error } = await supabase
      .from('cart_items')
      .upsert({ user_id: user.id, product_id: id, quantity: 1 }, { onConflict: 'user_id,product_id' })

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
    <div className={`group card-hover relative ${offset ? 'lg:translate-y-12' : ''}`}>
      <Link to={`/product/${id}`} className="block overflow-hidden bg-surface-container-high aspect-[3/4] border-2 border-black mb-4">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={name}
        />
        {badge && (
          <div className="absolute top-4 left-4">
            <span className={`${badgeVariant === 'red' ? 'bg-secondary' : 'bg-black'} text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}>
              {badge}
            </span>
          </div>
        )}
      </Link>
      <Link to={`/product/${id}`}>
        <h3 className="font-headline-md text-xl uppercase mb-1 hover:text-secondary transition-colors">{name}</h3>
      </Link>
      <p className="font-body-md text-secondary font-bold mb-4">{price}</p>
      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="w-full bg-black text-white py-4 font-label-bold uppercase tracking-widest hover:bg-secondary transition-colors active:scale-95 disabled:opacity-50"
      >
        {adding ? 'Adding...' : added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  )
}
