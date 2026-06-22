import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard/ProductCard'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
]


export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const badgeFilter = searchParams.get('badge')
  const isLimited = badgeFilter === 'LIMITED'

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sort, setSort] = useState('newest')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const CATEGORY_ORDER = ['Clothing', 'Hats', 'Posters', 'Scarves', 'Accessories']
    supabase.from('categories').select('*').then(({ data }) => {
      if (!data) return setCategories([])
      const sorted = [...data].sort((a, b) => {
        const ai = CATEGORY_ORDER.indexOf(a.name)
        const bi = CATEGORY_ORDER.indexOf(b.name)
        if (ai === -1 && bi === -1) return a.name.localeCompare(b.name)
        if (ai === -1) return 1
        if (bi === -1) return -1
        return ai - bi
      })
      setCategories(sorted)
      if (!badgeFilter) {
        const clothing = sorted.find(c => c.name === 'Clothing')
        if (clothing) setSelectedCategory(clothing.id)
      }
    })
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
    setSearchInput('')
    setSearchParams({})
  }

  const hasActiveFilters = selectedCategory || search || sort !== 'newest' || badgeFilter

  return (
    <div className="min-h-screen">

      {/* ── Hero Banner ── */}
      <div className="bg-black text-white relative overflow-hidden">
        {/* Background watermark text */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-space-grotesk font-black text-[20vw] uppercase text-white/[0.03] leading-none">
            {isLimited ? 'LIMITED' : 'SHOP'}
          </span>
        </div>

        {/* Red left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />

        <div className="relative px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-3">
            {isLimited ? '🔥 Exclusive Drops' : '🏀 NBA Fan Gear'}
          </p>
          <h1 className="font-space-grotesk font-black uppercase leading-none text-5xl md:text-7xl lg:text-8xl mb-4">
            {isLimited ? (
              <>LIMITED<br /><span className="text-red-600">EDITION</span></>
            ) : (
              <>SHOP<br /><span className="text-red-600">NOW</span></>
            )}
          </h1>
          <p className="font-space-grotesk text-sm text-gray-400 max-w-sm">
            {isLimited
              ? "Once they're gone, they're gone. No restocks."
              : 'Premium NBA fan gear. Every piece designed by Nati. Ships worldwide.'}
          </p>
        </div>
      </div>

      {/* ── Category Pills ── */}
      {!isLimited && (
        <div className="border-b-2 border-black bg-white sticky top-[57px] md:top-[61px] z-30">
          <div className="px-6 md:px-12 lg:px-20 py-3 flex gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                className={`whitespace-nowrap px-5 py-2 font-space-grotesk font-bold text-xs uppercase tracking-wider border-2 transition-colors flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory('')}
              className={`whitespace-nowrap px-5 py-2 font-space-grotesk font-bold text-xs uppercase tracking-wider border-2 transition-colors flex-shrink-0 ${
                !selectedCategory
                  ? 'bg-black text-white border-black'
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              All
            </button>
          </div>
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center gap-3 border-b border-gray-100 bg-white">
        {/* Count */}
        <span className="font-space-grotesk font-bold text-sm text-gray-400 mr-auto">
          {loading ? '...' : `${products.length} product${products.length !== 1 ? 's' : ''}`}
        </span>

        {/* Search */}
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearch(searchInput)}
            onBlur={() => setSearch(searchInput)}
            placeholder="Search..."
            className="border-2 border-black pl-9 pr-4 py-2 font-space-grotesk text-sm focus:outline-none focus:border-red-600 w-40"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border-2 border-black px-3 py-2 font-space-grotesk font-bold text-sm bg-white focus:outline-none focus:border-red-600 appearance-none pr-8 cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-space-grotesk font-bold text-red-600 hover:underline whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
            Clear
          </button>
        )}
      </div>

      {/* ── Mobile Search ── */}
      <div className="px-6 py-3 sm:hidden bg-white border-b border-gray-100">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearch(searchInput)}
            onBlur={() => setSearch(searchInput)}
            placeholder="Search products..."
            className="w-full border-2 border-black pl-9 pr-4 py-2.5 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div className="px-6 md:px-12 lg:px-20 py-8 bg-white">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-[3/4] bg-gray-100 animate-pulse border-2 border-gray-200" />
                <div className="h-4 bg-gray-100 animate-pulse w-3/4 rounded" />
                <div className="h-4 bg-gray-100 animate-pulse w-1/3 rounded" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-7xl text-gray-200 mb-4">inventory_2</span>
            <h2 className="font-space-grotesk font-black uppercase text-xl mb-2">No Products Found</h2>
            <p className="text-gray-400 text-sm font-space-grotesk mb-6">Try changing or clearing your filters</p>
            <button
              onClick={clearFilters}
              className="bg-black text-white px-8 py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-red-600 transition-colors"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
      </div>

      {/* ── Bottom Banner ── */}
      {!loading && products.length > 0 && (
        <div className="bg-black text-white py-12 px-6 md:px-12 lg:px-20 text-center">
          <p className="font-space-grotesk font-black uppercase text-2xl md:text-3xl mb-2">
            Can't find what you're looking for?
          </p>
          <p className="font-space-grotesk text-gray-400 text-sm mb-6">
            New drops every Friday. Follow us for first access.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-space-grotesk font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-space-grotesk font-bold uppercase text-xs tracking-widest hover:bg-red-500 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">smart_display</span>
              TikTok
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
