import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const BADGE_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'NEW', label: 'NEW' },
  { value: 'BESTSELLER', label: 'BESTSELLER' },
  { value: 'LIMITED', label: 'LIMITED' },
  { value: 'SALE', label: 'SALE' },
  { value: 'EXCLUSIVE', label: 'EXCLUSIVE' },
]

const empty = {
  name: '',
  price: '',
  description: '',
  badge: '',
  badge_variant: 'black',
  category_id: '',
  in_stock: true,
  featured: false,
  image_url: '',
}

export default function AdminProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const fileRef = useRef(null)

  const [form, setForm] = useState(empty)
  const [categories, setCategories] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => setCategories(data ?? []))

    if (isEdit) {
      supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
        if (data) {
          setForm({
            name: data.name ?? '',
            price: data.price ?? '',
            description: data.description ?? '',
            badge: data.badge ?? '',
            badge_variant: data.badge_variant ?? 'black',
            category_id: data.category_id ?? '',
            in_stock: data.in_stock ?? true,
            featured: data.featured ?? false,
            image_url: data.image_url ?? '',
          })
          setImagePreview(data.image_url ?? null)
        }
        setLoading(false)
      })
    }
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage.from('product-images').upload(path, file, { upsert: true })
    if (upErr) throw upErr
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let image_url = form.image_url
      if (imageFile) image_url = await uploadImage(imageFile)

      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description || null,
        badge: form.badge || null,
        badge_variant: form.badge || null ? form.badge_variant : null,
        category_id: form.category_id || null,
        in_stock: form.in_stock,
        featured: form.featured,
        image_url,
      }

      if (isEdit) {
        const { error: updateErr } = await supabase.from('products').update(payload).eq('id', id)
        if (updateErr) throw updateErr
      } else {
        const { error: insertErr } = await supabase.from('products').insert(payload)
        if (insertErr) throw insertErr
      }

      navigate('/admin/products')
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="font-space-grotesk font-bold uppercase tracking-widest opacity-40 animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/products" className="material-symbols-outlined text-gray-400 hover:text-black transition-colors">
          arrow_back
        </Link>
        <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight">
          {isEdit ? 'Edit Product' : 'New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          {/* Main fields */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-space-grotesk font-bold uppercase text-sm mb-4">Product Details</h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Product Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Bulls Classic Crewneck"
                    required
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price}
                      onChange={(e) => set('price', e.target.value)}
                      placeholder="95.00"
                      required
                      className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Badge</label>
                    <select
                      value={form.badge}
                      onChange={(e) => set('badge', e.target.value)}
                      className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none bg-white"
                    >
                      {BADGE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {form.badge && (
                  <div>
                    <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Badge Color</label>
                    <div className="flex gap-3">
                      {['black', 'secondary'].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => set('badge_variant', v)}
                          className={`px-4 py-2 border-2 font-space-grotesk font-bold text-xs uppercase transition-colors ${
                            form.badge_variant === v
                              ? v === 'secondary' ? 'bg-red-600 text-white border-red-600' : 'bg-black text-white border-black'
                              : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {v === 'secondary' ? 'Red' : 'Black'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe the product..."
                    rows={4}
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none focus:border-red-600 resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Image upload */}
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-space-grotesk font-bold uppercase text-sm mb-4">Product Image</h2>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="preview" className="w-full max-h-64 object-cover border-2 border-black mb-3" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-black py-3 font-space-grotesk font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
                  >
                    Replace Image
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 py-12 flex flex-col items-center gap-2 hover:border-black transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-300 text-4xl">cloud_upload</span>
                  <span className="font-space-grotesk text-sm text-gray-400">Click to upload image</span>
                </button>
              )}

              <div className="mt-3">
                <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Or enter image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => { set('image_url', e.target.value); if (!imageFile) setImagePreview(e.target.value) }}
                  placeholder="https://..."
                  className="w-full border-2 border-gray-200 px-4 py-2 font-space-grotesk text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-space-grotesk font-bold uppercase text-sm mb-4">Organization</h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => set('category_id', e.target.value)}
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none bg-white"
                  >
                    <option value="">No Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-space-grotesk font-bold text-xs uppercase tracking-widest mb-1">Status</label>
                  <select
                    value={form.in_stock ? 'true' : 'false'}
                    onChange={(e) => set('in_stock', e.target.value === 'true')}
                    className="w-full border-2 border-black px-4 py-3 font-space-grotesk text-sm focus:outline-none bg-white"
                  >
                    <option value="true">Active</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="font-space-grotesk font-bold text-xs uppercase">Show on Homepage</span>
                  <button
                    type="button"
                    onClick={() => set('featured', !form.featured)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${form.featured ? 'bg-red-600' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.featured ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-600 p-4">
                <p className="text-red-600 font-bold text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-black text-white py-4 font-space-grotesk font-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              {saving ? 'Saving...' : 'Save & Publish'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="py-4 border-2 border-black font-space-grotesk font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
