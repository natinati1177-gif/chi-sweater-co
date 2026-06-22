import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const PALETTE = [
  { bg: '#EF4444', light: '#FEE2E2', dark: '#991B1B', label: 'Red' },
  { bg: '#3B82F6', light: '#DBEAFE', dark: '#1E40AF', label: 'Blue' },
  { bg: '#10B981', light: '#D1FAE5', dark: '#065F46', label: 'Green' },
  { bg: '#F97316', light: '#FFEDD5', dark: '#9A3412', label: 'Orange' },
  { bg: '#8B5CF6', light: '#EDE9FE', dark: '#5B21B6', label: 'Purple' },
  { bg: '#EAB308', light: '#FEF9C3', dark: '#854D0E', label: 'Yellow' },
  { bg: '#EC4899', light: '#FCE7F3', dark: '#9D174D', label: 'Pink' },
  { bg: '#14B8A6', light: '#CCFBF1', dark: '#0F766E', label: 'Teal' },
]

const CATEGORY_ICONS = {
  clothing: 'checkroom',
  hats: 'sports_baseball',
  scarves: 'dry_cleaning',
  posters: 'image',
  accessories: 'watch',
  hoodies: 'checkroom',
  jackets: 'dry_cleaning',
  shoes: 'footprint',
  bags: 'shopping_bag',
  default: 'category',
}

function getCategoryIcon(name) {
  const key = name?.toLowerCase().replace(/\s+/g, '')
  return CATEGORY_ICONS[key] || CATEGORY_ICONS.default
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').trim()
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*, products(id)').order('name')
    setCategories(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  const openNew = () => { setEditing(null); setName(''); setShowForm(true) }
  const openEdit = (cat) => { setEditing(cat); setName(cat.name); setShowForm(true) }

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    const slug = slugify(name) || `cat-${Date.now()}`
    if (editing) {
      await supabase.from('categories').update({ name: name.trim(), slug }).eq('id', editing.id)
    } else {
      await supabase.from('categories').insert({ name: name.trim(), slug })
    }
    setSaving(false)
    setShowForm(false)
    setName('')
    setEditing(null)
    fetchCategories()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    setDeleting(id)
    await supabase.from('categories').delete().eq('id', id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setDeleting(null)
  }

  const totalProducts = categories.reduce((s, c) => s + (c.products?.length ?? 0), 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight">
            Categories ({categories.length})
          </h1>
          <p className="text-sm text-gray-400 font-bold mt-0.5">{totalProducts} total products across all categories</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-black transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Category
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white border-2 border-black p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-space-grotesk font-black uppercase text-lg mb-4">
              {editing ? 'Edit Category' : 'New Category'}
            </h2>
            <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
              placeholder="e.g. Hoodies"
              className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving || !name.trim()}
                className="flex-1 bg-black text-white py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border-2 border-black py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-40 bg-white border-2 border-gray-100 animate-pulse rounded" />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="material-symbols-outlined text-5xl mb-3 block">category</span>
          <p className="font-space-grotesk font-bold uppercase">No categories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const color = PALETTE[i % PALETTE.length]
            const icon = getCategoryIcon(cat.name)
            const count = cat.products?.length ?? 0
            const pct = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0

            return (
              <div key={cat.id} className="bg-white border-2 border-black overflow-hidden flex flex-col group">
                {/* Color header */}
                <div className="p-4 flex items-center justify-between" style={{ background: color.bg }}>
                  <span className="material-symbols-outlined text-white text-3xl">{icon}</span>
                  <span className="font-space-grotesk font-black text-white text-2xl">{count}</span>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-space-grotesk font-black text-sm uppercase">{cat.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: color.bg }}>
                      {count} products · {pct}% of total
                    </p>
                  </div>

                  {/* Mini progress bar */}
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: color.bg }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-1">
                    <button
                      onClick={() => openEdit(cat)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-space-grotesk font-bold uppercase border-2 border-black hover:text-white transition-colors"
                      style={{ '--hover-bg': color.bg }}
                      onMouseEnter={e => { e.currentTarget.style.background = color.bg; e.currentTarget.style.borderColor = color.bg; e.currentTarget.style.color = 'white' }}
                      onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deleting === cat.id}
                      className="flex items-center justify-center px-3 py-2 border-2 border-red-200 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
