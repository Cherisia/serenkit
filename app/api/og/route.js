import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'serenkit'
  const sub   = searchParams.get('sub')   ?? '숫자가 필요한 순간'

  const fontEB = readFileSync(join(process.cwd(), 'public/fonts/NanumSquareEB.woff2'))
  const fontB  = readFileSync(join(process.cwd(), 'public/fonts/NanumSquareB.woff2'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px', height: '630px',
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 55%, #fb923c 100%)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* 장식 원 */}
        <div style={{ position: 'absolute', top: '-140px', right: '-100px', width: '480px', height: '480px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '180px', right: '260px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '60px', left: '440px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex' }} />

        {/* 격자 패턴 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          display: 'flex',
        }} />

        {/* 콘텐츠 */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 80px', height: '100%', position: 'relative' }}>

          {/* 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
            <span style={{ fontSize: '34px', fontWeight: 800, color: 'white', fontFamily: 'NanumSquare', letterSpacing: '-1px' }}>seren</span>
            <span style={{ fontSize: '34px', fontWeight: 800, color: 'rgba(255,255,255,0.5)', fontFamily: 'NanumSquare', letterSpacing: '-1px' }}>kit</span>
          </div>

          {/* 중앙 메인 */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: '16px' }}>
            <div style={{
              fontSize: title.length > 12 ? '56px' : '68px',
              fontWeight: 800, color: 'white',
              fontFamily: 'NanumSquare',
              lineHeight: 1.15,
              letterSpacing: '-2px',
            }}>
              {title}
            </div>
            <div style={{
              fontSize: '26px', color: 'rgba(255,255,255,0.82)',
              fontFamily: 'NanumSquare', fontWeight: 700, lineHeight: 1.5,
            }}>
              {sub}
            </div>
          </div>

          {/* 하단 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* 카테고리 칩 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {['📅 날짜', '💪 건강', '💰 금융', '🔄 단위변환'].map(item => (
                <div key={item} style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.28)',
                  borderRadius: '100px',
                  padding: '9px 18px',
                  fontSize: '17px',
                  color: 'rgba(255,255,255,0.92)',
                  fontFamily: 'NanumSquare',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  {item}
                </div>
              ))}
            </div>
            {/* 도메인 */}
            <div style={{
              fontSize: '20px', color: 'rgba(255,255,255,0.45)',
              fontFamily: 'NanumSquare', fontWeight: 700,
            }}>
              serenkit.com
            </div>
          </div>

        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'NanumSquare', data: fontEB, weight: 800 },
        { name: 'NanumSquare', data: fontB,  weight: 700 },
      ],
    }
  )
}
