import { useEffect, useState } from 'react'
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
      .then(({ data, error }) => {
        if (!error && data) setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-headline-lg text-headline-lg uppercase">
          Featured<br />Drops_024
        </h2>
        <a className="font-label-bold uppercase border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-colors" href="#">
          View All Products
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-neutral-100 animate-pulse border-2 border-black" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
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
