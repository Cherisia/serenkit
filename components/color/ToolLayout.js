import Link from 'next/link'
import { COLOR_TOOLS as TOOLS, HERO_PATTERN } from '@/lib/colorTools'
import { FavoriteBannerButton } from '@/components/share/FavoriteButton'

export default function ToolLayout({ toolKey, children, faqs = [] }) {
  const tool = TOOLS.find(t => t.key === toolKey)
  const related = TOOLS.filter(t => t.key !== toolKey)

  return (
    <div className="bg-slate-50 pb-20 min-h-screen">
      {/* Hero Banner */}
      <section
        className={`relative bg-gradient-to-br ${tool?.color ?? 'from-emerald-400 to-teal-500'} pt-20 pb-12`}
        aria-label="페이지 소개"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: HERO_PATTERN }} aria-hidden="true" />
        <div className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto text-center relative">
          <div className="text-5xl mb-4" aria-hidden="true">{tool?.icon}</div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
            {tool?.name}
          </h1>
          <p className="text-sm md:text-base text-white/85 leading-relaxed">
            {tool?.desc}
          </p>
          <FavoriteBannerButton url={tool?.url ?? ''} />
        </div>
      </section>

      {/* Main content */}
      <main className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-6 space-y-4" id="main-content">
        {children}
      </main>

      {/* Related tools */}
      <aside className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-10" aria-label="관련 도구">
        <section>
          <h2 className="text-base font-black text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-400 rounded-full inline-block" aria-hidden="true"></span>
            다른 색상 도구
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {related.map(t => (
              <li key={t.key}>
                <Link
                  href={t.url}
                  className="flex flex-col items-center gap-1.5 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all text-center group"
                >
                  <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-600 leading-tight">{t.shortName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-10" aria-label="자주 묻는 질문">
          <h2 className="text-base font-black text-slate-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-400 rounded-full inline-block" aria-hidden="true"></span>
            자주 묻는 질문
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function FaqItem({ q, a }) {
  return (
    <details className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
      <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer list-none select-none">
        <span className="text-sm font-bold text-slate-700 pr-4">{q}</span>
        <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </summary>
      <div className="px-4 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
        <p className="pt-3">{a}</p>
      </div>
    </details>
  )
}
