import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const PALETTE = ['#EF4444', '#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EAB308', '#EC4899', '#14B8A6']

function StatCard({ label, value, alert, icon }) {
  return (
    <div className={`bg-white border-2 p-6 flex items-start justify-between ${alert ? 'border-red-600' : 'border-black'}`}>
      <div>
        <p className="font-space-grotesk text-xs uppercase tracking-widest opacity-50 mb-1">{label}</p>
        <p className={`font-space-grotesk font-black text-4xl ${alert ? 'text-red-600' : ''}`}>{value}</p>
      </div>
      <span className={`material-symbols-outlined text-3xl opacity-20 ${alert ? 'text-red-600' : ''}`}>{icon}</span>
    </div>
  )
}

function DonutChart({ segments, total }) {
  const SIZE = 180
  const C = SIZE / 2
  const R = 64
  const CIRC = 2 * Math.PI * R
  const GAP = 3

  let accumulated = 0
  const arcs = segments.map((seg) => {
    const dash = (seg.value / total) * CIRC
    const offset = -(accumulated / total) * CIRC
    accumulated += seg.value
    return { ...seg, dash: Math.max(0, dash - GAP), offset }
  })

  if (total === 0) {
    return (
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle cx={C} cy={C} r={R} fill="none" stroke="#f3f4f6" strokeWidth={22} />
        <text x={C} y={C + 6} textAnchor="middle" fill="#9ca3af" style={{ fontSize: '12px', fontWeight: 700 }}>No data</text>
      </svg>
    )
  }

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <circle cx={C} cy={C} r={R} fill="none" stroke="#f3f4f6" strokeWidth={22} />
      {arcs.map((seg, i) => (
        <circle
          key={i}
          cx={C} cy={C} r={R}
          fill="none"
          stroke={seg.color}
          strokeWidth={22}
          strokeLinecap="butt"
          strokeDasharray={`${seg.dash} ${CIRC}`}
          strokeDashoffset={seg.offset}
          transform={`rotate(-90 ${C} ${C})`}
        />
      ))}
      <text x={C} y={C - 8} textAnchor="middle" fill="#111" style={{ fontSize: '30px', fontWeight: 900, fontFamily: 'Space Grotesk' }}>{total}</text>
      <text x={C} y={C + 14} textAnchor="middle" fill="#9ca3af" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em' }}>PRODUCTS</text>
    </svg>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, outOfStock: 0, cartItems: 0 })
  const [recent, setRecent] = useState([])
  const [catData, setCatData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('in_stock', false),
      supabase.from('cart_items').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('id, name, price, badge, in_stock, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('categories').select('name, products(id)').order('name'),
    ]).then(([products, cats, oos, cart, recentRes, catRes]) => {
      setStats({
        products: products.count ?? 0,
        categories: cats.count ?? 0,
        outOfStock: oos.count ?? 0,
        cartItems: cart.count ?? 0,
      })
      if (!recentRes.error) setRecent(recentRes.data ?? [])
      if (!catRes.error) {
        setCatData((catRes.data ?? []).map((c, i) => ({
          name: c.name,
          value: c.products?.length ?? 0,
          color: PALETTE[i % PALETTE.length],
        })))
      }
      setLoading(false)
    })
  }, [])

  const chartTotal = catData.reduce((s, c) => s + c.value, 0)

  return (
    <div>
      <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Products" value={stats.products} icon="inventory_2" />
        <StatCard label="Categories" value={stats.categories} icon="category" />
        <StatCard label="Cart Items" value={stats.cartItems} icon="shopping_cart" />
        <StatCard label="Out of Stock" value={stats.outOfStock} icon="warning" alert />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Donut chart */}
        <div className="bg-white border-2 border-black p-6 flex flex-col">
          <h2 className="font-space-grotesk font-bold text-base uppercase tracking-tight mb-4">Products by Category</h2>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <DonutChart segments={catData} total={chartTotal} />
              <div className="w-full flex flex-col gap-2">
                {catData.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      <span className="font-space-grotesk font-bold text-xs uppercase">{c.name}</span>
                    </div>
                    <span className="font-space-grotesk font-black text-sm">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border-2 border-black p-6">
          <h2 className="font-space-grotesk font-bold text-base uppercase tracking-tight mb-5">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/admin/products/new"
              className="flex items-center gap-3 p-4 bg-red-600 text-white hover:bg-black transition-colors font-space-grotesk font-bold uppercase text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Add New Product
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center gap-3 p-4 border-2 border-black hover:bg-black hover:text-white transition-colors font-space-grotesk font-bold uppercase text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              Manage Products
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center gap-3 p-4 border-2 border-black hover:bg-black hover:text-white transition-colors font-space-grotesk font-bold uppercase text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">category</span>
              Manage Categories
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 p-4 border-2 border-black hover:bg-black hover:text-white transition-colors font-space-grotesk font-bold uppercase text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              View Orders
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white border-2 border-black p-6">
          <h2 className="font-space-grotesk font-bold text-base uppercase tracking-tight mb-5">Recent Products</h2>
          {loading ? (
            <div className="flex flex-col gap-2">
              {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 animate-pulse" />)}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {recent.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-space-grotesk font-bold text-sm uppercase">{p.name}</p>
                    <p className="text-xs text-gray-400">${Number(p.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.badge && (
                      <span className="text-[10px] font-bold uppercase bg-black text-white px-2 py-0.5">
                        {p.badge}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${p.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.in_stock ? 'Active' : 'Out'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/admin/products" className="mt-4 block text-center text-xs font-bold uppercase tracking-widest hover:text-red-600 transition-colors">
            View All Products →
          </Link>
        </div>
      </div>
    </div>
  )
}
