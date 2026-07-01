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
  // 외부 링크가 새 탭으로 열린다는 사실을 현재 언어로 스크린리더에 안내(G201) — 보이는 ↗는 aria-hidden이라 미전달
  const newWindowHint: Record<string, string> = {
    ko: '새 창에서 열림',
    en: 'opens in new window',
    fr: 'ouvre dans un nouvel onglet',
  }
  const extLabel = (label: string) => `${label}, ${newWindowHint[lang] ?? newWindowHint.ko}`
  // 아이콘 전용(↑) 스크롤탑 버튼의 접근명도 현재 언어로
  const backToTopLabel: Record<string, string> = { ko: '맨 위로', en: 'Back to top', fr: 'Haut de page' }
  // 내비게이션 랜드마크 라벨 — 스크린리더 랜드마크 점프 탐색 시 현재 언어로 안내
  const navLandmark: Record<string, string> = { ko: '주 메뉴', en: 'Main menu', fr: 'Menu principal' }
  // 작품 이미지 뷰어(갤러리·썸네일·라이트박스)의 아이콘 전용 컨트롤 라벨도 현재 언어로
  // (✕ ‹ › 버튼은 텍스트가 없어 aria-label이 스크린리더의 유일한 단서)
  const imgViewer: Record<string, { prev: string; next: string; close: string; gallery: string; thumbs: string; thumb: (t: string, i: number) => string }> = {
    ko: { prev: '이전 이미지', next: '다음 이미지', close: '닫기', gallery: '작품 이미지', thumbs: '이미지 썸네일', thumb: (t, i) => `${t} 이미지 ${i}` },
    en: { prev: 'Previous image', next: 'Next image', close: 'Close', gallery: 'Artwork images', thumbs: 'Image thumbnails', thumb: (t, i) => `${t} image ${i}` },
    fr: { prev: 'Image précédente', next: 'Image suivante', close: 'Fermer', gallery: "Images de l'œuvre", thumbs: 'Miniatures', thumb: (t, i) => `${t} image ${i}` },
  }
  const iv = imgViewer[lang] ?? imgViewer.ko
  // 이전/다음 작품 네비 랜드마크 + 관련 작품 캐러셀 컨트롤 라벨도 현재 언어로
  const relNav: Record<string, { pagination: string; carouselPrev: string; carouselNext: string }> = {
    ko: { pagination: '작품 탐색', carouselPrev: '이전 관련 작품', carouselNext: '다음 관련 작품' },
    en: { pagination: 'Artwork navigation', carouselPrev: 'Previous related work', carouselNext: 'Next related work' },
    fr: { pagination: 'Navigation des œuvres', carouselPrev: 'Œuvre liée précédente', carouselNext: 'Œuvre liée suivante' },
  }
  const rl = relNav[lang] ?? relNav.ko
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

  // 언어 전환 시 탭 제목을 현재 언어의 작품명 + 현지화 브랜드명으로 동기화(빌드 메타데이터는 정적이라 클라이언트에서 갱신).
  // 브랜드명도 t('logo.title')로 현지화 — 접미사만 한국어로 남아 EN/FR 탭 제목이 섞이던 문제 해결
  useEffect(() => {
    if (content?.title) {
      document.title = `${content.title} | ${t('logo.title')}`
    }
  }, [content?.title, t])

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
    // bfcache 복원 대응: 작품 이동 시 페이드아웃(page-loaded 제거)된 상태로 뒤로가기 복원되면
    // 본문이 opacity:0(빈 화면)으로 남으므로, 복원 시 본문을 다시 노출한다
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) document.body.classList.add('page-loaded') }
    window.addEventListener('pageshow', onPageShow as EventListener)

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
    const footer = document.querySelector<HTMLElement>('.detail-footer')
    // 문서 높이를 캐싱 — 매 스크롤마다 scrollHeight를 읽는 강제 레이아웃(reflow)을 제거.
    // 지연 이미지 로드·리사이즈로 높이가 바뀌면 ResizeObserver/resize가 갱신한다.
    let docH = document.documentElement.scrollHeight - window.innerHeight
    const renderProgress = () => { if (bar) bar.style.width = `${docH > 0 ? (window.scrollY / docH) * 100 : 0}%` }
    // 문서 높이 변화(리사이즈·지연 이미지 로드) 시 캐시 갱신 + 진행 바도 즉시 반영(다음 스크롤까지 stale 방지)
    const updateDocH = () => { docH = document.documentElement.scrollHeight - window.innerHeight; renderProgress() }
    const docHObserver = new ResizeObserver(updateDocH)
    docHObserver.observe(document.body)
    const onScroll = () => {
      renderProgress()
      // 푸터와 겹치면 숨긴다(홈과 동일) — 스크롤탑 버튼이 푸터 콘텐츠 위에 떠 있지 않도록
      const overlapsFooter = footer && scrollTopBtn
        ? footer.getBoundingClientRect().top < scrollTopBtn.getBoundingClientRect().bottom
        : false
      scrollTopBtn?.classList.toggle('visible', window.scrollY > 600 && !overlapsFooter)
    }
    const onTopClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // 맨 위로 이동 후 포커스를 문서 상단(main)으로 옮겨 키보드 탐색이 위에서 이어지게 한다(preventScroll로 부드러운 스크롤 유지)
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateDocH, { passive: true })
    scrollTopBtn?.addEventListener('click', onTopClick)

    // 이미지 fade-in
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      // 디코딩을 메인스레드에서 분리해 스크롤 중 잰크를 줄인다
      img.decoding = 'async'
      if (img.complete && img.naturalWidth > 0) img.classList.add('img-loaded')
      else img.addEventListener('load', () => img.classList.add('img-loaded'))
      // 로드 실패 시 깨진 이미지 아이콘 대신 숨김 처리(홈과 동일한 graceful 처리)
      img.addEventListener('error', () => { img.style.visibility = 'hidden' })
    })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      observer.disconnect()
      docHObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateDocH)
      window.removeEventListener('pageshow', onPageShow as EventListener)
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
      const target = `${BASE_PATH}/artwork/${targetId}/`
      // 모션 최소화 선호 시 페이드아웃 지연 없이 즉시 이동(페이드가 보이지 않는데 멈춘 듯한 대기만 남는 문제 방지)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { window.location.href = target; return }
      document.body.classList.remove('page-loaded')
      setTimeout(() => { window.location.href = target }, 350)
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

      <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />

      {/* 상단 네비게이션 */}
      <nav className="top-nav scrolled" aria-label={navLandmark[lang] ?? navLandmark.ko}>
        <div className="nav-container">
          <div className="nav-left-action">
            <Link href="/#gallery" className="back-nav-link">← {t('nav.gallery')}</Link>
          </div>
          <div className="logo">
            {/* 홈 nav 로고(Nav.tsx)와 동일하게 block 링크 — 블록 콘텐츠(h1·p)를 감싸는 인라인 링크의
                일그러진 포커스 링/불규칙 클릭 영역을 막고 패턴을 일치시킨다 */}
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
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
            <div className="detail-image-gallery" role="group" aria-label={iv.gallery}>
              <div className="main-image">
                <img
                  src={imageUrls[currentImageIndex]}
                  alt={`${content.title} ${currentImageIndex + 1}`}
                  loading="eager"
                  fetchPriority="high"
                  role="button"
                  tabIndex={0}
                  // 확대 버튼이 '어떤' 이미지를 여는지 스크린리더에 알리도록 작품명·번호를 동작 앞에 포함
                  aria-label={`${content.title} ${currentImageIndex + 1}, ${t('artworkDetail.zoom')}`}
                  onClick={openLightbox}
                  onKeyDown={onTriggerKeyDown}
                  // 로드 실패 시 깨진 이미지 아이콘 대신 숨김 처리(lazy 이미지와 동일한 graceful 처리)
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                />
                <div className="image-nav">
                  <button
                    type="button"
                    className="image-nav-btn prev"
                    onClick={() => setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))}
                    aria-label={iv.prev}
                  >‹</button>
                  <button
                    type="button"
                    className="image-nav-btn next"
                    onClick={() => setCurrentImageIndex((i) => (i + 1) % imageUrls.length)}
                    aria-label={iv.next}
                  >›</button>
                </div>
                {/* 이미지 전환 시 위치를 스크린리더에 안내(라이브 영역) */}
                <div className="image-counter" aria-live="polite" aria-atomic="true">
                  <span>{String(currentImageIndex + 1).padStart(2, '0')}</span>
                  <span className="counter-sep"> / </span>
                  {String(imageUrls.length).padStart(2, '0')}
                </div>
              </div>
              <div className="image-thumbnails" role="group" aria-label={iv.thumbs}>
                {imageUrls.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`thumbnail${i === currentImageIndex ? ' active' : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={iv.thumb(content.title, i + 1)}
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
                aria-label={`${content.title}, ${t('artworkDetail.zoom')}`}
                onClick={openLightbox}
                onKeyDown={onTriggerKeyDown}
                // 로드 실패 시 깨진 이미지 아이콘 대신 숨김 처리(lazy 이미지와 동일한 graceful 처리)
                onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
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
              <nav className="artwork-pagination detail-reveal" aria-label={rl.pagination}>
                {prevId && artworkData[prevId] ? (
                  <Link
                    className="artwork-nav-item prev-work"
                    href={`/artwork/${prevId}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                      e.preventDefault()
                      navigateTo(prevId)
                    }}
                    aria-label={`${t('artworkDetail.prevWork')}: ${artworkData[prevId][lang as Lang]?.title ?? artworkData[prevId].ko.title}`}
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
                    aria-label={`${t('artworkDetail.nextWork')}: ${artworkData[nextId][lang as Lang]?.title ?? artworkData[nextId].ko.title}`}
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
              type="button"
              className="carousel-btn prev"
              aria-label={rl.carouselPrev}
              onClick={() => carouselNudge.current?.(-1)}
            >‹</button>
            <div className="related-carousel">
              <div className="related-items-wrapper" ref={carouselRef}>
                {relatedIds.map((artId) => {
                  const rel = artworkData[artId]
                  if (!rel) return null
                  const relContent = rel[lang as Lang] ?? rel.ko
                  const relImg = rel.images?.[0] ?? rel.image
                  // 설명 발췌: 50자 초과 시 단어 중간에서 끊기지 않도록 마지막 어절을 제거하고 말줄임표를 붙인다
                  // (EN/FR 장문 설명이 'five-e'처럼 단어 중간에 잘려 깨진 듯 보이던 문제 해결)
                  const relFirstLine = relContent.description.split('\n')[0]
                  const relExcerpt =
                    relFirstLine.length > 50
                      ? relFirstLine.slice(0, 50).replace(/\s+\S*$/, '').trimEnd() + '…'
                      : relFirstLine
                  return (
                    <Link
                      key={artId}
                      href={`/artwork/${artId}`}
                      className="related-item"
                      // 링크 이름을 제목으로 간결화 — 내부 설명 발췌까지 낭독돼 14개 카드 탐색이 장황해지지 않도록
                      // (설명은 시각적으로 유지·대상 페이지에서 제공, WCAG 2.4.4 링크 목적)
                      aria-label={relContent.title}
                      onClick={(e) => {
                        // 보조 클릭(새 탭/창)은 브라우저 기본 동작에 맡긴다
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                        // 일반 좌클릭은 페이드아웃 전환을 보존하기 위해 직접 내비게이션
                        e.preventDefault()
                        navigateTo(artId)
                      }}
                    >
                      {relImg && (
                        // 인접 h3 제목이 동일 의미를 전달하므로 이미지는 장식 처리(링크 이름에 제목 중복 낭독 방지)
                        <img src={`${BASE_PATH}${relImg}`} alt="" loading="lazy" />
                      )}
                      <div className="related-info">
                        <h3>{relContent.title}</h3>
                        <p>{relExcerpt}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
            <button
              type="button"
              className="carousel-btn next"
              aria-label={rl.carouselNext}
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
              {/* 조직 연락처(이메일)는 시맨틱상 address 요소가 표준 — 홈 푸터와 일관 */}
              <address className="footer-contact">
                <span>{t('footer.contact.email')}</span>{' '}
                <a href="mailto:hongcraftstudio@gmail.com">{t('footer.contact.emailAddress')}</a>
              </address>
              <div className="social-links">
                <a href="https://www.instagram.com/hhj_hanj1craft" target="_blank" rel="noopener noreferrer" aria-label={extLabel(t('footer.social.instagram'))}>{t('footer.social.instagram')}<span className="ext-arrow" aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="footer-nav">
              <Link href="/#gallery" className="footer-back-btn">{t('related.backLink')}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            {/* 정적 export는 빌드 시점 연도로 프리렌더되고 클라이언트는 현재 연도로 갱신 — 연도 경계의 hydration 불일치 경고 억제(날짜성 콘텐츠 표준 처리) */}
            <p suppressHydrationWarning>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <button type="button" className="scroll-top-btn" id="scrollTopBtn" aria-label={backToTopLabel[lang] ?? backToTopLabel.ko}>↑</button>

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
          <button type="button" ref={lightboxCloseRef} className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label={iv.close}>✕</button>
          {imageUrls.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav prev"
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1)) }}
                aria-label={iv.prev}
              >‹</button>
              <button
                type="button"
                className="lightbox-nav next"
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((i) => (i + 1) % imageUrls.length) }}
                aria-label={iv.next}
              >›</button>
            </>
          )}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageUrls[currentImageIndex]} alt={content.title} />
          </div>
          <p className="lightbox-caption">
            {content.title}
            {imageUrls.length > 1 && (
              // 이미지 전환 시 위치를 스크린리더에 안내(갤러리 카운터와 동일 — 라이트박스 이미지 alt는 모두 동일 제목이라 위치 구분 불가)
              <span className="lightbox-count" aria-live="polite" aria-atomic="true">{currentImageIndex + 1} / {imageUrls.length}</span>
            )}
          </p>
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
  const switcherRef = useRef<HTMLDivElement>(null)
  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }
  const langNames: Record<Lang, string> = { ko: '한국어', en: 'English', fr: 'Français' }
  // 언어 전환 버튼은 현재 선택된 UI 언어로 자기 자신을 안내한다(EN/FR 사용자가 한국어 라벨을 듣지 않도록)
  const switcherLabel: Record<Lang, string> = {
    ko: `언어 선택 — 현재 ${langNames[lang]}`,
    en: `Select language — current: ${langNames[lang]}`,
    fr: `Choisir la langue — actuelle : ${langNames[lang]}`,
  }

  // 외부 클릭·Escape·포커스 이탈 시 닫기(Escape는 포커스를 버튼으로 복귀)
  useEffect(() => {
    if (!open) return
    const switcher = switcherRef.current
    const close = () => setOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); langBtnRef.current?.focus() }
    }
    // Tab 등으로 포커스가 스위처 밖으로 나가면 닫는다(disclosure 표준 — 열린 채 방치 방지)
    const onFocusOut = (e: FocusEvent) => {
      if (switcher && !switcher.contains(e.relatedTarget as Node)) setOpen(false)
    }
    // 스크롤 시 닫는다(드롭다운이 열린 채 스크롤로 방치되지 않도록 — 홈 내비와 동작 일관)
    const onScroll = () => setOpen(false)
    document.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
    switcher?.addEventListener('focusout', onFocusOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
      switcher?.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  return (
    <div className="language-switcher" ref={switcherRef}>
      <button
        type="button"
        ref={langBtnRef}
        className="lang-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}
        aria-expanded={open}
        aria-controls="lang-dropdown-detail"
        aria-label={switcherLabel[lang]}
      >
        {langLabels[lang]}
      </button>
      <div id="lang-dropdown-detail" className={`lang-dropdown${open ? ' show' : ''}`}>
        {(['ko', 'en', 'fr'] as Lang[]).map((l) => (
          <button
            type="button"
            key={l}
            className={`lang-option${lang === l ? ' active' : ''}`}
            // 옵션 라벨이 외국어 고유명(English/Français)이라 페이지 언어와 다를 때
            // 스크린리더가 잘못 발음하지 않도록 각 옵션에 해당 언어를 명시(WCAG 3.1.2)
            lang={l}
            aria-current={lang === l ? 'true' : undefined}
            onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false); langBtnRef.current?.focus() }}
          >
            {langNames[l]}
          </button>
        ))}
      </div>
    </div>
  )
}
