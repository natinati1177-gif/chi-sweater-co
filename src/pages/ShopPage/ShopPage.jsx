import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard/ProductCard'

const SORT_OPTIONS = [
  { value: 'newest', label: 'החדשים ביותר' },
  { value: 'price_asc', label: 'מחיר: נמוך לגבוה' },
  { value: 'price_desc', label: 'מחיר: גבוה לנמוך' },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const badgeFilter = searchParams.get('badge')

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sort, setSort] = useState('newest')
  const [search, setSearch] = useState('')

  const isLimited = badgeFilter === 'LIMITED'

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => setCategories(data ?? []))
  }, [])

  useEffect(() => {
    setLoading(true)
    let query = supabase.from('products').select('*').eq('in_stock', true)

    if (badgeFilter) query = query.eq('badge', badgeFilter)
    if (selectedCategory) query = query.eq('category_id', selectedCategory)
    if (search) query = query.ilike('name', `%${search}%`)

    if (sort === 'price_asc') query = query.order('price', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    query.then(({ data }) => {
      setProducts(data ?? [])
      setLoading(false)
    })
  }, [badgeFilter, selectedCategory, sort, search])

  const clearFilters = () => {
    setSelectedCategory('')
    setSort('newest')
    setSearch('')
    setSearchParams({})
  }

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-headline-lg text-headline-lg uppercase leading-none mb-2">
          {isLimited ? 'LIMITED EDITION' : 'SHOP ALL'}
        </h1>
        {isLimited && (
          <p className="font-body-md opacity-60">פריטים בלעדיים — כמויות מוגבלות</p>
        )}
        <div className="mt-4 w-16 h-1 bg-red-600" />
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש מוצר..."
            className="border-2 border-black pl-4 pr-10 py-2 font-space-grotesk text-sm focus:outline-none focus:border-red-600 w-52"
          />
        </div>

        {/* Category */}
        {!isLimited && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-2 border-black px-4 py-2 font-space-grotesk text-sm bg-white focus:outline-none"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border-2 border-black px-4 py-2 font-space-grotesk text-sm bg-white focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Clear */}
        {(selectedCategory || search || sort !== 'newest') && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-space-grotesk font-bold text-red-600 hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            נקה סינון
          </button>
        )}

        <span className="ml-auto font-space-grotesk text-sm text-gray-400 font-bold">
          {products.length} מוצרים
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-[3/4] bg-neutral-100 animate-pulse border-2 border-black" />
              <div className="h-4 bg-neutral-100 animate-pulse w-3/4" />
              <div className="h-4 bg-neutral-100 animate-pulse w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">inventory_2</span>
          <h2 className="font-space-grotesk font-black uppercase text-xl mb-2">אין מוצרים</h2>
          <p className="text-gray-400 text-sm mb-6">נסה לשנות את הסינון</p>
          <button onClick={clearFilters} className="bg-black text-white px-8 py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-red-600 transition-colors">
            הצג הכל
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={`$${Number(p.price).toFixed(2)}`}
              badge={p.badge}
              badgeVariant={p.badge_variant}
              image={p.image_url}
            />
          ))}
        </div>
      )}
    </section>
  )
}
