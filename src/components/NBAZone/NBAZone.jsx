import { useEffect, useState } from 'react'

// 2026-27 NBA Season tipoff — approximate date
const NEXT_SEASON = new Date('2026-10-20T19:00:00-05:00')

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => calcDiff(target))

  useEffect(() => {
    const tick = () => setTimeLeft(calcDiff(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

function calcDiff(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-red-600 text-white font-space-grotesk font-black text-2xl md:text-3xl w-14 md:w-18 h-14 md:h-16 flex items-center justify-center tabular-nums leading-none px-3">
        {String(value).padStart(2, '0')}
      </div>
      <span className="font-space-grotesk font-bold text-[9px] uppercase tracking-[0.2em] text-gray-500 mt-2">
        {label}
      </span>
    </div>
  )
}

function NewsCard({ article }) {
  const image = article.images?.[0]?.url
  const url = article.links?.web?.href || '#'
  const date = article.published
    ? new Date(article.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : ''

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-colors overflow-hidden"
    >
      {image && (
        <div className="aspect-video overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={article.headline}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {date && (
          <span className="font-space-grotesk font-bold text-[10px] uppercase tracking-widest text-red-500">
            {date}
          </span>
        )}
        <h3 className="font-space-grotesk font-black text-sm uppercase leading-tight text-white group-hover:text-red-400 transition-colors line-clamp-3">
          {article.headline}
        </h3>
        {article.description && (
          <p className="text-gray-500 text-xs line-clamp-2 font-space-grotesk mt-auto">
            {article.description}
          </p>
        )}
      </div>
    </a>
  )
}

export default function NBAZone() {
  const { days, hours, minutes, seconds } = useCountdown(NEXT_SEASON)
  const [news, setNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [newsError, setNewsError] = useState(false)

  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=3')
      .then((r) => r.json())
      .then((data) => {
        setNews(data.articles ?? [])
        setNewsLoading(false)
      })
      .catch(() => {
        setNewsError(true)
        setNewsLoading(false)
      })
  }, [])

  return (
    <section className="bg-black text-white py-10 md:py-14">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-10 bg-red-600 flex-shrink-0" />
          <div>
            <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.3em] text-red-500 mb-1">
              🏀 Live Updates
            </p>
            <h2 className="font-space-grotesk font-black text-3xl md:text-4xl uppercase leading-none">
              NBA Zone
            </h2>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-neutral-950 border border-neutral-800 px-6 py-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="font-space-grotesk font-bold text-xs uppercase tracking-[0.2em] text-gray-500 sm:w-40 flex-shrink-0">
            Next Season<br />2026–27 Starts In
          </p>
          <div className="flex items-start gap-2 md:gap-3">
            <CountdownUnit value={days} label="Days" />
            <span className="font-space-grotesk font-black text-red-600 text-2xl md:text-3xl mt-3 select-none">:</span>
            <CountdownUnit value={hours} label="Hours" />
            <span className="font-space-grotesk font-black text-red-600 text-2xl md:text-3xl mt-3 select-none">:</span>
            <CountdownUnit value={minutes} label="Min" />
            <span className="font-space-grotesk font-black text-red-600 text-2xl md:text-3xl mt-3 select-none">:</span>
            <CountdownUnit value={seconds} label="Sec" />
          </div>
        </div>

        {/* News header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-space-grotesk font-black text-xl uppercase tracking-tight">
            Latest NBA News
          </h3>
          <a
            href="https://www.nba.com/news"
            target="_blank"
            rel="noopener noreferrer"
            className="font-space-grotesk font-bold text-xs uppercase tracking-widest text-red-500 hover:text-white transition-colors flex items-center gap-1"
          >
            View All
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>

        {/* News grid */}
        {newsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 overflow-hidden">
                <div className="aspect-video bg-neutral-800 animate-pulse" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-3 bg-neutral-800 animate-pulse w-1/4 rounded" />
                  <div className="h-4 bg-neutral-800 animate-pulse rounded" />
                  <div className="h-4 bg-neutral-800 animate-pulse w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : newsError ? (
          <div className="text-center py-12 border border-neutral-800">
            <span className="material-symbols-outlined text-4xl text-gray-700 mb-3 block">wifi_off</span>
            <p className="font-space-grotesk font-bold text-sm uppercase text-gray-600">
              Could not load news
            </p>
            <a
              href="https://www.nba.com/news"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-red-500 hover:underline"
            >
              Visit NBA.com →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {news.map((article, i) => (
              <NewsCard key={i} article={article} />
            ))}
          </div>
        )}

        {/* Powered by */}
        <p className="mt-6 text-center font-space-grotesk text-[10px] uppercase tracking-widest text-gray-700">
          News powered by ESPN · Updates in real time
        </p>
      </div>
    </section>
  )
}
