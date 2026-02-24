export default function FaqSection({ faqs }) {
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
    <aside className="mt-10 container xl:w-[560px] md:w-[600px] w-[92%] mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xs font-black text-stone-500 tracking-widest uppercase">FAQ</h2>
        <div className="flex-1 h-px bg-stone-200" />
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <article key={f.q} className="bg-white border border-stone-200 rounded-2xl p-5">
            <h3 className="text-xs font-black text-stone-700 mb-2">Q. {f.q}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">A. {f.a}</p>
          </article>
        ))}
      </div>
    </aside>
  )
}
