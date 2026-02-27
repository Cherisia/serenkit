'use client'
import { useState } from 'react'

// ===== 데이터 =====
const TYPES = [
  { code: 'INTJ', emoji: '🦅', name: '전략가',     group: 'NT' },
  { code: 'INTP', emoji: '🧩', name: '논리술사',   group: 'NT' },
  { code: 'ENTJ', emoji: '👑', name: '통솔자',     group: 'NT' },
  { code: 'ENTP', emoji: '🔥', name: '변론가',     group: 'NT' },
  { code: 'INFJ', emoji: '🔮', name: '옹호자',     group: 'NF' },
  { code: 'INFP', emoji: '🌸', name: '중재자',     group: 'NF' },
  { code: 'ENFJ', emoji: '☀️', name: '선도자',     group: 'NF' },
  { code: 'ENFP', emoji: '🌈', name: '활동가',     group: 'NF' },
  { code: 'ISTJ', emoji: '📋', name: '현실주의자', group: 'SJ' },
  { code: 'ISFJ', emoji: '🛡️', name: '수호자',     group: 'SJ' },
  { code: 'ESTJ', emoji: '💼', name: '경영자',     group: 'SJ' },
  { code: 'ESFJ', emoji: '🤗', name: '집정관',     group: 'SJ' },
  { code: 'ISTP', emoji: '🔧', name: '장인',       group: 'SP' },
  { code: 'ISFP', emoji: '🎨', name: '모험가',     group: 'SP' },
  { code: 'ESTP', emoji: '⚡', name: '사업가',     group: 'SP' },
  { code: 'ESFP', emoji: '🎉', name: '연예인',     group: 'SP' },
]

const GROUP_META = {
  NT: {
    label: '분석가형', icon: '🧠',
    tagCls: 'bg-indigo-100 text-indigo-600',
    selCls: 'bg-indigo-50 border-2 border-indigo-500',
    cardCls: 'bg-indigo-500',
    hoverCls: 'hover:border-indigo-300 hover:bg-indigo-50',
    barCls: 'bg-indigo-400',
  },
  NF: {
    label: '외교관형', icon: '💝',
    tagCls: 'bg-pink-100 text-pink-600',
    selCls: 'bg-pink-50 border-2 border-pink-500',
    cardCls: 'bg-pink-500',
    hoverCls: 'hover:border-pink-300 hover:bg-pink-50',
    barCls: 'bg-pink-400',
  },
  SJ: {
    label: '관리자형', icon: '🏛️',
    tagCls: 'bg-amber-100 text-amber-600',
    selCls: 'bg-amber-50 border-2 border-amber-500',
    cardCls: 'bg-amber-500',
    hoverCls: 'hover:border-amber-300 hover:bg-amber-50',
    barCls: 'bg-amber-400',
  },
  SP: {
    label: '탐험가형', icon: '🌿',
    tagCls: 'bg-emerald-100 text-emerald-600',
    selCls: 'bg-emerald-50 border-2 border-emerald-500',
    cardCls: 'bg-emerald-500',
    hoverCls: 'hover:border-emerald-300 hover:bg-emerald-50',
    barCls: 'bg-emerald-400',
  },
}

