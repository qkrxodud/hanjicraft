'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/contexts/I18nContext'
import Nav from '@/components/Nav'
import ClientWrapper from '@/components/ClientWrapper'

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      {/* Page Preloader */}
      <div id="page-loader" aria-hidden="true">
        <div className="loader-inner">
          <span className="loader-symbol">紙</span>
          <span className="loader-line"></span>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Custom Cursor */}
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-container">
          <div className="hero-slider">
            <div className="slide active">
              <img src="/img/01.webp" alt="Hanji Craft Exhibition" loading="eager" fetchPriority="high" />
              <div className="slide-content">
                <h2>{t('hero.title')}</h2>
                <p>{t('hero.description')}</p>
                <Link href="/artwork/lamp" className="hero-btn">{t('hero.button')}</Link>
              </div>
            </div>
            <div className="slide">
              <img src="/img/02.webp" alt="Hanji Craft Mastery" />
              <div className="slide-content">
                <h2>{t('hero.slide2.title')}</h2>
                <p>{t('hero.slide2.description')}</p>
                <Link href="/artwork/circle" className="hero-btn">{t('hero.button')}</Link>
              </div>
            </div>
            <div className="slide">
              <img src="/img/08.webp" alt="Hanji Natural Beauty" />
              <div className="slide-content">
                <h2>{t('hero.slide3.title')}</h2>
                <p>{t('hero.slide3.description')}</p>
                <Link href="/artwork/gallery01" className="hero-btn">{t('hero.button')}</Link>
              </div>
            </div>
          </div>
          <div className="hero-scroll-hint" aria-hidden="true">
            <span className="scroll-hint-line"></span>
          </div>
          <div className="hero-indicators">
            <button className="hero-indicator active" data-index="0" aria-label="슬라이드 1"></button>
            <button className="hero-indicator" data-index="1" aria-label="슬라이드 2"></button>
            <button className="hero-indicator" data-index="2" aria-label="슬라이드 3"></button>
          </div>
        </div>
      </section>

      {/* Hero Stats */}
      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="1000">0</span>
          <span className="hero-stat-label">{t('hero.stat.years')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="100">0</span>
          <span className="hero-stat-label">{t('hero.stat.artworks')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="10">0</span>
          <span className="hero-stat-label">{t('hero.stat.exhibitions')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="4">0</span>
          <span className="hero-stat-label">{t('hero.stat.countries')}</span>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {['한지공예', 'HANJI CRAFT', '홍현정한지공예연구소', 'TRADITION', 'CRAFTSMANSHIP', '천년의 기술', 'MAISON OBJET', 'KOREAN HERITAGE'].flatMap((text, i) => [
            <span key={`t${i}`}>{text}</span>,
            <span key={`d${i}`} className="gold">·</span>,
          ]).concat(
            ['한지공예', 'HANJI CRAFT', '홍현정한지공예연구소', 'TRADITION', 'CRAFTSMANSHIP', '천년의 기술', 'MAISON OBJET', 'KOREAN HERITAGE'].flatMap((text, i) => [
              <span key={`t2${i}`}>{text}</span>,
              <span key={`d2${i}`} className="gold">·</span>,
            ])
          )}
        </div>
      </div>

      {/* Brand Section */}
      <section id="brand" className="brand-section">
        <div className="container">
          <div className="brand-header">
            <h2 className="section-title">
              <span className="section-label">BRAND</span>
              {t('brand.title')}
            </h2>
            <p className="brand-subtitle">{t('brand.subtitle')}</p>
          </div>
          <div className="brand-content">
            <div className="brand-mission">
              <div className="brand-card">
                <h3>{t('brand.mission.title')}</h3>
                <p>{t('brand.mission.description')}</p>
              </div>
              <div className="brand-card">
                <h3>{t('brand.vision.title')}</h3>
                <p>{t('brand.vision.description')}</p>
              </div>
            </div>
            <div className="brand-values">
              <h3 className="values-title">{t('brand.values.title')}</h3>
              <div className="values-grid">
                {[
                  { icon: '傳', key: 'tradition' },
                  { icon: '革', key: 'innovation' },
                  { icon: '自', key: 'sustainability' },
                  { icon: '匠', key: 'craftsmanship' },
                ].map(({ icon, key }) => (
                  <div key={key} className="value-card">
                    <div className="value-icon">{icon}</div>
                    <h4>{t(`brand.values.${key}.title`)}</h4>
                    <p>{t(`brand.values.${key}.description`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="highlights">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label">EXHIBITION</span>
            {t('highlights.title')}
          </h2>
          <div className="highlights-grid">
            <div className="highlight-card featured">
              <img src="/img/gallery/01.webp" alt="Featured Exhibition" loading="lazy" />
              <div className="card-content">
                <span className="card-category">{t('highlights.exhibition.category')}</span>
                <h3>{t('highlights.exhibition.title')}</h3>
                <p>{t('highlights.exhibition.description')}</p>
                <Link href="/artwork/gallery01" className="card-link">{t('highlights.exhibition.link')}</Link>
              </div>
            </div>
            <div className="highlight-card">
              <img src="/img/gallery/02.webp" alt="Collection Highlight" loading="lazy" />
              <div className="card-content">
                <span className="card-category">{t('highlights.collection.category')}</span>
                <h3>{t('highlights.collection.title')}</h3>
                <p>{t('highlights.collection.description')}</p>
                <Link href="/artwork/lamp" className="card-link">{t('highlights.collection.link')}</Link>
              </div>
            </div>
            <div className="highlight-card">
              <img src="/img/circle.webp" alt="Workshop" loading="lazy" />
              <div className="card-content">
                <span className="card-category">{t('highlights.workshop.category')}</span>
                <h3>{t('highlights.workshop.title')}</h3>
                <p>{t('highlights.workshop.description')}</p>
                <Link href="/artwork/circle" className="card-link">{t('highlights.workshop.link')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collections" className="collection-delve">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label">COLLECTION</span>
            {t('collection.title')}
          </h2>
          <div className="collection-grid">
            {[
              { key: 'modern', img: '/img/makeing/08.webp' },
              { key: 'techniques', img: '/img/makeing/03.webp' },
              { key: 'forming', img: '/img/makeing/07.webp' },
              { key: 'materials', img: '/img/makeing/02.webp' },
              { key: 'tools', img: '/img/makeing/01.webp' },
              { key: 'beating', img: '/img/makeing/06.webp' },
              { key: 'preparation', img: '/img/makeing/04.webp' },
              { key: 'soaking', img: '/img/makeing/05.webp' },
            ].map(({ key, img }) => (
              <div key={key} className="collection-item">
                <img src={img} alt={t(`collection.${key}.title`)} loading="lazy" />
                <div className="item-content">
                  <h3>{t(`collection.${key}.title`)}</h3>
                  <p>{t(`collection.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masterpieces Gallery */}
      <section id="gallery" className="masterpieces">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label">GALLERY</span>
            {t('masterpieces.title')}
          </h2>
        </div>
        <div className="masterpieces-grid">
          {[
            { id: 'gallery09', img: '/img/09.webp', titleKey: 'masterpieces.lamp.title', descKey: 'masterpieces.lamp.description', periodKey: 'masterpieces.lamp.period', featured: true },
            { id: 'takja', img: '/img/gallery/takja.webp', titleKey: 'masterpieces.vessels.title', periodKey: 'masterpieces.vessels.period' },
            { id: 'process', img: '/img/gallery/about.webp', titleKey: 'masterpieces.daily.title', periodKey: 'masterpieces.daily.period' },
            { id: 'gallery13', img: '/img/gallery/13.webp', titleKey: 'masterpieces.art.title', periodKey: 'masterpieces.art.period' },
            { id: 'gallery11', img: '/img/gallery/11.webp', titleKey: 'masterpieces.architecture.title', periodKey: 'masterpieces.architecture.period' },
            { id: 'gallery12', img: '/img/gallery/12.webp', titleKey: 'masterpieces.drawer.title', periodKey: 'masterpieces.drawer.period' },
            { id: 'multi', img: '/img/gallery/multi.webp', titleKey: 'masterpieces.multi.title', periodKey: 'masterpieces.multi.period' },
            { id: 'three_circle', img: '/img/gallery/3_circle.webp', titleKey: 'masterpieces.jiseung.title', periodKey: 'masterpieces.jiseung.period' },
            { id: 'gallery10', img: '/img/gallery/10.webp', titleKey: 'masterpieces.empress.title', periodKey: 'masterpieces.empress.period' },
          ].map(({ id, img, titleKey, descKey, periodKey, featured }) => (
            <MasterpieceItem key={id} id={id} img={img} title={t(titleKey)} description={descKey ? t(descKey) : undefined} period={t(periodKey!)} featured={!!featured} />
          ))}
        </div>
      </section>

      {/* Philosophy Strip */}
      <div className="philosophy-strip">
        <div className="philosophy-inner">
          <span className="philosophy-label">{t('philosophy.label')}</span>
          <blockquote>{t('philosophy.quote')}</blockquote>
        </div>
      </div>

      {/* Featured Artworks */}
      <section id="about" className="featured-artworks">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label">ARTWORKS</span>
            {t('featured.title')}
          </h2>
        </div>
        <div className="editorial-rows">
          {[
            { img: '/img/gallery/light_circle.webp', key: 'lamp', href: '/artwork/neak_circle', index: '01' },
            { img: '/img/gallery/blue_circle.webp', key: 'armor', href: '/artwork/circle_ham', index: '02', reverse: true },
            { img: '/img/two_circle.webp', key: 'craftsman', href: '/artwork/circle_pum', index: '03' },
          ].map(({ img, key, href, index, reverse }) => (
            <div key={key} className={`editorial-row${reverse ? ' editorial-row--reverse' : ''}`}>
              <div className="editorial-image">
                <img src={img} alt={t(`featured.${key}.title`)} loading="lazy" />
              </div>
              <div className="editorial-text">
                <span className="editorial-index">{index}</span>
                <h3>{t(`featured.${key}.title`)}</h3>
                <p className="artwork-period">{t(`featured.${key}.period`)}</p>
                <p className="artwork-description">{t(`featured.${key}.description`)}</p>
                <Link href={href} className="artwork-link">{t(`featured.${key}.link`)}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Section */}
      <section id="inquiry" className="inquiry-section">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label">PARTNERSHIP</span>
            {t('inquiry.title')}
          </h2>
          <p className="inquiry-lead">{t('inquiry.description')}</p>
          <div className="inquiry-divider" aria-hidden="true"></div>
          <div className="inquiry-cta-group">
            <a href="mailto:hongcraftstudio@gmail.com" className="inquiry-btn primary">{t('inquiry.button.contact')}</a>
            <a href="https://www.instagram.com/hhj_hanj1craft" target="_blank" rel="noopener" className="inquiry-btn secondary">{t('inquiry.button.instagram')}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <h3>{t('logo.title')}</h3>
            <p>{t('logo.subtitle')}</p>
          </div>
        </div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <p><span>{t('footer.contact.address')}</span></p>
              <p>
                <span>{t('footer.contact.email')}</span>{' '}
                <a href="mailto:hongcraftstudio@gmail.com">{t('footer.contact.emailAddress')}</a>
              </p>
            </div>
            <div className="footer-social">
              <div className="social-links">
                <a href="https://www.instagram.com/hhj_hanj1craft">{t('footer.social.instagram')}</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-primary-menu" id="primary-menu">
          <button className="bottom-nav-btn primary" id="primary-menu-btn">{t('fab.menu')}</button>
          <div className="primary-submenu" id="primary-submenu">
            <a href="https://notagshop.com/collections/kcdf/products/hong-hyun-jeong-hanji-craft-studio-ramie-wind-bell" className="primary-menu-item" data-delay="0">
              <span>{t('fab.lamp')}</span>
            </a>
            <a href="https://en.pinkoi.com/store/kcdf" className="primary-menu-item" data-delay="1">
              <span>{t('fab.lighting')}</span>
            </a>
            <a href="https://mom.maison-objet.com/en/product/1728990/hong-hyun-jeong-hanji-craft-studio-ramie-wind-bell" className="primary-menu-item" data-delay="2">
              <span>{t('fab.process')}</span>
            </a>
            <a href="https://shopee.sg/-HONG-HYUN-JEONG-HANJI-CRAFT-STUDIO-Ramie-Wind-Bell-i.100487979.48701184622" className="primary-menu-item" data-delay="3">
              <span>{t('fab.explore')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button className="scroll-top-btn" id="scrollTopBtn" aria-label="맨 위로">↑</button>

      {/* Film Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Client-side effects */}
      <ClientWrapper />
    </>
  )
}

// 마스터피스 아이템 — 클릭 시 라우팅
function MasterpieceItem({
  id, img, title, description, period, featured,
}: {
  id: string
  img: string
  title: string
  description?: string
  period: string
  featured?: boolean
}) {
  function handleClick() {
    document.body.classList.remove('page-loaded')
    sessionStorage.setItem('scrollPosition', String(window.pageYOffset))
    setTimeout(() => { window.location.href = `/artwork/${id}` }, 400)
  }

  return (
    <div
      className={`masterpiece-item${featured ? ' featured' : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
      style={{ cursor: 'pointer' }}
    >
      <img src={img} alt={title} loading="lazy" />
      <div className="masterpiece-info">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <span className="artwork-details">{period}</span>
      </div>
    </div>
  )
}
