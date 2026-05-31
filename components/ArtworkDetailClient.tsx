'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'
import { artworkData } from '@/lib/artworkData'
import { BASE_PATH } from '@/lib/config'

// 작품 순서 — 이전/다음 네비게이션, 관련 작품 순서에 사용
const ARTWORK_ORDER = [
  'lamp', 'takja', 'process', 'neak_circle', 'circle_ham', 'circle_pum',
  'gallery01', 'gallery03', 'gallery09', 'gallery10', 'gallery11', 'gallery12',
  'gallery13', 'circle', 'multi', 'three_circle',
]

export default function ArtworkDetailClient() {
  const params = useParams()
  const { t, lang } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  // 캐러셀 좌/우 버튼이 자동 애니메이션의 위치 값을 한 카드만큼 밀도록 노출하는 핸들
  const carouselNudge = useRef<((dir: number) => void) | null>(null)
  // 라이트박스 포커스 관리: 오버레이 + 닫기 버튼 + 직전 트리거(복귀용)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)

  // 이미지 트리거(키보드 포함)로 라이트박스 열기 — 포커스 복귀를 위해 트리거 저장
  const openLightbox = useCallback((e: React.SyntheticEvent) => {
    lastTriggerRef.current = e.currentTarget as HTMLElement
    setLightboxOpen(true)
  }, [])
  const onTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(e) }
  }, [openLightbox])

  const id = typeof params?.id === 'string' ? params.id : ''
  const artwork = artworkData[id]
  const content = artwork ? (artwork[lang as Lang] ?? artwork.ko) : undefined

  // 언어 전환 시 탭 제목을 현재 언어의 작품명으로 동기화(빌드 메타데이터는 정적이라 클라이언트에서 갱신)
  useEffect(() => {
    if (content?.title) {
      document.title = `${content.title} | 홍현정한지공예 연구소`
    }
  }, [content?.title])

  const imageUrls = artwork
    ? (artwork.images ?? (artwork.image ? [artwork.image] : [])).map((url) => `${BASE_PATH}${url}`)
    : []

  // 이전/다음 작품
  const orderIndex = ARTWORK_ORDER.indexOf(id)
  const prevId = orderIndex > 0 ? ARTWORK_ORDER[orderIndex - 1] : null
  const nextId = orderIndex < ARTWORK_ORDER.length - 1 ? ARTWORK_ORDER[orderIndex + 1] : null

  // 관련 작품 (현재 작품 제외)
  const relatedIds = ARTWORK_ORDER.filter((aid) => aid !== id)

  // 페이지 진입 + 스크롤 리빌 애니메이션
  useEffect(() => {
    const t1 = setTimeout(() => document.body.classList.add('page-loaded'), 100)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    const t2 = setTimeout(() => {
      document.querySelector('.detail-image, .detail-image-gallery')?.classList.add('img-visible')
      document
        .querySelectorAll(
          '.detail-info, .detail-reveal, .related-item, .section-title, .artwork-pagination',
        )
        .forEach((el) => observer.observe(el))
    }, 80)

    // 스크롤 진행 바 + 스크롤 탑 버튼
    const bar = document.getElementById('scrollProgress')
    const scrollTopBtn = document.getElementById('scrollTopBtn')
    const onScroll = () => {
      if (bar) {
        const docH = document.documentElement.scrollHeight - window.innerHeight
        bar.style.width = `${(window.scrollY / docH) * 100}%`
      }
      scrollTopBtn?.classList.toggle('visible', window.scrollY > 600)
    }
    const onTopClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // 맨 위로 이동 후 포커스를 문서 상단(main)으로 옮겨 키보드 탐색이 위에서 이어지게 한다(preventScroll로 부드러운 스크롤 유지)
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    scrollTopBtn?.addEventListener('click', onTopClick)

    // 이미지 fade-in
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      // 디코딩을 메인스레드에서 분리해 스크롤 중 잰크를 줄인다
      img.decoding = 'async'
      if (img.complete && img.naturalWidth > 0) img.classList.add('img-loaded')
      else img.addEventListener('load', () => img.classList.add('img-loaded'))
    })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      scrollTopBtn?.removeEventListener('click', onTopClick)
    }
  }, [id, lang])

  // 키보드 이미지 탐색 + 라이트박스 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) { setLightboxOpen(false); return }
      // 포커스 트랩: 라이트박스가 열려 있으면 Tab을 내부 버튼들 안에서 순환
      if (e.key === 'Tab' && lightboxOpen && lightboxRef.current) {
        const f = lightboxRef.current.querySelectorAll<HTMLElement>('button')
        if (f.length) {
          const first = f[0], last = f[f.length - 1]
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
        }
        return
      }
      if (imageUrls.length <= 1) return
      // 화살표 이미지 전환은 라이트박스가 열렸거나 포커스가 이미지 갤러리 안일 때만 — 전역 키 가로채기 방지
      const inImageContext = lightboxOpen || Boolean(document.activeElement?.closest('.detail-image-gallery'))
      if (!inImageContext) return
      if (e.key === 'ArrowLeft') setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))
      if (e.key === 'ArrowRight') setCurrentImageIndex((i) => (i + 1) % imageUrls.length)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [imageUrls.length, lightboxOpen])

  // 라이트박스 포커스 관리 + 배경 스크롤 잠금(모달 표준, scroll bleed 방지)
  useEffect(() => {
    if (lightboxOpen) {
      lightboxCloseRef.current?.focus()
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus()
        lastTriggerRef.current = null
      }
    }
    return () => { document.body.style.overflowY = '' }
  }, [lightboxOpen])

  // 관련 작품 자동 캐러셀 (데스크탑)
  useEffect(() => {
    const wrapper = carouselRef.current
    if (!wrapper || window.innerWidth <= 768) return
    let pos = 0
    let raf: number
    // 모션 최소화 선호 시 자동 흐름을 멈추고 버튼 이동만 허용
    // (reduce는 별도 상수 — hover/focus용 paused가 풀려도 자동 흐름이 되살아나지 않게)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let paused = false
    // 무한 루프용 복제본 — cleanup에서 정확히 제거하기 위해 참조 보관
    // 복제본은 시각용 중복일 뿐 클릭 핸들러가 없으므로, 탭 순서·접근성 트리에서 제외
    const originals = Array.from(wrapper.children)
    const clones = originals.map((el) => {
      const clone = el.cloneNode(true) as HTMLElement
      clone.setAttribute('aria-hidden', 'true')
      clone.inert = true
      return clone
    })
    clones.forEach((clone) => wrapper.appendChild(clone))
    const totalW = originals.length * 300

    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }

    // 캐러셀이 뷰포트 안에 있을 때만 프레임 작업 수행
    let visible = true
    const animate = () => {
      raf = requestAnimationFrame(animate)
      // 화면 밖이면 위치 갱신·transform 쓰기를 건너뛴다 — 보이지 않는 요소의 매 프레임 컴포지팅 낭비 방지
      if (!visible) return
      // 자동 흐름은 hover/focus(paused)나 모션 최소화(reduce) 시 멈춤 — nudge는 pos를 직접 바꿔 영향 없음
      if (!paused && !reduce) {
        pos -= 0.4
      }
      // 좌/우 버튼으로 이동한 경우에도 항상 wrap 범위 안으로 정규화
      if (pos <= -totalW) pos += totalW
      if (pos > 0) pos -= totalW
      wrapper.style.transform = `translateX(${pos}px)`
    }
    // 캐러셀 가시성 추적 — 화면 밖이면 자동 흐름 정지
    const visObserver = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting })
    visObserver.observe(wrapper)
    wrapper.addEventListener('mouseenter', onEnter)
    wrapper.addEventListener('mouseleave', onLeave)
    // 키보드 포커스가 카드 안에 있으면 자동 흐름 정지 — 포커스된 카드가 미끄러지지 않게(WCAG 2.2.2·조작성)
    const onFocusOut = (e: FocusEvent) => { if (!wrapper.contains(e.relatedTarget as Node)) onLeave() }
    wrapper.addEventListener('focusin', onEnter)
    wrapper.addEventListener('focusout', onFocusOut as EventListener)
    raf = requestAnimationFrame(animate)

    // 좌/우 버튼 클릭 시 한 카드(300px)만큼 이동 + 잠시 자동 진행 일시정지
    let resumeTimer: ReturnType<typeof setTimeout> | null = null
    carouselNudge.current = (dir: number) => {
      pos -= dir * 300
      paused = true
      if (resumeTimer) clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => { paused = false }, 1200)
    }

    return () => {
      cancelAnimationFrame(raf)
      visObserver.disconnect()
      if (resumeTimer) clearTimeout(resumeTimer)
      carouselNudge.current = null
      wrapper.removeEventListener('mouseenter', onEnter)
      wrapper.removeEventListener('mouseleave', onLeave)
      wrapper.removeEventListener('focusin', onEnter)
      wrapper.removeEventListener('focusout', onFocusOut as EventListener)
      // 복제 노드 제거 + transform 초기화 (lang/id 변경 시 누적 복제 방지)
      clones.forEach((clone) => clone.remove())
      wrapper.style.transform = ''
    }
  }, [lang, id])

  const navigateTo = useCallback(
    (targetId: string) => {
      document.body.classList.remove('page-loaded')
      setTimeout(() => { window.location.href = `${BASE_PATH}/artwork/${targetId}/` }, 350)
    },
    [],
  )

  // 작품 없음
  if (!artwork || !content) {
    return (
      <div className="artwork-not-found">
        <p className="not-found-label">404</p>
        <h2>{t('artworkDetail.notFound.title')}</h2>
        <p>{t('artworkDetail.notFound.description')}</p>
        <Link href="/#gallery" className="back-link">{t('artworkDetail.notFound.backLink')}</Link>
      </div>
    )
  }

  return (
    <>
      {/* 본문 바로가기 — 키보드/스크린리더가 내비를 건너뛰도록 (홈과 일관) */}
      <a href="#main-content" className="skip-link">{t('a11y.skipToContent')}</a>

      <div className="scroll-progress" id="scrollProgress" />

      {/* 상단 네비게이션 */}
      <nav className="top-nav scrolled" aria-label="주 메뉴">
        <div className="nav-container">
          <div className="nav-left-action">
            <Link href="/#gallery" className="back-nav-link">← Collection</Link>
          </div>
          <div className="logo">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>{t('logo.title')}</h1>
              <p>{t('logo.subtitle')}</p>
            </Link>
          </div>
          <div className="nav-actions">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* 메인 작품 영역 */}
      <main className="artwork-detail" id="main-content" tabIndex={-1}>
        <div className="detail-content">

          {/* 왼쪽: 이미지 (sticky) */}
          {imageUrls.length > 1 ? (
            <div className="detail-image-gallery" role="group" aria-label="작품 이미지">
              <div className="main-image">
                <img
                  src={imageUrls[currentImageIndex]}
                  alt={`${content.title} ${currentImageIndex + 1}`}
                  loading="eager"
                  fetchPriority="high"
                  role="button"
                  tabIndex={0}
                  aria-label={t('artworkDetail.zoom')}
                  onClick={openLightbox}
                  onKeyDown={onTriggerKeyDown}
                />
                <div className="image-nav">
                  <button
                    className="image-nav-btn prev"
                    onClick={() => setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))}
                    aria-label="이전 이미지"
                  >‹</button>
                  <button
                    className="image-nav-btn next"
                    onClick={() => setCurrentImageIndex((i) => (i + 1) % imageUrls.length)}
                    aria-label="다음 이미지"
                  >›</button>
                </div>
                {/* 이미지 전환 시 위치를 스크린리더에 안내(라이브 영역) */}
                <div className="image-counter" aria-live="polite" aria-atomic="true">
                  <span>{String(currentImageIndex + 1).padStart(2, '0')}</span>
                  <span className="counter-sep"> / </span>
                  {String(imageUrls.length).padStart(2, '0')}
                </div>
              </div>
              <div className="image-thumbnails" role="group" aria-label="이미지 썸네일">
                {imageUrls.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`thumbnail${i === currentImageIndex ? ' active' : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={`${content.title} 이미지 ${i + 1}`}
                    aria-current={i === currentImageIndex ? 'true' : undefined}
                  >
                    {/* 라벨은 버튼 aria-label이 전달하므로 이미지는 장식 처리 */}
                    <img src={url} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="detail-image single">
              <img
                src={imageUrls[0]}
                alt={content.title}
                loading="eager"
                fetchPriority="high"
                role="button"
                tabIndex={0}
                aria-label={t('artworkDetail.zoom')}
                onClick={openLightbox}
                onKeyDown={onTriggerKeyDown}
              />
            </div>
          )}

          {/* 오른쪽: 작품 정보 */}
          <div className="detail-info">
            {/* 에디토리얼 작품 번호 */}
            {orderIndex >= 0 && (
              <div className="detail-index" aria-hidden="true">
                {String(orderIndex + 1).padStart(2, '0')}
              </div>
            )}

            {/* 장식 워터마크 — 스튜디오명은 내비 h1·푸터에 이미 있어 중복 안내 방지 */}
            <span className="detail-studio-label detail-reveal" aria-hidden="true">{t('logo.title')}</span>
            <h2 className="detail-title detail-reveal">{content.title}</h2>
            <div className="detail-title-line detail-reveal" />

            <div className="artwork-description detail-reveal">
              <p>{content.description}</p>
            </div>

            <div className="artwork-story detail-reveal">
              <h3>{t('artworkDetail.storyTitle')}</h3>
              <p>{content.story}</p>
            </div>

            {/* 이전/다음 작품 네비게이션 */}
            {(prevId || nextId) && (
              <nav className="artwork-pagination detail-reveal" aria-label="작품 탐색">
                {prevId && artworkData[prevId] ? (
                  <Link
                    className="artwork-nav-item prev-work"
                    href={`/artwork/${prevId}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                      e.preventDefault()
                      navigateTo(prevId)
                    }}
                    aria-label={`이전: ${artworkData[prevId][lang as Lang]?.title}`}
                  >
                    <span className="nav-direction">← {t('artworkDetail.prevWork')}</span>
                    <span className="nav-title">
                      {artworkData[prevId][lang as Lang]?.title ?? artworkData[prevId].ko.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {nextId && artworkData[nextId] ? (
                  <Link
                    className="artwork-nav-item next-work"
                    href={`/artwork/${nextId}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                      e.preventDefault()
                      navigateTo(nextId)
                    }}
                    aria-label={`다음: ${artworkData[nextId][lang as Lang]?.title}`}
                  >
                    <span className="nav-direction">{t('artworkDetail.nextWork')} →</span>
                    <span className="nav-title">
                      {artworkData[nextId][lang as Lang]?.title ?? artworkData[nextId].ko.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </div>
      </main>

      {/* 관련 작품 캐러셀 */}
      <section className="related-artworks">
        <div className="container">
          <h2 className="section-title">{t('related.title')}</h2>
          <div className="carousel-container">
            <button
              className="carousel-btn prev"
              aria-label="이전 관련 작품"
              onClick={() => carouselNudge.current?.(-1)}
            >‹</button>
            <div className="related-carousel">
              <div className="related-items-wrapper" ref={carouselRef}>
                {relatedIds.map((artId) => {
                  const rel = artworkData[artId]
                  if (!rel) return null
                  const relContent = rel[lang as Lang] ?? rel.ko
                  const relImg = rel.images?.[0] ?? rel.image
                  return (
                    <Link
                      key={artId}
                      href={`/artwork/${artId}`}
                      className="related-item"
                      onClick={(e) => {
                        // 보조 클릭(새 탭/창)은 브라우저 기본 동작에 맡긴다
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                        // 일반 좌클릭은 페이드아웃 전환을 보존하기 위해 직접 내비게이션
                        e.preventDefault()
                        navigateTo(artId)
                      }}
                    >
                      {relImg && (
                        <img src={`${BASE_PATH}${relImg}`} alt={relContent.title} loading="lazy" />
                      )}
                      <div className="related-info">
                        <h3>{relContent.title}</h3>
                        <p>{relContent.description.split('\n')[0].slice(0, 50)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
            <button
              className="carousel-btn next"
              aria-label="다음 관련 작품"
              onClick={() => carouselNudge.current?.(1)}
            >›</button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer detail-footer">
        <div className="container">
          <div className="detail-footer-content">
            <div className="footer-main">
              <h3>{t('logo.title')}</h3>
              <div className="footer-contact">
                <span>{t('footer.contact.email')}</span>{' '}
                <a href="mailto:hongcraftstudio@gmail.com">{t('footer.contact.emailAddress')}</a>
              </div>
              <div className="social-links">
                <a href="https://www.instagram.com/hhj_hanj1craft" target="_blank" rel="noopener noreferrer">{t('footer.social.instagram')}</a>
              </div>
            </div>
            <div className="footer-nav">
              <Link href="/#gallery" className="footer-back-btn">{t('related.backLink')}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <button className="scroll-top-btn" id="scrollTopBtn" aria-label="맨 위로">↑</button>

      {/* 라이트박스 */}
      {lightboxOpen && imageUrls.length > 0 && (
        <div
          ref={lightboxRef}
          className="lightbox-overlay active"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={content.title}
        >
          <button ref={lightboxCloseRef} className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="닫기">✕</button>
          {imageUrls.length > 1 && (
            <>
              <button
                className="lightbox-nav prev"
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1)) }}
                aria-label="이전"
              >‹</button>
              <button
                className="lightbox-nav next"
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((i) => (i + 1) % imageUrls.length) }}
                aria-label="다음"
              >›</button>
            </>
          )}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageUrls[currentImageIndex]} alt={content.title} />
          </div>
          <p className="lightbox-caption">{content.title}</p>
        </div>
      )}
    </>
  )
}

// 언어 전환기
function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const langBtnRef = useRef<HTMLButtonElement>(null)
  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }

  // 외부 클릭·Escape 시 닫기(Escape는 포커스를 버튼으로 복귀)
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); langBtnRef.current?.focus() }
    }
    document.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="language-switcher">
      <button
        ref={langBtnRef}
        className="lang-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`언어 선택, 현재 ${langLabels[lang]}`}
      >
        {langLabels[lang]}
      </button>
      <div className={`lang-dropdown${open ? ' show' : ''}`}>
        {(['ko', 'en', 'fr'] as Lang[]).map((l) => (
          <button
            key={l}
            className={`lang-option${lang === l ? ' active' : ''}`}
            aria-current={lang === l ? 'true' : undefined}
            onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false); langBtnRef.current?.focus() }}
          >
            {l === 'ko' ? '한국어' : l === 'en' ? 'English' : 'Français'}
          </button>
        ))}
      </div>
    </div>
  )
}
