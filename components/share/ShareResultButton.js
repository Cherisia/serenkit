'use client'

import { useState } from 'react'

/** data-share-ignore 요소를 숨기고 fn 실행 후 복원 */
async function withHide(node, fn) {
  const hidden = []
  node.querySelectorAll('[data-share-ignore]').forEach(el => {
    hidden.push({ el, display: el.style.display })
    el.style.display = 'none'
  })
  try {
    return await fn()
  } finally {
    hidden.forEach(({ el, display }) => { el.style.display = display })
  }
}

/** DOM 노드를 PNG Blob으로 캡처 + 워터마크 삽입 */
async function captureBlob(node) {
  const { toPng } = await import('html-to-image')
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    backgroundColor: '#f8fafc',
    height: node.scrollHeight,
  })
  if (!dataUrl || dataUrl === 'data:,') throw new Error('캡처 실패')

  const img = new Image()
  img.src = dataUrl
  await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject })

  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  ctx.font = 'bold 26px sans-serif'
  ctx.fillStyle = 'rgba(0,0,0,0.15)'
  ctx.textAlign = 'right'
  ctx.fillText('serenkit.com', canvas.width - 20, canvas.height - 16)

  return new Promise((resolve, reject) =>
    canvas.toBlob(b => b ? resolve(b) : reject(new Error('toBlob 실패')), 'image/png')
  )
}

function useActionStatus() {
  const [status, setStatus] = useState('idle')
  const reset = (delay = 2000) => setTimeout(() => setStatus('idle'), delay)
  return { status, setStatus, reset }
}

export default function ShareButtons({ targetRef }) {
  const clip  = useActionStatus()
  const save  = useActionStatus()
  const share = useActionStatus()

  /** 📋 이미지 클립보드 복사 */
  async function handleCopy() {
    if (clip.status === 'loading') return
    clip.setStatus('loading')
    try {
      const blob = await withHide(targetRef.current, () => captureBlob(targetRef.current))
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      clip.setStatus('done'); clip.reset()
    } catch (e) {
      console.error('[복사]', e)
      clip.setStatus('error'); clip.reset()
    }
  }

  /** 💾 이미지 파일 저장 */
  async function handleSave() {
    if (save.status === 'loading') return
    save.setStatus('loading')
    try {
      const blob = await withHide(targetRef.current, () => captureBlob(targetRef.current))
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'serenkit-result.png'
      a.click()
      URL.revokeObjectURL(url)
      save.setStatus('done'); save.reset()
    } catch (e) {
      console.error('[저장]', e)
      save.setStatus('error'); save.reset()
    }
  }

  /** 🔗 결과 페이지 URL 공유 */
  async function handleShare() {
    if (share.status === 'loading') return
    share.setStatus('loading')
    try {
      const url = window.location.href
      const title = document.title
      if (navigator.share) {
        await navigator.share({ url, title })
      } else {
        await navigator.clipboard.writeText(url)
      }
      share.setStatus('done'); share.reset()
    } catch (e) {
      if (e?.name === 'AbortError') { share.setStatus('idle'); return }
      console.error('[공유]', e)
      share.setStatus('error'); share.reset()
    }
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <ActionBtn status={clip.status}  onClick={handleCopy}
        labels={{ idle: '📋 클립보드에 복사', loading: '⏳ 복사 중', done: '✓ 복사됨', error: '⚠ 실패' }} />
      <ActionBtn status={save.status}  onClick={handleSave}
        labels={{ idle: '💾 이미지 파일 저장', loading: '⏳ 저장 중', done: '✓ 저장됨', error: '⚠ 실패' }} />
      <ActionBtn status={share.status} onClick={handleShare}
        labels={{ idle: '🔗 SNS에 공유하기', loading: '⏳ 공유 중', done: '✓ 완료',   error: '⚠ 실패' }} />
    </div>
  )
}

function ActionBtn({ status, onClick, labels }) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'loading'}
      className={`py-2.5 rounded-xl text-[11px] font-black transition-all duration-200 text-center leading-tight px-1 ${
        status === 'done'    ? 'bg-green-100 text-green-600' :
        status === 'error'   ? 'bg-red-100 text-red-500' :
        status === 'loading' ? 'bg-stone-100 text-stone-400 cursor-not-allowed' :
                               'bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300'
      }`}
    >
      {labels[status]}
    </button>
  )
}
