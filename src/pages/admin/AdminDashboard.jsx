import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function StatCard({ label, value, alert }) {
  return (
    <div className={`bg-white border-2 p-6 ${alert ? 'border-red-600' : 'border-black'}`}>
      <p className="font-space-grotesk text-xs uppercase tracking-widest opacity-50 mb-1">{label}</p>
      <p className={`font-space-grotesk font-black text-4xl mb-1 ${alert ? 'text-red-600' : ''}`}>{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, outOfStock: 0, cartItems: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('in_stock', false),
      supabase.from('cart_items').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('id, name, price, badge, in_stock, created_at').order('created_at', { ascending: false }).limit(5),
    ]).then(([products, cats, oos, cart, recentRes]) => {
      setStats({
        products: products.count ?? 0,
        categories: cats.count ?? 0,
        outOfStock: oos.count ?? 0,
        cartItems: cart.count ?? 0,
      })
      if (!recentRes.error) setRecent(recentRes.data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Products" value={stats.products} />
        <StatCard label="Categories" value={stats.categories} />
        <StatCard label="Cart Items" value={stats.cartItems} />
        <StatCard label="Out of Stock" value={stats.outOfStock} alert />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-black p-6">
          <h2 className="font-space-grotesk font-bold text-base uppercase tracking-tight mb-5">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/admin/products/new"
              className="flex items-center gap-3 p-4 border-2 border-black hover:bg-black hover:text-white transition-colors font-space-grotesk font-bold uppercase text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
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
          </div>
        </div>

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
