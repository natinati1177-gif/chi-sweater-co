import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .trim()
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
    const { data } = await supabase
      .from('categories')
      .select('*, products(id)')
      .order('name')
    setCategories(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  const openNew = () => {
    setEditing(null)
    setName('')
    setShowForm(true)
  }

  const openEdit = (cat) => {
    setEditing(cat)
    setName(cat.name)
    setShowForm(true)
  }

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight">
          Categories ({categories.length})
        </h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-red-600 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Category
        </button>
      </div>

      {/* Add/Edit modal */}
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

      {/* Categories grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-white border-2 border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="material-symbols-outlined text-5xl mb-3 block">category</span>
          <p className="font-space-grotesk font-bold uppercase">No categories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border-2 border-black p-5 flex flex-col gap-3">
              <div>
                <h3 className="font-space-grotesk font-black text-base uppercase">{cat.name}</h3>
                <div className="mt-1 w-12 h-0.5 bg-red-600" />
                <p className="text-sm text-gray-500 font-bold mt-2">
                  {cat.products?.length ?? 0} products
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => openEdit(cat)}
                  className="flex-1 flex items-center justify-center gap-1 border-2 border-black py-2 font-space-grotesk font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  disabled={deleting === cat.id}
                  className="flex items-center justify-center border-2 border-red-200 text-red-400 px-3 py-2 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
