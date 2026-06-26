import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const STATUS_STYLES = {
  pending:    { label: 'Pending',    bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  processing: { label: 'Processing', bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500' },
  shipped:    { label: 'Shipped',    bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  delivered:  { label: 'Delivered',  bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500' },
  cancelled:  { label: 'Cancelled',  bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-500' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? { label: status, bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-label-bold uppercase tracking-widest ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function shortId(id) {
  return id.slice(0, 8).toUpperCase()
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders(data ?? [])
        setLoading(false)
      })
  }, [user])

  if (!user) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-headline-lg text-headline-lg uppercase mb-4">Sign In to View Orders</h1>
        <Link to="/signin" className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-red-600 transition-all duration-300">
          Sign In
        </Link>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse font-label-bold uppercase tracking-widest opacity-40">Loading orders...</div>
      </section>
    )
  }

  if (orders.length === 0) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">package_2</span>
        <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight mb-2">No orders yet</h1>
        <p className="text-sm opacity-50 mb-8 font-body-md">Looks like you haven't placed an order. Time to change that.</p>
        <Link to="/shop" className="bg-black text-white px-10 py-4 font-label-bold uppercase tracking-widest hover:bg-red-600 transition-all duration-300">
          Shop Now
        </Link>
      </section>
    )
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <h1 className="font-space-grotesk font-black text-3xl uppercase tracking-tight mb-2">My Orders</h1>
      <p className="text-sm opacity-40 font-body-md mb-10">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const isOpen = expanded === order.id
          const items = order.order_items ?? []

          return (
            <div key={order.id} className="border-2 border-black bg-white">
              {/* Order header */}
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-gray-50 transition-colors duration-200 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div>
                    <p className="text-[10px] font-label-bold uppercase tracking-widest opacity-40 mb-0.5">Order ID</p>
                    <p className="font-space-grotesk font-bold text-sm tracking-wider">#{shortId(order.id)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-label-bold uppercase tracking-widest opacity-40 mb-0.5">Date</p>
                    <p className="font-space-grotesk font-bold text-sm">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-label-bold uppercase tracking-widest opacity-40 mb-0.5">Total</p>
                    <p className="font-space-grotesk font-bold text-sm">${Number(order.total).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-label-bold uppercase tracking-widest opacity-40 mb-0.5">Items</p>
                    <p className="font-space-grotesk font-bold text-sm">{items.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </button>

              {/* Expanded order details */}
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="border-t-2 border-black p-5">

                  {/* Items */}
                  <h3 className="font-space-grotesk font-bold uppercase text-xs tracking-widest mb-4 opacity-60">Items in this order</h3>
                  <div className="flex flex-col gap-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200">
                        <div className="w-14 h-16 border border-gray-200 overflow-hidden flex-shrink-0 bg-white">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-gray-300 text-sm">checkroom</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-space-grotesk font-bold text-sm uppercase">{item.product_name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ${Number(item.product_price).toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-space-grotesk font-bold text-sm">
                          ${(Number(item.product_price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Delivery info */}
                  <div className="grid sm:grid-cols-2 gap-6 border-t border-gray-200 pt-5">
                    <div>
                      <h3 className="font-space-grotesk font-bold uppercase text-xs tracking-widest mb-3 opacity-60">Delivery Address</h3>
                      <p className="font-space-grotesk font-bold text-sm">{order.full_name}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.address}</p>
                      <p className="text-sm text-gray-500">{order.city}</p>
                    </div>
                    <div>
                      <h3 className="font-space-grotesk font-bold uppercase text-xs tracking-widest mb-3 opacity-60">Order Status</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <StatusBadge status={order.status} />
                      </div>
                      {order.status === 'pending' && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">Your order has been received and is being reviewed.</p>
                      )}
                      {order.status === 'processing' && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">We're preparing your items for shipment.</p>
                      )}
                      {order.status === 'shipped' && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">Your order is on its way!</p>
                      )}
                      {order.status === 'delivered' && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">Your order has been delivered. Enjoy!</p>
                      )}
                    </div>
                  </div>

                  {/* Total row */}
                  <div className="border-t-2 border-black mt-5 pt-4 flex justify-between items-center">
                    <span className="font-space-grotesk font-bold uppercase text-sm">Order Total</span>
                    <span className="font-space-grotesk font-black text-xl">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
