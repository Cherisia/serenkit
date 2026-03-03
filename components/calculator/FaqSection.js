export default function FaqSection({ faqs, className = '' }) {
  if (!faqs?.length) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <aside className={`mt-10 container xl:w-[560px] md:w-[600px] w-[92%] mx-auto ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xs font-black text-stone-500 tracking-widest uppercase">FAQ</h2>
        <div className="flex-1 h-px bg-stone-200" />
      </div>
      <div className="space-y-2">
        {faqs.map((f) => (
          <details key={f.q} className="bg-white border border-stone-200 rounded-2xl overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none">
              <h3 className="text-xs font-black text-stone-700 pr-4">Q. {f.q}</h3>
              <span className="text-stone-400 group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-4 text-xs text-stone-500 leading-relaxed border-t border-stone-100">
              <p className="pt-3">A. {f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </aside>
  )
}