// ===== 궁합 계산 =====
function calcCompat(codeA, codeB) {
  const a = { ei: codeA[0], ns: codeA[1], tf: codeA[2], jp: codeA[3] }
  const b = { ei: codeB[0], ns: codeB[1], tf: codeB[2], jp: codeB[3] }

  const sameType = codeA === codeB
  const sameEI   = a.ei === b.ei
  const sameNS   = a.ns === b.ns
  const sameTF   = a.tf === b.tf
  const sameJP   = a.jp === b.jp
  const isGolden = sameNS && !sameEI && !sameTF && !sameJP

  let score
  if (sameType) {
    score = 72
  } else {
    score = 50
    score += sameNS  ? 20 : -15
    score += !sameEI ? 12 : 0
    score += !sameTF ? 8  : 0
    score += sameJP  ? 5  : 0
    score += isGolden ? 15 : 0
    score = Math.max(35, Math.min(98, score))
  }

  let tier, tierEmoji, grad, mainDesc
  if (sameType) {
    tier = '거울 같은 사이';  tierEmoji = '🪞'
    grad = 'from-violet-400 to-purple-500'
    mainDesc = '나랑 똑같은 사람! 서로를 누구보다 잘 이해하지만 같은 단점이 충돌하기도 해요. 진정한 의미의 "나를 아는 친구" 같은 관계예요. 🪞'
  } else if (score >= 90) {
    tier = '황금비율 소울메이트'; tierEmoji = '💘'
    grad = 'from-pink-400 to-rose-500'
    mainDesc = '찾기 어려운 찐 황금비율이에요 ✨ 서로의 빈칸을 딱 채워주는 조합. 처음엔 달라 보여도 함께할수록 "이 사람이다" 싶을 거예요. 우주가 연결해준 사이 🌌'
  } else if (score >= 80) {
    tier = '찰떡궁합'; tierEmoji = '💖'
    grad = 'from-violet-400 to-purple-500'
    mainDesc = '케미 폭발하는 조합이에요 💥 비슷한 듯 다르고, 다른 듯 비슷한 매력적인 관계. 함께 있으면 자연스럽게 편안해져요. 오래 볼수록 더 좋아지는 사이예요.'
  } else if (score >= 70) {
    tier = '잘 맞는 편'; tierEmoji = '💛'
    grad = 'from-amber-400 to-orange-400'
    mainDesc = '나쁘지 않아요, 꽤 잘 맞아요! 서로 이해하는 부분도 많고 다름을 통해 함께 성장할 수 있는 관계예요. 서로의 다른 점이 오히려 매력이 될 수 있어요 ✨'
  } else if (score >= 60) {
    tier = '무난한 사이'; tierEmoji = '🤝'
    grad = 'from-sky-400 to-blue-500'
    mainDesc = '특별히 잘 맞는 것도, 크게 부딪히는 것도 없는 무난한 사이예요. 서로 노력하면 충분히 좋은 관계가 될 수 있어요. 첫인상보다 시간이 쌓일수록 나아져요.'
  } else if (score >= 50) {
    tier = '성장하는 관계'; tierEmoji = '🌱'
    grad = 'from-emerald-400 to-teal-500'
    mainDesc = '처음엔 서로 낯설게 느껴질 수 있어요. 하지만 다르기 때문에 서로에게서 배울 점이 많은 관계예요. 시간이 지날수록 서로를 이해하게 될 거예요 🌱'
  } else {
    tier = '도전적 관계'; tierEmoji = '⚡'
    grad = 'from-stone-500 to-stone-600'
    mainDesc = '솔직히 쉽지 않은 조합이에요 😅 하지만 세상에 안 되는 궁합은 없어요! 서로를 이해하려는 진심 어린 노력이 무엇보다 중요해요. 노력한 만큼 특별한 관계가 돼요.'
  }

  const dims = [
    {
      label: 'E · I',
      icon: sameEI ? (a.ei === 'E' ? '🗣️' : '🤫') : '⚖️',
      result: sameEI ? (a.ei === 'E' ? '외향 + 외향' : '내향 + 내향') : '외향 + 내향',
      desc: sameEI
        ? (a.ei === 'E' ? '어딜 가든 둘이 파티예요 🎉' : '조용한 둘만의 공간이 최고 🏡')
        : '사교적인 면과 신중한 면의 밸런스 ✨',
      good: !sameEI,
    },
    {
      label: 'N · S',
      icon: sameNS ? (a.ns === 'N' ? '💭' : '🌿') : '🌍',
      result: sameNS ? (a.ns === 'N' ? '직관 + 직관' : '현실 + 현실') : '직관 + 현실',
      desc: sameNS
        ? (a.ns === 'N' ? '아이디어 폭발, 끝없는 대화 🚀' : '안정적이고 현실적인 관계 🌱')
        : '이상 vs 현실, 관점 차이가 있어요 😮',
      good: sameNS,
    },
    {
      label: 'T · F',
      icon: sameTF ? (a.tf === 'T' ? '📊' : '💝') : '💫',
      result: sameTF ? (a.tf === 'T' ? '사고 + 사고' : '감정 + 감정') : '사고 + 감정',
      desc: sameTF
        ? (a.tf === 'T' ? '논리로 대화해요. 솔직 그 자체 📝' : '감정 공감 만렙 😭')
        : '논리와 감성의 황금 밸런스 💫',
      good: !sameTF,
    },
    {
      label: 'J · P',
      icon: sameJP ? (a.jp === 'J' ? '📅' : '🎲') : '🎯',
      result: sameJP ? (a.jp === 'J' ? '계획 + 계획' : '즉흥 + 즉흥') : '계획 + 즉흥',
      desc: sameJP
        ? (a.jp === 'J' ? '함께 세운 계획은 무조건 실행 ✅' : '자유로운 두 사람, 어디로 튈지 몰라 🌊')
        : '한 명은 계획, 한 명은 즉흥. 조율 필요 🔄',
      good: sameJP,
    },
  ]

  return { score, tier, tierEmoji, grad, mainDesc, dims, isGolden, sameType }
}

