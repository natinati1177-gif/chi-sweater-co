import { useEffect, useState, useRef } from 'react'
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
  const [showSticky, setShowSticky] = useState(false)

  const addToCartRef = useRef(null)

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

  useEffect(() => {
    if (!addToCartRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(addToCartRef.current)
    return () => observer.disconnect()
  }, [product])

  const handleAddToCart = async () => {
    if (!user) { navigate('/signin'); return }
    if (!selectedSize) { setSizeError(true); return }

    setAdding(true)
    setSizeError(false)

    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', user.id)
      .eq('product_id', product.id)
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
        .insert({ user_id: user.id, product_id: product.id, quantity: 1 }))
    }

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
        <Link to="/" className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-red-600 transition-all">
          Back to Shop
        </Link>
      </section>
    )
  }

  return (
    <>
      {/* Red top accent bar */}
      <div className="bg-red-600 text-white py-2 px-margin-mobile md:px-margin-desktop flex items-center justify-center gap-6 text-xs font-label-bold uppercase tracking-widest">
        <span>🏀 Authentic NBA Fan Gear</span>
        <span className="opacity-40">|</span>
        <span>Free Shipping Over $75</span>
        <span className="opacity-40">|</span>
        <span>30-Day Returns</span>
      </div>

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop pb-32">
        <Link to="/shop" className="inline-flex items-center gap-2 font-label-bold uppercase text-sm mb-10 hover:text-red-600 transition-colors group">
          <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <div className="relative border-2 border-black overflow-hidden aspect-[3/4] group">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className={`${product.badge_variant === 'secondary' ? 'bg-red-600' : 'bg-black'} text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest`}>
                  {product.badge}
                </span>
              </div>
            )}
            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-red-600" />
            <div className="absolute bottom-2 right-2 w-16 h-16 border-2 border-white" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8 pt-4">
            {/* Brand + name */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  NATI NBA SHOP
                </span>
                <span className="font-label-bold uppercase text-xs opacity-40 tracking-widest">— Official Fan Gear</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-4">
                {product.name}
              </h1>
              <div className="flex items-end gap-4">
                <p className="font-headline-md text-4xl font-black text-red-600">
                  ${Number(product.price).toFixed(2)}
                </p>
                <span className="font-body-md text-sm opacity-40 line-through mb-1">
                  ${(Number(product.price) * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-black uppercase mb-1">
                  SAVE 20%
                </span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: 'local_shipping', label: 'Free Shipping $75+' },
                { icon: 'replay', label: '30-Day Returns' },
                { icon: 'verified', label: 'Authentic Gear' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 border border-black px-3 py-1.5">
                  <span className="material-symbols-outlined text-base text-red-600">{icon}</span>
                  <span className="font-label-bold text-xs uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            <p className="font-body-md opacity-70 leading-relaxed">
              {product.description || 'Premium NBA fan gear. Built for those who live and breathe the game. Limited quantities — get it before it sells out.'}
            </p>

            {/* Size selector */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-bold uppercase text-sm">Select Size</span>
                {sizeError && (
                  <span className="text-red-600 font-label-bold text-xs uppercase animate-pulse">⚠ Please select a size</span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`w-12 h-12 border-2 font-label-bold text-sm uppercase transition-all duration-150
                      ${selectedSize === size
                        ? 'bg-red-600 text-white border-red-600 scale-110'
                        : 'bg-white text-black border-black hover:border-red-600 hover:text-red-600'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div ref={addToCartRef} className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`py-5 font-label-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 text-sm
                  ${added
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white hover:bg-black'
                  }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {adding
                    ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Adding...</>
                    : added
                    ? <><span className="material-symbols-outlined text-base">check_circle</span> Added to Cart!</>
                    : <><span className="material-symbols-outlined text-base">shopping_cart</span> Add to Cart</>
                  }
                </span>
              </button>
              <button className="border-2 border-black py-4 font-label-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all duration-300 active:scale-95">
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">favorite_border</span>
                  Save to Wishlist
                </span>
              </button>
            </div>

            {/* Details strip */}
            <div className="border-t-2 border-black pt-6 flex flex-col gap-3">
              {[
                ['Condition', 'Brand New'],
                ['Ships From', 'United States'],
                ['Delivery', '3–7 Business Days'],
                ['Returns', '30-Day Free Returns'],
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

      {/* Sticky Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-red-600 text-white shadow-2xl border-t-4 border-black">
          <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-3 flex items-center justify-between gap-4">
            <div className="hidden sm:block min-w-0">
              <p className="font-label-bold uppercase text-sm truncate">{product.name}</p>
              <p className="font-black text-2xl leading-none">${Number(product.price).toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-3 flex-1 sm:flex-none justify-center">
              {selectedSize ? (
                <span className="bg-white text-red-600 px-3 py-2 font-black text-sm uppercase">
                  Size: {selectedSize}
                </span>
              ) : (
                <span className="bg-black bg-opacity-30 px-3 py-2 font-label-bold text-xs uppercase tracking-widest">
                  Select a size ↑
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`px-8 py-4 font-label-bold uppercase tracking-widest text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 whitespace-nowrap
                ${added ? 'bg-green-500 text-white' : 'bg-white text-red-600 hover:bg-black hover:text-white'}`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">
                  {added ? 'check_circle' : 'shopping_cart'}
                </span>
                {adding ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
