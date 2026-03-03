'use client'

import { useState, useRef, useCallback } from 'react'
import { extractDominantColors, getAllFormats, getTextColor } from '@/lib/colorUtils'

export default function ColorExtractor() {
  const [colors, setColors] = useState([])
  const [selected, setSelected] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgSrc, setImgSrc] = useState(null)
  const [copied, setCopied] = useState('')
  const fileRef = useRef(null)
  const canvasRef = useRef(null)

  const processImage = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    setLoading(true)
    setColors([])
    setSelected(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const imgData = e.target.result
      setImgSrc(imgData)
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const maxSize = 200
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const extracted = extractDominantColors(imageData, 10)
        setColors(extracted)
        if (extracted.length > 0) setSelected(extracted[0].hex)
        setLoading(false)
      }
      img.src = imgData
    }
    reader.readAsDataURL(file)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    processImage(file)
  }, [processImage])

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    })
  }

  const formats = selected ? getAllFormats(selected) : null

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">이미지 업로드</h2>
          <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, GIF, WebP 등 이미지 파일을 선택하거나 끌어다 놓으세요</p>
        </div>
        <div className="p-5">
          <div
            role="button"
            tabIndex={0}
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
            className={`relative flex flex-col items-center justify-center min-h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
              dragging ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
            aria-label="이미지 파일 업로드 영역"
          >
            {imgSrc ? (
              <img src={imgSrc} alt="업로드된 이미지" className="max-h-64 max-w-full object-contain rounded-lg" />
            ) : (
              <>
                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm font-bold text-slate-500">이미지를 끌어다 놓거나 클릭해서 선택</p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG, GIF, WebP 지원</p>
              </>
            )}
            {loading && (
              <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => processImage(e.target.files[0])} aria-label="이미지 파일 선택" />
          <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
        </div>
      </article>

      {/* Extracted colors */}
      {colors.length > 0 && (
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-3 border-b border-slate-100">
            <h2 className="font-black text-slate-800">추출된 색상 ({colors.length}개)</h2>
            <p className="text-xs text-slate-400 mt-0.5">색상을 클릭하면 상세 코드를 확인할 수 있습니다</p>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-3 mb-4" role="list" aria-label="추출된 색상 목록">
              {colors.map(({ hex }) => (
                <button
                  key={hex}
                  onClick={() => setSelected(hex)}
                  className={`color-swatch flex flex-col items-center gap-1.5 group cursor-pointer`}
                  aria-label={`색상 ${hex} 선택`}
                  aria-pressed={selected === hex}
                  role="listitem"
                >
                  <div
                    className={`w-14 h-14 rounded-xl shadow-sm ring-2 transition-all ${
                      selected === hex ? 'ring-emerald-500 ring-offset-2' : 'ring-transparent hover:ring-slate-300'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-xs font-bold text-slate-500">{hex}</span>
                </button>
              ))}
            </div>

            {/* Color bar */}
            <div
              className="h-10 rounded-xl overflow-hidden flex"
              role="img"
              aria-label="추출된 색상 팔레트 바"
            >
              {colors.map(({ hex, count }, i) => {
                const total = colors.reduce((s, c) => s + c.count, 0)
                const pct = (count / total * 100).toFixed(1)
                return (
                  <div
                    key={hex}
                    style={{ backgroundColor: hex, flexBasis: `${pct}%` }}
                    title={`${hex} (${pct}%)`}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelected(hex)}
                    role="button"
                    aria-label={`${hex} 색상 비율 ${pct}%`}
                  />
                )
              })}
            </div>
          </div>
        </article>
      )}

      {/* Selected color details */}
      {formats && (
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div
            className="p-6 flex items-center gap-4"
            style={{ backgroundColor: formats.hex }}
            aria-label={`선택된 색상: ${formats.hex}`}
          >
            <div className="w-16 h-16 rounded-xl border-2 border-white/30 shadow-lg" style={{ backgroundColor: formats.hex }} aria-hidden="true" />
            <div>
              <p className="text-2xl font-black tracking-tight" style={{ color: getTextColor(formats.hex) }}>
                {formats.hexUpper}
              </p>
              <p className="text-sm opacity-75" style={{ color: getTextColor(formats.hex) }}>
                rgb({formats.r}, {formats.g}, {formats.b})
              </p>
            </div>
          </div>
          <div className="px-5 pt-4 pb-5 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-700 mb-3">색상 코드 복사</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'HEX', value: formats.hexUpper },
                { label: 'RGB', value: formats.rgb },
                { label: 'RGBA', value: formats.rgba },
                { label: 'HSL', value: formats.hsl },
                { label: 'HSLA', value: formats.hsla },
                { label: 'HSB', value: formats.hsb },
                { label: 'CMYK', value: formats.cmyk },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-400 w-12 shrink-0">{label}</span>
                  <code className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-700 truncate">
                    {value}
                  </code>
                  <button
                    onClick={() => copy(value, label)}
                    className={`shrink-0 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                      copied === label
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                    aria-label={`${label} 코드 복사`}
                  >
                    {copied === label ? '✓ 복사됨' : '복사'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}
