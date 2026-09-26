'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import { BASE_PATH } from '@/lib/config'

// 슬라이드 배경 — 텍스트가 의미를 전달하므로 이미지는 장식 처리(alt="")
const SLIDES = [
  { img: '01.webp', titleKey: 'hero.title', bodyKey: 'hero.description' },
  { img: '02.webp', titleKey: 'hero.slide2.title', bodyKey: 'hero.slide2.description' },
  { img: '08.webp', titleKey: 'hero.slide3.title', bodyKey: 'hero.slide3.description' },
]

const AUTO_MS = 6000

export default function Hero() {
  const { t, lang } = useI18n()
  const [index, setIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // 히어로 컨트롤 라벨은 현재 언어로 제공(EN/FR 사용자가 한국어 라벨을 듣지 않도록)
  const slideLabel: Record<string, (n: number) => string> = {
    ko: (n) => `슬라이드 ${n}`,
    en: (n) => `Slide ${n}`,
    fr: (n) => `Diapositive ${n}`,
  }
  const label = slideLabel[lang] ?? slideLabel.ko

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length)
  }, [])

  // 자동 전환 — 모션 최소화 선호 시 정지, 히어로가 화면 밖이면 일시정지(불필요한 리렌더 방지)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = true
    const section = sectionRef.current
    const io = section
      ? new IntersectionObserver((entries) => { visible = entries[0].isIntersecting }, { threshold: 0 })
      : null
    if (section && io) io.observe(section)

    const timer = setInterval(() => {
      if (!visible || document.hidden) return
      setIndex((i) => (i + 1) % SLIDES.length)
    }, AUTO_MS)

    return () => {
      clearInterval(timer)
      io?.disconnect()
    }
  }, [])

  // 좌우 화살표 키 — 히어로 안에 포커스가 있을 때만(입력 캐럿 이동을 방해하지 않도록)
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
  }

  // 터치 스와이프
  const touchStartX = useRef(0)
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return
    go(index + (diff > 0 ? 1 : -1))
  }

  const slide = SLIDES[index]

  return (
    <section
      id="hero"
      className="hero"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-media" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={s.img} className={`hero-slide${i === index ? ' active' : ''}`}>
            <img
              src={`${BASE_PATH}/img/${s.img}`}
              alt=""
              // 첫 슬라이드가 LCP — 즉시 로드하고 나머지는 우선순위를 낮춘다
              loading={i === 0 ? 'eager' : undefined}
              fetchPriority={i === 0 ? 'high' : 'low'}
            />
          </div>
        ))}
        <div className="hero-scrim"></div>
      </div>

      {/* 세로쓰기 낙관 기둥 — 옛 족자의 관지(款識)처럼 오른쪽 위에 브랜드명을 세로로 흘리고
          끝에 홍색 인장을 찍는다. 순수 장식(브랜드명은 로고·아이브로가 전달).
          hero-inner(하단 카피 블록)가 아니라 hero 전체를 기준 삼아 상단 여백에 둔다 */}
      <div className="hero-scroll-seal" aria-hidden="true">
        <span className="hero-scroll-text">홍현정한지공예연구소</span>
        <span className="hero-seal">紙</span>
      </div>

      <div className="hero-inner">
        <p className="hero-eyebrow">{t('hero.eyebrow')}</p>
        {/* key로 재마운트해 슬라이드가 바뀔 때마다 진입 페이드를 다시 재생한다 */}
        <div className="hero-copy" key={index}>
          <h1 className="hero-title">{t(slide.titleKey)}</h1>
          <p className="hero-body">{t(slide.bodyKey)}</p>
        </div>
        <div className="hero-actions">
          <Link href="/artwork/lamp" className="pill">
            {t('hero.button')} <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <div className="hero-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.img}
                type="button"
                className={`hero-dot${i === index ? ' active' : ''}`}
                onClick={() => go(i)}
                aria-label={label(i + 1)}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
