'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ClientWrapper from '@/components/ClientWrapper'
import PopupNaver from '@/components/PopupNaver'
import { BASE_PATH, SHOW_COLLABORATION, SHOW_NAVER_POPUP } from '@/lib/config'

// 마키 스트립 텍스트 — 순수 장식(브랜드 키워드 반복)
const MARQUEE = '한지공예 · HANJI CRAFT · 홍현정한지공예연구소 · TRADITION · CRAFTSMANSHIP · 천년의 기술 · MAISON OBJET · KOREAN HERITAGE · '

// 지표 스트립 — 수치는 언어 공통이라 여기 두고, 단위·설명만 번역 키에서 가져온다
const STATS = [
  { value: '20', unitKey: 'hero.stat.years.unit', labelKey: 'hero.stat.years.label' },
  { value: '100', unitKey: 'hero.stat.artworks.unit', labelKey: 'hero.stat.artworks.label' },
  { value: '12', unitKey: 'hero.stat.exhibitions.unit', labelKey: 'hero.stat.exhibitions.label' },
]

// 메종 오브제 출품작
// w/h는 원본 픽셀 크기 — 모바일에서는 작품을 자르지 않고 원본 비율 그대로 보여주므로,
// 브라우저가 로드 전에 자리를 잡을 수 있도록 실측값을 함께 넘긴다(지연 로딩 레이아웃 이동 방지)
const HIGHLIGHTS = [
  { href: '/artwork/gallery01', img: 'gallery/01.webp', key: 'exhibition', w: 2400, h: 1800 },
  { href: '/artwork/lamp', img: 'gallery/02.webp', key: 'collection', w: 992, h: 1468 },
  { href: '/artwork/circle', img: 'circle.webp', key: 'workshop', w: 3993, h: 2911 },
]

// 제작 과정 — 옛 서책의 장(章) 번호처럼 한자 숫자로 순서를 매긴다(장식·aria-hidden)
const PROCESS = [
  { no: '一', key: 'modern', img: 'makeing/08.webp' },
  { no: '二', key: 'techniques', img: 'makeing/03.webp' },
  { no: '三', key: 'forming', img: 'makeing/07.webp' },
  { no: '四', key: 'materials', img: 'makeing/02.webp' },
  { no: '五', key: 'tools', img: 'makeing/01.webp' },
  { no: '六', key: 'beating', img: 'makeing/06.webp' },
  { no: '七', key: 'preparation', img: 'makeing/04.webp' },
  { no: '八', key: 'soaking', img: 'makeing/05.webp' },
]

// 갤러리 — 디자인 시안의 IMAGE 슬롯에 기존 작품 이미지를 채운다
const GALLERY = [
  { id: 'gallery09', img: '09.webp', key: 'lamp', w: 2988, h: 2988 },
  { id: 'takja', img: 'gallery/takja.webp', key: 'vessels', w: 5184, h: 3456 },
  { id: 'process', img: 'gallery/about.webp', key: 'daily', w: 2274, h: 1474 },
  { id: 'gallery13', img: 'gallery/13.webp', key: 'art', w: 5184, h: 3456 },
  { id: 'gallery11', img: 'gallery/11.webp', key: 'architecture', w: 4897, h: 3481 },
  { id: 'gallery12', img: 'gallery/12.webp', key: 'drawer', w: 846, h: 426 },
  { id: 'multi', img: 'gallery/multi.webp', key: 'multi', w: 2080, h: 1420 },
  { id: 'three_circle', img: 'gallery/3_circle.webp', key: 'jiseung', w: 1869, h: 2325 },
  { id: 'gallery10', img: 'gallery/10.webp', key: 'empress', w: 2304, h: 3456 },
]

// 한지 지승 공예 — 에디토리얼 로우
const JISEUNG = [
  { no: '一', key: 'lamp', href: '/artwork/neak_circle', img: 'gallery/light_circle.webp', w: 3000, h: 4000 },
  { no: '二', key: 'armor', href: '/artwork/circle_ham', img: 'gallery/blue_circle.webp', w: 1954, h: 2299 },
  { no: '三', key: 'craftsman', href: '/artwork/circle_pum', img: 'two_circle.webp', w: 3000, h: 4000 },
]

