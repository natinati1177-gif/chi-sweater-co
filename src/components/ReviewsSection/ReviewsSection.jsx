import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

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
        if (!error && data) setReviews(data)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-section-gap bg-black text-white px-margin-mobile md:px-margin-desktop">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg uppercase mb-4">Street Verified</h2>
        <div className="w-24 h-1 bg-secondary mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div key={i} className="p-8 border border-neutral-800 animate-pulse h-48" />
            ))
          : reviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-6 p-8 border border-neutral-800 hover:border-secondary transition-colors bg-neutral-900/50">
                <div className="flex text-secondary">
                  {[...Array(review.rating ?? 5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-lg italic">"{review.body}"</p>
                <div>
                  <p className="font-label-bold uppercase">{review.author_name}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  )
}