// ===== 서브 컴포넌트 =====
function TypeBadge({ type, label, active, onClick }) {
  const meta = type ? GROUP_META[type.group] : null
  return (
    <button onClick={onClick}
      className={`flex-1 flex flex-col items-center py-3 px-2 rounded-2xl border-2 transition-all ${
        active
          ? 'border-violet-400 bg-violet-50'
          : type
            ? 'border-stone-200 bg-white hover:border-violet-200'
            : 'border-dashed border-stone-300 bg-stone-50'
      }`}>
      <p className="text-[10px] font-bold text-stone-400 mb-1">{label}</p>
      {type ? (
        <>
          <span className="text-2xl leading-none">{type.emoji}</span>
          <span className="text-sm font-black text-stone-800 mt-1">{type.code}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${meta.tagCls}`}>{type.name}</span>
        </>
      ) : (
        <>
          <span className="text-2xl text-stone-200">?</span>
          <span className="text-[11px] text-stone-400 mt-1">선택하기</span>
        </>
      )}
    </button>
  )
}

function TypeCard({ type }) {
  const meta = GROUP_META[type.group]
  return (
    <div className="text-center">
      <div className={`w-14 h-14 rounded-2xl ${meta.selCls} flex items-center justify-center mx-auto mb-1.5 shadow-sm`}>
        <span className="text-2xl">{type.emoji}</span>
      </div>
      <p className="text-sm font-black text-stone-800">{type.code}</p>
      <p className="text-[10px] text-stone-400">{type.name}</p>
    </div>
  )
}

// ===== 메인 컴포넌트 =====
export default function MbtiCalc() {
  const [activeTab, setActiveTab] = useState('me')
  const [typeA, setTypeA] = useState(null)
  const [typeB, setTypeB] = useState(null)

  const handleSelect = (type) => {
    if (activeTab === 'me') {
      setTypeA(type)
    } else {
      setTypeB(type)
    }
  }

  const reset = () => {
    setTypeA(null)
    setTypeB(null)
    setActiveTab('me')
  }

  const current = activeTab === 'me' ? typeA : typeB
  const result  = typeA && typeB ? calcCompat(typeA.code, typeB.code) : null

  return (
    <div className="space-y-4">

      {/* 선택 섹션 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-5">

        {/* 두 타입 배지 */}
        <div className="flex items-center gap-2 mb-4">
          <TypeBadge type={typeA} label="나" active={activeTab === 'me'} onClick={() => setActiveTab('me')} />
          <div className="flex flex-col items-center gap-0.5 px-1">
            <span className="text-xl">💘</span>
            <span className="text-[9px] font-bold text-stone-300">VS</span>
          </div>
          <TypeBadge type={typeB} label="상대방" active={activeTab === 'partner'} onClick={() => setActiveTab('partner')} />
        </div>

        {/* 타입 선택 그리드 */}
        <div className="space-y-3">
          {['NT', 'NF', 'SJ', 'SP'].map(group => {
            const meta = GROUP_META[group]
            return (
              <div key={group}>
                <p className={`text-[10px] font-black mb-1.5 flex items-center gap-1 ${meta.tagCls.split(' ')[1]}`}>
                  <span>{meta.icon}</span>{meta.label}
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {TYPES.filter(t => t.group === group).map(t => {
                    const isSelected = current?.code === t.code
                    return (
                      <button key={t.code} onClick={() => handleSelect(t)}
                        className={`flex flex-col items-center py-2.5 rounded-xl transition-all duration-150 ${
                          isSelected
                            ? `${meta.selCls} shadow-sm scale-105`
                            : `border border-stone-200 bg-white ${meta.hoverCls} hover:-translate-y-0.5`
                        }`}>
                        <span className="text-xl leading-none">{t.emoji}</span>
                        <span className="text-[10px] font-black mt-0.5 leading-none text-stone-700">
                          {t.code}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

      </section>

      {/* 결과 섹션 */}
      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-5">

          {/* 두 타입 + 스코어 */}
          <div className="flex items-center gap-3 mb-4">
            <TypeCard type={typeA} />
            <div className="flex-1 text-center">
              <p className="text-4xl mb-1">{result.tierEmoji}</p>
              <p className="text-3xl font-black text-stone-800 leading-none">{result.score}<span className="text-lg">%</span></p>
              <p className="text-[11px] font-black text-stone-500 mt-1">{result.tier}</p>
            </div>
            <TypeCard type={typeB} />
          </div>

          {/* 스코어 바 */}
          <div className="mb-4">
            <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${result.grad} rounded-full transition-all duration-700`}
                style={{ width: `${result.score}%` }} />
            </div>
          </div>

          {/* 메인 설명 */}
          <div className={`bg-gradient-to-br ${result.grad} rounded-2xl p-4 text-white text-xs leading-relaxed mb-4`}>
            {result.mainDesc}
          </div>

          {/* 4차원 분석 */}
          <p className="text-[11px] font-black text-stone-500 mb-2.5">4가지 차원 분석</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {result.dims.map(dim => (
              <div key={dim.label}
                className={`rounded-xl p-3 border ${dim.good ? 'bg-violet-50 border-violet-100' : 'bg-stone-50 border-stone-100'}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base leading-none">{dim.icon}</span>
                  <span className="text-[10px] font-black text-stone-500">{dim.label}</span>
                  {dim.good && <span className="ml-auto text-[9px] font-black text-violet-500">+궁합</span>}
                </div>
                <p className="text-[11px] font-bold text-stone-700 leading-tight mb-0.5">{dim.result}</p>
                <p className="text-[10px] text-stone-400 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>

          {/* 다시하기 */}
          <button onClick={reset}
            className="w-full py-2.5 text-xs font-bold text-stone-400 hover:text-violet-600 border border-stone-200 hover:border-violet-300 rounded-xl transition-colors">
            다시 선택하기 🔄
          </button>

        </section>
      )}

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <p>MBTI 4개 차원(E/I·N/S·T/F·J/P)의 조합 특성을 기반으로 분석한 참고용 결과예요. 실제 관계는 개인의 성숙도·경험·노력에 따라 달라져요. 재미로 보는 궁합이니 너무 진지하게 받아들이지 마세요 😊</p>
      </aside>

    </div>
  )
}