// 판매 채널 — 푸터 SHOP 칼럼
const SHOP_LINKS = [
  { key: 'shop.notag', href: 'https://notagshop.com/collections/kcdf/products/hong-hyun-jeong-hanji-craft-studio-ramie-wind-bell' },
  { key: 'shop.pinkoi', href: 'https://en.pinkoi.com/store/kcdf' },
  { key: 'shop.maison', href: 'https://mom.maison-objet.com/en/product/1728990/hong-hyun-jeong-hanji-craft-studio-ramie-wind-bell' },
  { key: 'shop.shopee', href: 'https://shopee.sg/-HONG-HYUN-JEONG-HANJI-CRAFT-STUDIO-Ramie-Wind-Bell-i.100487979.48701184622' },
]

export default function Home() {
  const { t, lang } = useI18n()

  // 탭 제목을 현재 언어의 브랜드명으로 동기화 — 페이지 로고는 현지화 브랜드를 표시하는데
  // 정적 메타데이터 제목(빌드 시점·이중언어)은 그대로라 EN/FR 탭만 한국어 브랜드로 어긋나던 문제 해결.
  useEffect(() => {
    document.title = `${t('logo.title')} | ${t('logo.subtitle')}`
  }, [t])

  // 외부 링크는 새 탭으로 열리므로 그 사실을 현재 언어로 스크린리더에 안내한다(G201).
  const newWindowHint: Record<string, string> = {
    ko: '새 창에서 열림',
    en: 'opens in new window',
    fr: 'ouvre dans un nouvel onglet',
  }
  const extLabel = (label: string) => `${label}, ${newWindowHint[lang] ?? newWindowHint.ko}`
  // 아이콘 전용(↑) 스크롤탑 버튼의 접근명도 현재 언어로(SR 사용자에겐 이 라벨이 유일한 단서)
  const backToTopLabel: Record<string, string> = { ko: '맨 위로', en: 'Back to top', fr: 'Haut de page' }

  const img = (path: string) => `${BASE_PATH}/img/${path}`

  return (
    <>
      {/* 본문 바로가기 — 키보드/스크린리더 사용자가 내비를 건너뛰도록 */}
      <a href="#main-content" className="skip-link">{t('a11y.skipToContent')}</a>

      <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        {/* ===== 지표 스트립 ===== */}
        <section className="stat-strip" aria-label={t('brand.title')}>
          <div className="shell">
            <div className="stat-grid">
              {STATS.map(({ value, unitKey, labelKey }) => (
                <div key={labelKey} className="reveal">
                  <p className="stat-value">
                    {value}
                    <span className="stat-unit"> {t(unitKey)}</span>
                  </p>
                  <p className="stat-label">{t(labelKey)}</p>
                </div>
              ))}
              <div className="reveal">
                <p className="stat-value stat-value--text">{t('hero.stat.regions.value')}</p>
                <p className="stat-label">{t('hero.stat.regions.label')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 마키 — 순수 장식, 스크린리더에서 제외 ===== */}
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-track">
            <span>{MARQUEE}</span>
            <span>{MARQUEE}</span>
          </div>
        </div>

        {/* ===== 루이비통 추석 협업 소식 — SHOW_COLLABORATION으로 노출 제어 ===== */}
        {SHOW_COLLABORATION && (
          <section id="collaboration" className="section">
            <div className="shell">
              <div className="collab-head">
                <div>
                  <span className="eyebrow" aria-hidden="true">Collaboration</span>
                  <h2 className="section-heading">{t('collab.title')}</h2>
                </div>
                <span className="collab-date">{t('collab.date')}</span>
              </div>

              <div className="collab-grid">
                <div className="collab-text reveal">
                  <p className="collab-partners">{t('collab.partners')}</p>
                  <h3 className="collab-headline">{t('collab.headline')}</h3>
                  <p className="collab-body">{t('collab.body')}</p>
                  <p className="collab-note">{t('collab.note')}</p>
                  <div className="contact-actions">
                    <Link href="/artwork/circle" className="pill pill--solid">{t('collab.cta.artwork')}</Link>
                    <a href="#gallery" className="pill pill--ghost">{t('collab.cta.gallery')}</a>
                  </div>
                </div>

                <figure className="collab-figure reveal">
                  {/* 화보 속 작품 위치가 본문만으로는 전달되지 않으므로 정보성 alt를 제공 */}
                  <img
                    src={img('collab-chuseok-2026.jpg')}
                    alt={t('collab.imageAlt')}
                    width={1280}
                    height={1600}
                    loading="lazy"
                  />
                  <figcaption>{t('collab.caption')}</figcaption>
                </figure>
              </div>
            </div>
          </section>
        )}

        {/* ===== 브랜드 소개 ===== */}
        <section id="brand" className="section">
          <div className="shell">
            <div className="brand-intro">
              <div className="reveal">
                <span className="eyebrow" aria-hidden="true">Brand</span>
                <h2 className="section-heading">{t('brand.title')}</h2>
                <p className="section-lead">{t('brand.tagline')}</p>
              </div>
              <div className="brand-body reveal">
                {t('brand.subtitle').split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="brand-cards">
              {(['mission', 'vision'] as const).map((key) => (
                <div key={key} className="brand-card reveal">
                  <h3>{t(`brand.${key}.title`)}</h3>
                  <p>{t(`brand.${key}.description`)}</p>
                </div>
              ))}
            </div>

            <p className="eyebrow values-label">
              <span aria-hidden="true">Core Values · </span>{t('brand.values.title')}
            </p>
            <div className="values-grid">
              {[
                { icon: '傳', key: 'tradition' },
                { icon: '革', key: 'innovation' },
                { icon: '自', key: 'sustainability' },
                { icon: '匠', key: 'craftsmanship' },
              ].map(({ icon, key }) => (
                <div key={key} className="value-card reveal">
                  {/* 장식용 한자 심볼 — 인접 h4 제목이 의미를 전달하므로 스크린리더에서 제외 */}
                  <span className="value-icon" aria-hidden="true">{icon}</span>
                  <h4>{t(`brand.values.${key}.title`)}</h4>
                  <p>{t(`brand.values.${key}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 메종 오브제 출품작 ===== */}
        <section id="highlights" className="section section--alt">
          <div className="shell">
            <span className="eyebrow" aria-hidden="true">Exhibition</span>
            <h2 className="section-heading">{t('highlights.title')}</h2>
            <div className="card-grid">
              {HIGHLIGHTS.map(({ href, img: src, key, w, h }) => (
                <Link key={key} href={href} className="work-card reveal">
                  <div className="work-card-media">
                    {/* 인접 h3 제목이 의미를 전달하므로 이미지는 장식 처리(링크 이름 중복 낭독 방지) */}
                    <img src={img(src)} alt="" loading="lazy" width={w} height={h} />
                  </div>
                  <div className="work-card-body">
                    <p className="work-card-kicker">{t(`highlights.${key}.category`)}</p>
                    <h3>{t(`highlights.${key}.title`)}</h3>
                    <p>{t(`highlights.${key}.description`)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 제작 과정 ===== */}
        <section id="collections" className="section">
          <div className="shell">
            <span className="eyebrow" aria-hidden="true">Collection</span>
            <h2 className="section-heading">{t('collection.title')}</h2>
            <div className="process-grid">
              {PROCESS.map(({ no, key, img: src }) => (
                <div key={no} className="process-item reveal">
                  <div className="process-media">
                    <img src={img(src)} alt="" loading="lazy" />
                    <span className="process-no" aria-hidden="true">{no}</span>
                  </div>
                  <div>
                    <h3>{t(`collection.${key}.title`)}</h3>
                    <p>{t(`collection.${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 갤러리 ===== */}
        <section id="gallery" className="section section--alt">
          <div className="shell">
            <span className="eyebrow" aria-hidden="true">Gallery</span>
            <h2 className="section-heading">{t('masterpieces.title')}</h2>
            <div className="gallery-grid">
              {GALLERY.map(({ id, img: src, key, w, h }) => (
                <Link key={id} href={`/artwork/${id}`} className="gallery-item reveal">
                  <div className="gallery-media">
                    <img src={img(src)} alt="" loading="lazy" width={w} height={h} />
                  </div>
                  <div>
                    <h3>{t(`masterpieces.${key}.title`)}</h3>
                    <p>{t(`masterpieces.${key}.period`)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 철학 인용 ===== */}
        <section className="quote-section">
          <div className="shell">
            {/* 장식 심볼 — 인용구가 주제를 전달하므로 접근성 트리에서 제외 */}
            <span className="quote-mark" aria-hidden="true">紙</span>
            <blockquote className="reveal">{t('philosophy.quote')}</blockquote>
          </div>
        </section>

        {/* ===== 한지 지승 공예 ===== */}
        <section id="about" className="section" style={{ paddingTop: 0 }}>
          <div className="shell">
            <span className="eyebrow" aria-hidden="true">Artworks</span>
            <h2 className="section-heading">{t('featured.title')}</h2>
            <div className="editorial-rows">
              {JISEUNG.map(({ no, key, href, img: src, w, h }) => (
                <div key={key} className="editorial-row reveal">
                  <div className="editorial-media">
                    <img src={img(src)} alt="" loading="lazy" width={w} height={h} />
                  </div>
                  <div className="editorial-text">
                    <p className="editorial-no" aria-hidden="true">{no}</p>
                    <h3>{t(`featured.${key}.title`)}</h3>
                    <p className="editorial-lead">{t(`featured.${key}.period`)}</p>
                    <p className="editorial-desc">{t(`featured.${key}.description`)}</p>
                    <Link
                      href={href}
                      className="link-underline"
                      aria-label={`${t(`featured.${key}.title`)}, ${t(`featured.${key}.link`)}`}
                    >
                      {t(`featured.${key}.link`)} <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 입점 문의 ===== */}
        <section id="inquiry" className="contact-section">
          <div className="shell">
            <div className="contact-grid">
              <div>
                <span className="eyebrow" aria-hidden="true">Partnership</span>
                <h2>{t('inquiry.title')}</h2>
              </div>
              <div>
                <p className="contact-lead">{t('inquiry.description')}</p>
                <div className="contact-actions">
                  {/* 메일 제목을 문의 맥락으로 미리 채워 사용자 편의·브랜드 분류를 돕는다(현재 언어로) */}
                  <a
                    href={`mailto:hongcraftstudio@gmail.com?subject=${encodeURIComponent(t('inquiry.title'))}`}
                    className="pill pill--light"
                  >
                    {t('inquiry.button.contact')}
                  </a>
                  <a
                    href="https://www.instagram.com/hhj_hanj1craft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill--outline-light"
                    aria-label={extLabel(t('inquiry.button.instagram'))}
                  >
                    {t('inquiry.button.instagram')}<span className="ext-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== 푸터 ===== */}
      <footer className="site-footer footer">
        <div className="shell">
          <div className="footer-grid">
            <div>
              <h3>
                {t('logo.title')}
                {/* 낙관 — 서화 말미에 찍는 인장. 브랜드명이 의미를 전달하므로 장식 처리 */}
                <span className="brand-seal" aria-hidden="true">紙</span>
              </h3>
              <p className="footer-romanized">Hong hyun-jeong hanji craft studio</p>
            </div>
            {/* 조직 연락처(물리 주소+이메일)는 시맨틱상 address 요소가 표준 */}
            <address className="footer-info">
              <p>{t('footer.contact.address')}</p>
              <p><a href="mailto:hongcraftstudio@gmail.com">{t('footer.contact.emailAddress')}</a></p>
              <p>
                <a
                  href="https://www.instagram.com/hhj_hanj1craft"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={extLabel(t('footer.social.instagram'))}
                >
                  {t('footer.social.instagram')}<span className="ext-arrow" aria-hidden="true">↗</span>
                </a>
              </p>
            </address>
            <div>
              <p className="footer-col-label" aria-hidden="true">Shop</p>
              <div className="footer-links">
                {SHOP_LINKS.map(({ key, href }) => (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={extLabel(t(key))}>
                    {t(key)}<span className="ext-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 정적 export는 빌드 시점 연도로 프리렌더되고 클라이언트는 현재 연도로 갱신 */}
        <p className="footer-bottom" suppressHydrationWarning>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </footer>

      <button type="button" className="scroll-top-btn" id="scrollTopBtn" aria-label={backToTopLabel[lang] ?? backToTopLabel.ko}>↑</button>

      <ClientWrapper />

      {/* NAVER 팝업스토어 모달 — SHOW_NAVER_POPUP으로 노출 제어 */}
      {SHOW_NAVER_POPUP && <PopupNaver />}
    </>
  )
}
