import Link from 'next/link'
import FaqSection from '@/components/calculator/FaqSection'
import { CATEGORIES } from '@/lib/categories'
import { CALC_HERO_PATTERN } from '@/lib/constants'
import { FavoriteBannerButton } from '@/components/share/FavoriteButton'

export default function CalcLayout({ title, desc, currentUrl, faqs, children }) {
  const filteredCategories = CATEGORIES
    .map(cat => ({ ...cat, calcs: cat.calcs.filter(c => c.url !== currentUrl) }))
    .filter(cat => cat.calcs.length > 0)

  return (
    <div className="w-full bg-slate-50 pb-20">

      {/* 배너 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: CALC_HERO_PATTERN }} />
        <div className="relative container mx-auto px-4 py-14 text-center text-white">
          <h1 className="text-2xl font-black tracking-tight mb-2">{title}</h1>
          <p className="text-sm opacity-85">{desc}</p>
          <FavoriteBannerButton url={currentUrl} />
        </div>
      </section>

      {/* 계산기 본체 */}
      <main className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-8">
        {children}
      </main>

      {/* 다른 계산기 */}
      <aside className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center text-sm shrink-0">
            🧮
          </div>
          <div>
            <h2 className="text-sm font-black text-stone-700">다른 계산기</h2>
            <p className="text-[11px] text-stone-400">Other Tools</p>
          </div>
          <div className="flex-1 h-px bg-stone-200 ml-1" />
        </div>

        <div className="space-y-6">
          {filteredCategories.map(cat => (
            <div key={cat.key}>
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${cat.color} flex items-center justify-center text-[10px] shrink-0`}>
                  {cat.icon}
                </div>
                <span className={`text-xs font-black ${cat.labelColor}`}>{cat.label}</span>
                <div className="flex-1 h-px bg-stone-100" />
              </div>
              <ul className="grid grid-cols-2 gap-2 list-none p-0">
                {cat.calcs.map((c) => (
                  <li key={c.url}>
                    <Link href={c.url}
                      className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl p-3 hover:border-amber-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 group">
                      <span className="w-7 h-7 bg-stone-50 rounded-lg flex items-center justify-center text-sm shrink-0">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-600 group-hover:text-amber-600 transition-colors leading-tight truncate">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-stone-400 leading-tight mt-0.5 truncate">{c.desc}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <FaqSection faqs={faqs} />

    </div>
  )
}
