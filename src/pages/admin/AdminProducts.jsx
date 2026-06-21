import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [deleting, setDeleting] = useState(null)

  const fetchProducts = async () => {
    let query = supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })

    if (catFilter) query = query.eq('category_id', catFilter)
    if (statusFilter === 'active') query = query.eq('in_stock', true)
    if (statusFilter === 'out') query = query.eq('in_stock', false)

    const { data } = await query
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data ?? []))
    fetchProducts()
  }, [catFilter, statusFilter])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    setDeleting(id)
    await supabase.from('products').delete().eq('id', id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeleting(null)
  }

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight">
          All Products ({products.length})
        </h1>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-black text-white px-5 py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-red-600 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Product
        </Link>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-black px-4 py-2 font-space-grotesk text-sm focus:outline-none focus:border-red-600 bg-white"
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="border-2 border-black px-4 py-2 font-space-grotesk text-sm focus:outline-none bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-2 border-black px-4 py-2 font-space-grotesk text-sm focus:outline-none bg-white"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div className="bg-white border-2 border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="text-left px-4 py-3 font-space-grotesk text-xs uppercase tracking-widest w-14">Image</th>
              <th className="text-left px-4 py-3 font-space-grotesk text-xs uppercase tracking-widest">Product Name</th>
              <th className="text-left px-4 py-3 font-space-grotesk text-xs uppercase tracking-widest">Price</th>
              <th className="text-left px-4 py-3 font-space-grotesk text-xs uppercase tracking-widest">Category</th>
              <th className="text-left px-4 py-3 font-space-grotesk text-xs uppercase tracking-widest">Status</th>
              <th className="text-left px-4 py-3 font-space-grotesk text-xs uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 animate-pulse rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 font-space-grotesk">
                  No products found
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-12 border border-gray-200 overflow-hidden bg-gray-50">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-300 text-[18px]">checkroom</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-space-grotesk font-bold text-sm uppercase">{product.name}</p>
                    {product.badge && (
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${product.badge_variant === 'secondary' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
                        {product.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-space-grotesk font-bold text-sm">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {product.categories?.name ? (
                      <span className="text-xs bg-gray-100 px-2 py-1 font-bold">
                        {product.categories.name}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold uppercase px-2 py-1 ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.in_stock ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                        className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="w-8 h-8 border-2 border-red-200 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
