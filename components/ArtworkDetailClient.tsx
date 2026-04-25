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

  const id = typeof params?.id === 'string' ? params.id : ''
  const artwork = artworkData[id]
  const content = artwork ? (artwork[lang as Lang] ?? artwork.ko) : undefined

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
    setTimeout(() => document.body.classList.add('page-loaded'), 100)

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

    setTimeout(() => {
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
    window.addEventListener('scroll', onScroll, { passive: true })
    scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

    // 이미지 fade-in
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      if (img.complete && img.naturalWidth > 0) img.classList.add('img-loaded')
      else img.addEventListener('load', () => img.classList.add('img-loaded'))
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [id, lang])

  // 키보드 이미지 탐색 + 라이트박스 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) { setLightboxOpen(false); return }
      if (imageUrls.length <= 1) return
      if (e.key === 'ArrowLeft') setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))
      if (e.key === 'ArrowRight') setCurrentImageIndex((i) => (i + 1) % imageUrls.length)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [imageUrls.length, lightboxOpen])

  // 관련 작품 자동 캐러셀 (데스크탑)
  useEffect(() => {
    const wrapper = carouselRef.current
    if (!wrapper || window.innerWidth <= 768) return
    let pos = 0
    let raf: number
    let paused = false
    const originals = Array.from(wrapper.children)
    originals.forEach((el) => wrapper.appendChild(el.cloneNode(true)))
    const totalW = originals.length * 300

    const animate = () => {
      if (!paused) {
        pos -= 0.4
        if (Math.abs(pos) >= totalW) pos = 0
        wrapper.style.transform = `translateX(${pos}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    wrapper.addEventListener('mouseenter', () => { paused = true })
    wrapper.addEventListener('mouseleave', () => { paused = false })
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [lang])

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
      <div className="scroll-progress" id="scrollProgress" />

      {/* 상단 네비게이션 */}
      <nav className="top-nav scrolled">
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
      <main className="artwork-detail">
        <div className="detail-content">

          {/* 왼쪽: 이미지 (sticky) */}
          {imageUrls.length > 1 ? (
            <div className="detail-image-gallery">
              <div className="main-image">
                <img
                  src={imageUrls[currentImageIndex]}
                  alt={`${content.title} ${currentImageIndex + 1}`}
                  loading="lazy"
                  onClick={() => setLightboxOpen(true)}
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
                <div className="image-counter">
                  <span>{String(currentImageIndex + 1).padStart(2, '0')}</span>
                  <span className="counter-sep"> / </span>
                  {String(imageUrls.length).padStart(2, '0')}
                </div>
              </div>
              <div className="image-thumbnails">
                {imageUrls.map((url, i) => (
                  <div
                    key={i}
                    className={`thumbnail${i === currentImageIndex ? ' active' : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                  >
                    <img src={url} alt={`${content.title} ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="detail-image single">
              <img
                src={imageUrls[0]}
                alt={content.title}
                loading="lazy"
                onClick={() => setLightboxOpen(true)}
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

            <span className="detail-studio-label detail-reveal">{t('logo.title')}</span>
            <h1 className="detail-reveal">{content.title}</h1>
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
                  <button
                    className="artwork-nav-item prev-work"
                    onClick={() => navigateTo(prevId)}
                    aria-label={`이전: ${artworkData[prevId][lang as Lang]?.title}`}
                  >
                    <span className="nav-direction">← {t('artworkDetail.prevWork')}</span>
                    <span className="nav-title">
                      {artworkData[prevId][lang as Lang]?.title ?? artworkData[prevId].ko.title}
                    </span>
                  </button>
                ) : (
                  <span />
                )}
                {nextId && artworkData[nextId] ? (
                  <button
                    className="artwork-nav-item next-work"
                    onClick={() => navigateTo(nextId)}
                    aria-label={`다음: ${artworkData[nextId][lang as Lang]?.title}`}
                  >
                    <span className="nav-direction">{t('artworkDetail.nextWork')} →</span>
                    <span className="nav-title">
                      {artworkData[nextId][lang as Lang]?.title ?? artworkData[nextId].ko.title}
                    </span>
                  </button>
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
            <button className="carousel-btn prev" aria-label="Previous">‹</button>
            <div className="related-carousel">
              <div className="related-items-wrapper" ref={carouselRef}>
                {relatedIds.map((artId) => {
                  const rel = artworkData[artId]
                  if (!rel) return null
                  const relContent = rel[lang as Lang] ?? rel.ko
                  const relImg = rel.images?.[0] ?? rel.image
                  return (
                    <div
                      key={artId}
                      className="related-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigateTo(artId)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateTo(artId) }
                      }}
                    >
                      {relImg && (
                        <img src={`${BASE_PATH}${relImg}`} alt={relContent.title} loading="lazy" />
                      )}
                      <div className="related-info">
                        <h3>{relContent.title}</h3>
                        <p>{relContent.description.split('\n')[0].slice(0, 50)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button className="carousel-btn next" aria-label="Next">›</button>
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
                <a href="https://www.instagram.com/hhj_hanj1craft">{t('footer.social.instagram')}</a>
              </div>
            </div>
            <div className="footer-nav">
              <Link href="/#gallery" className="footer-back-btn">{t('related.backLink')}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <button className="scroll-top-btn" id="scrollTopBtn" aria-label="맨 위로">↑</button>

      {/* 라이트박스 */}
      {lightboxOpen && imageUrls.length > 0 && (
        <div
          className="lightbox-overlay active"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={content.title}
        >
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="닫기">✕</button>
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
  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <div className="language-switcher">
      <button
        className="lang-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {langLabels[lang]}
      </button>
      <div className={`lang-dropdown${open ? ' show' : ''}`} role="listbox">
        {(['ko', 'en', 'fr'] as Lang[]).map((l) => (
          <button
            key={l}
            className={`lang-option${lang === l ? ' active' : ''}`}
            role="option"
            aria-selected={lang === l}
            onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false) }}
          >
            {l === 'ko' ? '한국어' : l === 'en' ? 'English' : 'Français'}
          </button>
        ))}
      </div>
    </div>
  )
}
