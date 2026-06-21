import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center">
      <span className="font-display-xl text-[120px] md:text-[200px] font-black leading-none opacity-5 select-none">
        404
      </span>
      <div className="-mt-8 md:-mt-16">
        <span className="font-label-bold uppercase tracking-widest text-secondary mb-4 block">Page Not Found</span>
        <h1 className="font-headline-lg text-headline-lg uppercase mb-6">
          Lost in the City
        </h1>
        <p className="font-body-md opacity-60 mb-10 max-w-sm mx-auto">
          This page doesn't exist. Head back to the shop and find something worth owning.
        </p>
        <Link
          to="/"
          className="bg-black text-white px-10 py-5 font-label-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300"
        >
          Back to Shop
        </Link>
      </div>
    </section>
  )
}
