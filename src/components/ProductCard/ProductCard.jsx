import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function ProductCard({ id, name, price, badge, badgeVariant = 'black', image, offset = false }) {
  const { user } = useAuth()
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
      setTimeout(() => setAdded(false), 2000)
    }
  }

  return (
    <div className={`group card-hover relative ${offset ? 'lg:translate-y-12' : ''}`}>
      <div className="overflow-hidden bg-surface-container-high aspect-[3/4] border-2 border-black mb-4">
        <img
          className="w-full h-full object-cover transition-transform duration-500"
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
      </div>
      <h3 className="font-headline-md text-xl uppercase mb-1">{name}</h3>
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
