export default function AdminOrders() {
  return (
    <div>
      <h1 className="font-space-grotesk font-black text-2xl uppercase tracking-tight mb-6">Orders</h1>
      <div className="bg-white border-2 border-black p-16 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-5xl text-gray-200 mb-4">receipt_long</span>
        <h2 className="font-space-grotesk font-bold uppercase text-lg mb-2">No Orders Yet</h2>
        <p className="text-sm text-gray-400 max-w-xs">
          The orders module will be activated once Checkout is connected to the site.
        </p>
      </div>
    </div>
  )
}
