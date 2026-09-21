'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import Nav from '@/components/Nav'
import ClientWrapper from '@/components/ClientWrapper'
import PopupNaver from '@/components/PopupNaver'
import { BASE_PATH, SHOW_COLLABORATION, SHOW_NAVER_POPUP } from '@/lib/config'

export default function Home() {
  const { t, lang } = useI18n()
  // 탭 제목을 현재 언어의 브랜드명으로 동기화 — 페이지 로고는 현지화 브랜드를 표시하는데
  // 정적 메타데이터 제목(빌드 시점·이중언어)은 그대로라 EN/FR 탭만 한국어 브랜드로 어긋나던 문제 해결.
  // ko에서는 결과가 정적 제목과 동일해 SEO·크롤러(JS 미실행)에는 영향이 없다.
  useEffect(() => {
    document.title = `${t('logo.title')} | ${t('logo.subtitle')}`
  }, [t])
  // 외부 링크는 새 탭으로 열리므로 그 사실을 현재 언어로 스크린리더에 안내한다(G201).
  // 보이는 ↗ 화살표는 aria-hidden이라 비시각 사용자에게는 전달되지 않으며, 보이는 라벨을 포함해 2.5.3(Label in Name)도 충족.
  const newWindowHint: Record<string, string> = {
    ko: '새 창에서 열림',
    en: 'opens in new window',
    fr: 'ouvre dans un nouvel onglet',
  }
  const extLabel = (label: string) => `${label}, ${newWindowHint[lang] ?? newWindowHint.ko}`
  // 히어로 슬라이더 컨트롤 라벨도 현재 언어로 제공(EN/FR 사용자가 한국어 라벨을 듣지 않도록)
  const heroNav: Record<string, { prev: string; next: string; slide: (n: number) => string }> = {
    ko: { prev: '이전 슬라이드', next: '다음 슬라이드', slide: (n) => `슬라이드 ${n}` },
    en: { prev: 'Previous slide', next: 'Next slide', slide: (n) => `Slide ${n}` },
    fr: { prev: 'Diapositive précédente', next: 'Diapositive suivante', slide: (n) => `Diapositive ${n}` },
  }
  const hnav = heroNav[lang] ?? heroNav.ko
  // 아이콘 전용(↑) 스크롤탑 버튼의 접근명도 현재 언어로(SR 사용자에겐 이 라벨이 유일한 단서)
  const backToTopLabel: Record<string, string> = { ko: '맨 위로', en: 'Back to top', fr: 'Haut de page' }

  return (
    <>
      {/* 본문 바로가기 — 키보드/스크린리더 사용자가 내비를 건너뛰도록 */}
      <a href="#main-content" className="skip-link">{t('a11y.skipToContent')}</a>

      {/* Page Preloader */}
      <div id="page-loader" aria-hidden="true">
        <div className="loader-inner">
          <span className="loader-symbol">紙</span>
          <span className="loader-line"></span>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

      {/* Navigation */}
      <Nav />

      {/* 메인 콘텐츠 랜드마크 — skip-link 포커스 타깃 */}
      <main id="main-content" tabIndex={-1}>
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-container">
          <div className="hero-slider">
            <div className="slide active">
              {/* 슬라이드 텍스트(h2/부제/CTA)가 의미를 전달하는 배경 이미지 — 장식 처리(비현지화 영문 alt 제거) */}
              <img src={`${BASE_PATH}/img/01.webp`} alt="" loading="eager" fetchPriority="high" />
              <div className="slide-content">
                <h2>{t('hero.title')}</h2>
                <p>{t('hero.description')}</p>
                <Link href="/artwork/lamp" className="hero-btn">{t('hero.button')}</Link>
              </div>
            </div>
            <div className="slide">
              {/* 비가시 슬라이드 — LCP(슬라이드1)·임계 리소스 뒤로 우선순위 낮춤 */}
              <img src={`${BASE_PATH}/img/02.webp`} alt="" fetchPriority="low" />
              <div className="slide-content">
                <h2>{t('hero.slide2.title')}</h2>
                <p>{t('hero.slide2.description')}</p>
                <Link href="/artwork/circle" className="hero-btn">{t('hero.button')}</Link>
              </div>
            </div>
            <div className="slide">
              {/* 비가시 슬라이드 — LCP·임계 리소스 뒤로 우선순위 낮춤 */}
              <img src={`${BASE_PATH}/img/08.webp`} alt="" fetchPriority="low" />
              <div className="slide-content">
                <h2>{t('hero.slide3.title')}</h2>
                <p>{t('hero.slide3.description')}</p>
                <Link href="/artwork/gallery01" className="hero-btn">{t('hero.button')}</Link>
              </div>
            </div>
          </div>
          <button type="button" className="hero-arrow prev" id="heroPrev" aria-label={hnav.prev}>‹</button>
          <button type="button" className="hero-arrow next" id="heroNext" aria-label={hnav.next}>›</button>
          <div className="hero-scroll-hint" aria-hidden="true">
            <span className="scroll-hint-line"></span>
          </div>
          <div className="hero-indicators">
            <button type="button" className="hero-indicator active" data-index="0" aria-label={hnav.slide(1)} aria-current="true"></button>
            <button type="button" className="hero-indicator" data-index="1" aria-label={hnav.slide(2)}></button>
            <button type="button" className="hero-indicator" data-index="2" aria-label={hnav.slide(3)}></button>
          </div>
        </div>
      </section>

      {/* Hero Stats */}
      <div className="hero-stats">
        {/* 카운트업 전(스크롤 전)·무JS 상태에서 숫자가 "0"으로 노출되어 스크린리더가 사실과 반대로 읽으므로, 최종값을 aria-label로 안정 제공 */}
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="1000" aria-label="1,000">0</span>
          <span className="hero-stat-label">{t('hero.stat.years')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="100" aria-label="100">0</span>
          <span className="hero-stat-label">{t('hero.stat.artworks')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="10" aria-label="10">0</span>
          <span className="hero-stat-label">{t('hero.stat.exhibitions')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number" data-count="4" aria-label="4">0</span>
          <span className="hero-stat-label">{t('hero.stat.countries')}</span>
        </div>
      </div>

      {/* Marquee Strip — 순수 장식(중복 키워드), 스크린리더에서 제외 */}
      <div className="marquee-strip" aria-hidden="true">
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

      {/* Collaboration Section — 루이비통 2026 추석 기프트 캠페인 협업 소식 (SHOW_COLLABORATION으로 노출 제어) */}
      {SHOW_COLLABORATION && (
      <section id="collaboration" className="collab-section">
        <div className="container">
          <div className="collab-header">
            {/* .section-title을 재사용해 ClientWrapper의 스크롤 리빌·타이포 스케일을 그대로 상속(정렬만 좌측으로 재정의) */}
            <h2 className="section-title collab-title">
              <span className="section-label" aria-hidden="true">COLLABORATION</span>
              {t('collab.title')}
            </h2>
            <span className="collab-date">{t('collab.date')}</span>
          </div>

          <div className="collab-grid">
            <div className="collab-text">
              <p className="collab-partners">{t('collab.partners')}</p>
              <h3 className="collab-headline">{t('collab.headline')}</h3>
              <p className="collab-body">{t('collab.body')}</p>
              <p className="collab-note">{t('collab.note')}</p>
              <div className="collab-cta-group">
                {/* 기존 인콰이어리 버튼 스타일 재사용 — 사이트 전역 CTA 일관성 유지 */}
                <Link href="/artwork/circle" className="inquiry-btn primary">{t('collab.cta.artwork')}</Link>
                <a href="#gallery" className="inquiry-btn secondary">{t('collab.cta.gallery')}</a>
              </div>
            </div>

            <figure className="collab-figure">
              <div className="collab-image-wrap">
                {/* 화보 속 작품 위치가 본문만으로는 전달되지 않으므로 정보성 alt를 제공 */}
                <img
                  src={`${BASE_PATH}/img/collab-chuseok-2026.jpg`}
                  alt={t('collab.imageAlt')}
                  width={1280}
                  height={1600}
                  loading="lazy"
                />
                {/* 작품 위치 마커·리더 라인 — 순수 시각 보조(같은 내용을 collab.note가 텍스트로 전달) */}
                <span className="collab-marker" aria-hidden="true"></span>
                <span className="collab-marker-label" aria-hidden="true">
                  <span className="collab-marker-line"></span>
                  {t('collab.marker')}
                </span>
              </div>
              <figcaption className="collab-caption">{t('collab.caption')}</figcaption>
            </figure>
          </div>
        </div>
      </section>
      )}

      {/* Brand Section */}
      <section id="brand" className="brand-section">
        <div className="container">
          <div className="brand-header">
            <h2 className="section-title">
              <span className="section-label" aria-hidden="true">BRAND</span>
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
                    {/* 장식용 한자 심볼 — 인접 h4 제목이 의미를 전달하므로 스크린리더에서 제외(고립 한자 낭독 방지) */}
                    <div className="value-icon" aria-hidden="true">{icon}</div>
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
            <span className="section-label" aria-hidden="true">EXHIBITION</span>
            {t('highlights.title')}
          </h2>
          <div className="highlights-grid">
            <div className="highlight-card featured">
              {/* 이미지도 클릭해 상세로 이동(큰 시각 영역 클릭 기대). 키보드/SR은 아래 '자세히 보기' 링크 사용 → aria-hidden+tabIndex=-1로 중복 방지 */}
              <Link href="/artwork/gallery01" className="card-image-link" aria-hidden="true" tabIndex={-1}>
                <img src={`${BASE_PATH}/img/gallery/01.webp`} alt="" loading="lazy" />
              </Link>
              <div className="card-content">
                <span className="card-category">{t('highlights.exhibition.category')}</span>
                <h3>{t('highlights.exhibition.title')}</h3>
                <p>{t('highlights.exhibition.description')}</p>
                <Link href="/artwork/gallery01" className="card-link" aria-label={`${t('highlights.exhibition.title')}, ${t('highlights.exhibition.link')}`}>{t('highlights.exhibition.link')}</Link>
              </div>
            </div>
            <div className="highlight-card">
              <Link href="/artwork/lamp" className="card-image-link" aria-hidden="true" tabIndex={-1}>
                <img src={`${BASE_PATH}/img/gallery/02.webp`} alt="" loading="lazy" />
              </Link>
              <div className="card-content">
                <span className="card-category">{t('highlights.collection.category')}</span>
                <h3>{t('highlights.collection.title')}</h3>
                <p>{t('highlights.collection.description')}</p>
                <Link href="/artwork/lamp" className="card-link" aria-label={`${t('highlights.collection.title')}, ${t('highlights.collection.link')}`}>{t('highlights.collection.link')}</Link>
              </div>
            </div>
            <div className="highlight-card">
              <Link href="/artwork/circle" className="card-image-link" aria-hidden="true" tabIndex={-1}>
                <img src={`${BASE_PATH}/img/circle.webp`} alt="" loading="lazy" />
              </Link>
              <div className="card-content">
                <span className="card-category">{t('highlights.workshop.category')}</span>
                <h3>{t('highlights.workshop.title')}</h3>
                <p>{t('highlights.workshop.description')}</p>
                <Link href="/artwork/circle" className="card-link" aria-label={`${t('highlights.workshop.title')}, ${t('highlights.workshop.link')}`}>{t('highlights.workshop.link')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collections" className="collection-delve">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label" aria-hidden="true">COLLECTION</span>
            {t('collection.title')}
          </h2>
          <div
            className="collection-grid"
            tabIndex={0}
            role="group"
            aria-label={`${t('collection.title')} — ${t('a11y.scrollHint')}`}
          >
            {[
              { key: 'modern', img: `${BASE_PATH}/img/makeing/08.webp` },
              { key: 'techniques', img: `${BASE_PATH}/img/makeing/03.webp` },
              { key: 'forming', img: `${BASE_PATH}/img/makeing/07.webp` },
              { key: 'materials', img: `${BASE_PATH}/img/makeing/02.webp` },
              { key: 'tools', img: `${BASE_PATH}/img/makeing/01.webp` },
              { key: 'beating', img: `${BASE_PATH}/img/makeing/06.webp` },
              { key: 'preparation', img: `${BASE_PATH}/img/makeing/04.webp` },
              { key: 'soaking', img: `${BASE_PATH}/img/makeing/05.webp` },
            ].map(({ key, img }, i) => (
              <div key={key} className="collection-item">
                <span className="collection-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {/* 인접 h3 제목·설명이 동일 의미를 전달하므로 이미지는 장식 처리(제목 중복 낭독 방지) */}
                <img src={img} alt="" loading="lazy" />
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
            <span className="section-label" aria-hidden="true">GALLERY</span>
            {t('masterpieces.title')}
          </h2>
        </div>
        <div className="masterpieces-grid">
          {[
            { id: 'gallery09', img: `${BASE_PATH}/img/09.webp`, titleKey: 'masterpieces.lamp.title', descKey: 'masterpieces.lamp.description', periodKey: 'masterpieces.lamp.period', featured: true },
            { id: 'takja', img: `${BASE_PATH}/img/gallery/takja.webp`, titleKey: 'masterpieces.vessels.title', periodKey: 'masterpieces.vessels.period' },
            { id: 'process', img: `${BASE_PATH}/img/gallery/about.webp`, titleKey: 'masterpieces.daily.title', periodKey: 'masterpieces.daily.period' },
            { id: 'gallery13', img: `${BASE_PATH}/img/gallery/13.webp`, titleKey: 'masterpieces.art.title', periodKey: 'masterpieces.art.period' },
            { id: 'gallery11', img: `${BASE_PATH}/img/gallery/11.webp`, titleKey: 'masterpieces.architecture.title', periodKey: 'masterpieces.architecture.period' },
            { id: 'gallery12', img: `${BASE_PATH}/img/gallery/12.webp`, titleKey: 'masterpieces.drawer.title', periodKey: 'masterpieces.drawer.period' },
            { id: 'multi', img: `${BASE_PATH}/img/gallery/multi.webp`, titleKey: 'masterpieces.multi.title', periodKey: 'masterpieces.multi.period' },
            { id: 'three_circle', img: `${BASE_PATH}/img/gallery/3_circle.webp`, titleKey: 'masterpieces.jiseung.title', periodKey: 'masterpieces.jiseung.period' },
            { id: 'gallery10', img: `${BASE_PATH}/img/gallery/10.webp`, titleKey: 'masterpieces.empress.title', periodKey: 'masterpieces.empress.period' },
          ].map(({ id, img, titleKey, descKey, periodKey, featured }) => (
            <MasterpieceItem key={id} id={id} img={img} title={t(titleKey)} description={descKey ? t(descKey) : undefined} period={t(periodKey!)} featured={!!featured} />
          ))}
        </div>
      </section>

      {/* Philosophy Strip */}
      <div className="philosophy-strip">
        <div className="philosophy-inner">
          {/* 장식 kicker(紙/PAPER) — 인용구가 주제를 전달하므로 다른 섹션 eyebrow와 동일하게 접근성 트리에서 제외 */}
          <span className="philosophy-label" aria-hidden="true">{t('philosophy.label')}</span>
          <blockquote>{t('philosophy.quote')}</blockquote>
        </div>
      </div>

      {/* Featured Artworks */}
      <section id="about" className="featured-artworks">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label" aria-hidden="true">ARTWORKS</span>
            {t('featured.title')}
          </h2>
        </div>
        <div className="editorial-rows">
          {[
            { img: `${BASE_PATH}/img/gallery/light_circle.webp`, key: 'lamp', href: '/artwork/neak_circle', index: '01' },
            { img: `${BASE_PATH}/img/gallery/blue_circle.webp`, key: 'armor', href: '/artwork/circle_ham', index: '02', reverse: true },
            { img: `${BASE_PATH}/img/two_circle.webp`, key: 'craftsman', href: '/artwork/circle_pum', index: '03' },
          ].map(({ img, key, href, index, reverse }) => (
            <div key={key} className={`editorial-row${reverse ? ' editorial-row--reverse' : ''}`}>
              <div className="editorial-image">
                {/* 이미지도 클릭해 상세로 이동(큰 시각 영역 클릭 기대 충족). 키보드/스크린리더는 아래 '자세히 보기' 링크를 쓰므로 중복 안내 방지를 위해 aria-hidden+tabIndex=-1 */}
                <Link href={href} className="editorial-image-link" aria-hidden="true" tabIndex={-1}>
                  {/* 인접 h3 제목이 동일 의미를 전달하므로 이미지는 장식 처리 */}
                  <img src={img} alt="" loading="lazy" />
                </Link>
              </div>
              <div className="editorial-text">
                <span className="editorial-index" aria-hidden="true">{index}</span>
                <h3>{t(`featured.${key}.title`)}</h3>
                <p className="artwork-period">{t(`featured.${key}.period`)}</p>
                <p className="artwork-description">{t(`featured.${key}.description`)}</p>
                <Link href={href} className="artwork-link" aria-label={`${t(`featured.${key}.title`)}, ${t(`featured.${key}.link`)}`}>{t(`featured.${key}.link`)}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Section */}
      <section id="inquiry" className="inquiry-section">
        <div className="container">
          <h2 className="section-title">
            <span className="section-label" aria-hidden="true">PARTNERSHIP</span>
            {t('inquiry.title')}
          </h2>
          <p className="inquiry-lead">{t('inquiry.description')}</p>
          <div className="inquiry-divider" aria-hidden="true"></div>
          <div className="inquiry-cta-group">
            {/* 메일 제목을 문의 맥락으로 미리 채워 사용자 편의·브랜드 분류를 돕는다(현재 언어로) */}
            <a href={`mailto:hongcraftstudio@gmail.com?subject=${encodeURIComponent(t('inquiry.title'))}`} className="inquiry-btn primary">{t('inquiry.button.contact')}</a>
            <a href="https://www.instagram.com/hhj_hanj1craft" target="_blank" rel="noopener noreferrer" className="inquiry-btn secondary" aria-label={extLabel(t('inquiry.button.instagram'))}>{t('inquiry.button.instagram')}<span className="ext-arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            {/* 푸터 로고 클릭 시 최상단으로 이동 — 상단 내비 로고(→#hero)·상세 페이지 푸터 로고(→/)와 동작 일관.
                페이지 하단에서는 스크롤탑 플로팅 버튼이 푸터와 겹쳐 숨겨지므로 최상단 복귀 어포던스를 보강한다 */}
            <a href="#hero" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
              <h3>{t('logo.title')}</h3>
              <p>{t('logo.subtitle')}</p>
            </a>
          </div>
        </div>
        <div className="container">
          <div className="footer-content">
            {/* 조직 연락처(물리 주소+이메일)는 시맨틱상 address 요소가 표준 — 스크린리더에 '연락처' 맥락 전달 */}
            <address className="footer-info">
              <p><span>{t('footer.contact.address')}</span></p>
              <p>
                <span>{t('footer.contact.email')}</span>{' '}
                <a href="mailto:hongcraftstudio@gmail.com">{t('footer.contact.emailAddress')}</a>
              </p>
            </address>
            <div className="footer-social">
              <div className="social-links">
                <a href="https://www.instagram.com/hhj_hanj1craft" target="_blank" rel="noopener noreferrer" aria-label={extLabel(t('footer.social.instagram'))}>{t('footer.social.instagram')}<span className="ext-arrow" aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            {/* 정적 export는 빌드 시점 연도로 프리렌더되고 클라이언트는 현재 연도로 갱신 — 연도 경계의 hydration 불일치 경고 억제(날짜성 콘텐츠 표준 처리) */}
            <p suppressHydrationWarning>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-primary-menu" id="primary-menu">
          <button type="button" className="bottom-nav-btn primary" id="primary-menu-btn" aria-expanded="false" aria-controls="primary-submenu">{t('fab.menu')}</button>
          <div className="primary-submenu" id="primary-submenu">
            <a href="https://notagshop.com/collections/kcdf/products/hong-hyun-jeong-hanji-craft-studio-ramie-wind-bell" className="primary-menu-item" data-delay="0" target="_blank" rel="noopener noreferrer" aria-label={extLabel(t('fab.lamp'))}>
              <span>{t('fab.lamp')}</span><span className="ext-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://en.pinkoi.com/store/kcdf" className="primary-menu-item" data-delay="1" target="_blank" rel="noopener noreferrer" aria-label={extLabel(t('fab.lighting'))}>
              <span>{t('fab.lighting')}</span><span className="ext-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://mom.maison-objet.com/en/product/1728990/hong-hyun-jeong-hanji-craft-studio-ramie-wind-bell" className="primary-menu-item" data-delay="2" target="_blank" rel="noopener noreferrer" aria-label={extLabel(t('fab.process'))}>
              <span>{t('fab.process')}</span><span className="ext-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://shopee.sg/-HONG-HYUN-JEONG-HANJI-CRAFT-STUDIO-Ramie-Wind-Bell-i.100487979.48701184622" className="primary-menu-item" data-delay="3" target="_blank" rel="noopener noreferrer" aria-label={extLabel(t('fab.explore'))}>
              <span>{t('fab.explore')}</span><span className="ext-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button type="button" className="scroll-top-btn" id="scrollTopBtn" aria-label={backToTopLabel[lang] ?? backToTopLabel.ko}>↑</button>

      {/* Film Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Client-side effects */}
      <ClientWrapper />

      {/* NAVER 팝업스토어 모달 (세션당 1회) — SHOW_NAVER_POPUP으로 노출 제어 */}
      {SHOW_NAVER_POPUP && <PopupNaver />}
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
  function handleNavigate(e: React.MouseEvent) {
    // 보조 클릭(새 탭/창)은 브라우저 기본 동작에 맡겨 링크의 이점을 유지한다
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    // 일반 좌클릭은 페이드아웃 전환을 보존하기 위해 직접 내비게이션
    e.preventDefault()
    const target = `${BASE_PATH}/artwork/${id}/`
    // 모션 최소화 선호 시 페이드아웃 지연 없이 즉시 이동(페이드가 보이지 않는데 멈춘 듯한 대기만 남는 문제 방지)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { window.location.href = target; return }
    document.body.classList.remove('page-loaded')
    setTimeout(() => { window.location.href = target }, 400)
  }

  return (
    <Link
      href={`/artwork/${id}`}
      className={`masterpiece-item${featured ? ' featured' : ''}`}
      onClick={handleNavigate}
    >
      {/* 인접 h3 제목이 동일 의미를 전달하므로 이미지는 장식 처리(링크 이름에 제목 중복 낭독 방지) */}
      <img src={img} alt="" loading="lazy" />
      <div className="masterpiece-info">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <span className="artwork-details">{period}</span>
      </div>
    </Link>
  )
}
