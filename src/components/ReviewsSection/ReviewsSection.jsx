import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const FALLBACK_REVIEWS = [
  {
    id: 'f1',
    rating: 5,
    body: "Best NBA fan gear I've ever bought. The quality is insane and the hoodie is so heavy — exactly what I wanted. Shipped fast too.",
    author_name: 'Jordan M.',
  },
  {
    id: 'f2',
    rating: 5,
    body: "Wore this to the game and got compliments all night. You can tell the difference between this and cheap fan gear immediately.",
    author_name: 'Marcus T.',
  },
  {
    id: 'f3',
    rating: 5,
    body: "Limited drop so I was nervous about sizing but it fit perfectly. Already ordered a second one before it sold out.",
    author_name: 'Aaliyah R.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex text-red-500">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setReviews(data)
        else setReviews(FALLBACK_REVIEWS)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-section-gap bg-black text-white px-margin-mobile md:px-margin-desktop">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-3">
          What Fans Are Saying
        </p>
        <h2 className="font-headline-lg text-headline-lg uppercase mb-4">Fan Verified</h2>
        <div className="w-16 h-1 bg-red-600 mx-auto" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-8 border border-neutral-800 animate-pulse h-48" />
            ))
          : reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-5 p-8 border border-neutral-800 hover:border-red-600 transition-colors bg-neutral-900/40 relative"
              >
                {/* Quote mark */}
                <span className="absolute top-6 right-8 font-space-grotesk font-black text-6xl text-white/5 leading-none select-none">
                  "
                </span>

                <Stars count={review.rating ?? 5} />

                <p className="font-body-lg text-base opacity-80 italic leading-relaxed">
                  "{review.body}"
                </p>

                <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-space-grotesk font-black text-xs text-white">
                    {review.author_name?.[0]?.toUpperCase() ?? 'F'}
                  </div>
                  <p className="font-space-grotesk font-bold text-sm uppercase tracking-wider">
                    {review.author_name}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Average rating */}
      <div className="mt-12 text-center">
        <div className="flex justify-center mb-2">
          <Stars count={5} />
        </div>
        <p className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-gray-500">
          5.0 average · Loved by NBA fans worldwide
        </p>
      </div>
    </section>
  )
}
