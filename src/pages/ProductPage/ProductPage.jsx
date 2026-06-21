import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { refreshCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProduct(data)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = async () => {
    if (!user) { navigate('/signin'); return }
    if (!selectedSize) { setSizeError(true); return }

    setAdding(true)
    setSizeError(false)

    const { error } = await supabase
      .from('cart_items')
      .upsert(
        { user_id: user.id, product_id: product.id, quantity: 1 },
        { onConflict: 'user_id,product_id' }
      )

    setAdding(false)
    if (!error) {
      setAdded(true)
      refreshCart()
      showToast(`${product.name} added to cart`)
      setTimeout(() => setAdded(false), 2500)
    } else {
      showToast('Failed to add item', 'error')
    }
  }

  if (loading) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="aspect-[3/4] bg-neutral-100 animate-pulse border-2 border-black" />
          <div className="flex flex-col gap-4 pt-4">
            <div className="h-8 bg-neutral-100 animate-pulse w-3/4" />
            <div className="h-6 bg-neutral-100 animate-pulse w-1/4" />
            <div className="h-4 bg-neutral-100 animate-pulse w-full mt-4" />
            <div className="h-4 bg-neutral-100 animate-pulse w-5/6" />
          </div>
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Product Not Found</h1>
        <Link to="/" className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all">
          Back to Shop
        </Link>
      </section>
    )
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <Link to="/" className="inline-flex items-center gap-2 font-label-bold uppercase text-sm mb-10 hover:text-secondary transition-colors">
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className="relative border-2 border-black overflow-hidden aspect-[3/4]">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className={`${product.badge_variant === 'secondary' ? 'bg-red-600' : 'bg-black'} text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest`}>
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-8 pt-4">
          <div>
            <span className="font-label-bold uppercase tracking-widest text-sm text-secondary mb-2 block">
              NATI HIP HOP SHOP
            </span>
            <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-4">
              {product.name}
            </h1>
            <p className="font-headline-md text-3xl font-black text-secondary">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <p className="font-body-md opacity-70 leading-relaxed">
            {product.description || 'Premium Chicago streetwear. Heavyweight 500GSM cotton. Built for the city, made to last.'}
          </p>

          {/* Size selector */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-bold uppercase text-sm">Select Size</span>
              {sizeError && (
                <span className="text-red-600 font-label-bold text-xs uppercase">Please select a size</span>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}
                  className={`w-12 h-12 border-2 font-label-bold text-sm uppercase transition-all duration-150
                    ${selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:border-red-600 hover:text-red-600'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="bg-black text-white py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 disabled:opacity-50 text-sm"
          >
            {adding ? 'Adding...' : added ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>

          {/* Details strip */}
          <div className="border-t-2 border-black pt-6 flex flex-col gap-3">
            {[
              ['Material', '500GSM Heavyweight Cotton'],
              ['Fit', 'Oversized / Relaxed'],
              ['Origin', 'Chicago, IL'],
              ['Care', 'Machine wash cold, tumble dry low'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between font-body-md text-sm">
                <span className="font-label-bold uppercase opacity-50">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
