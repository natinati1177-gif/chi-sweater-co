export default function IdleLogoutModal({ countdown, onStay, onLogout }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative bg-white border-4 border-black max-w-sm w-full mx-4 p-8 text-center shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />

        <span className="material-symbols-outlined text-5xl text-red-600 mb-4 block">timer</span>

        <h2 className="font-headline-md text-2xl uppercase mb-2">Still there?</h2>
        <p className="font-body-md text-sm opacity-60 mb-8 leading-relaxed">
          You've been inactive for 15 minutes.<br />
          For your security, you'll be logged out in:
        </p>

        <div className="mb-8">
          <div className="w-24 h-24 mx-auto border-4 border-red-600 rounded-full flex items-center justify-center">
            <span className="font-black text-4xl text-red-600 tabular-nums leading-none">
              {countdown}
            </span>
          </div>
          <p className="font-label-bold uppercase text-xs tracking-widest opacity-40 mt-3">seconds remaining</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onStay}
            className="w-full py-4 bg-black text-white font-label-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-all duration-300 active:scale-95"
          >
            Stay Logged In
          </button>
          <button
            onClick={onLogout}
            className="w-full py-3 border-2 border-black font-label-bold uppercase tracking-widest text-xs opacity-50 hover:opacity-100 hover:bg-black hover:text-white transition-all duration-300 active:scale-95"
          >
            Log Out Now
          </button>
        </div>
      </div>
    </div>
  )
}
