import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ProductCard from '../ProductCard/ProductCard'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .limit(4)
      .then(({ data, error }) => {
        if (!error && data) setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-1">
            New Arrivals
          </p>
          <h2 className="font-space-grotesk font-black text-3xl md:text-4xl uppercase">
            Featured Drops
          </h2>
        </div>
        <Link
          to="/shop"
          className="font-space-grotesk font-bold text-xs uppercase tracking-widest border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors whitespace-nowrap"
        >
          Shop All →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-neutral-100 animate-pulse border-2 border-black" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={`$${Number(product.price).toFixed(2)}`}
              badge={product.badge}
              badgeVariant={product.badge_variant === 'secondary' ? 'red' : 'black'}
              image={product.image_url}
              offset={i % 2 !== 0}
            />
          ))}
        </div>
      )}
    </section>
  )
}
