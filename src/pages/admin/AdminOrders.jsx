import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_STYLE = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
    setOrders(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (orderId, status) => {
    await supabase.from('orders').update({ status }).eq('id', orderId)
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="font-space-grotesk font-bold uppercase tracking-widest opacity-40 animate-pulse">Loading orders...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight">
          Orders ({orders.length})
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border-2 border-black p-16 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-5xl text-gray-200 mb-4">receipt_long</span>
          <h2 className="font-space-grotesk font-bold uppercase text-lg mb-2">No Orders Yet</h2>
          <p className="text-sm text-gray-400 max-w-xs">Orders will appear here once customers complete checkout.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border-2 border-black">
              <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-space-grotesk font-black text-sm uppercase">{order.full_name}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs text-gray-400 uppercase font-bold">City</p>
                    <p className="text-sm font-space-grotesk">{order.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Total</p>
                    <p className="font-space-grotesk font-black text-sm">${Number(order.total).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
                    <p className="text-xs font-space-grotesk">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => { e.stopPropagation(); updateStatus(order.id, e.target.value) }}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-xs font-bold uppercase px-3 py-1 border-0 focus:outline-none cursor-pointer ${STATUS_STYLE[order.status] ?? 'bg-gray-100'}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">
                    {expanded === order.id ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {expanded === order.id && (
                <div className="border-t-2 border-black p-5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-space-grotesk font-bold uppercase text-xs mb-3 text-gray-400">Delivery Info</h3>
                      <p className="text-sm font-space-grotesk"><span className="font-bold">Address:</span> {order.address}, {order.city}</p>
                      {order.phone && <p className="text-sm font-space-grotesk"><span className="font-bold">Phone:</span> {order.phone}</p>}
                    </div>
                    <div>
                      <h3 className="font-space-grotesk font-bold uppercase text-xs mb-3 text-gray-400">Items Ordered</h3>
                      <div className="flex flex-col gap-2">
                        {order.order_items?.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="font-space-grotesk">{item.product_name} x{item.quantity}</span>
                            <span className="font-space-grotesk font-bold">${(item.product_price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
