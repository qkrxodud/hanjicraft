import type { Metadata, Viewport } from 'next'
import { I18nProvider } from '@/contexts/I18nContext'
import LangChangeAnnouncer from '@/components/LangChangeAnnouncer'
import './globals.css'

// 프로덕션(GitHub Pages) 절대 URL — 소셜 공유 미리보기 이미지·정규 URL 해석 기준
const SITE_URL = 'https://qkrxodud.github.io/hanjicraft'
const SITE_TITLE = '홍현정한지공예 연구소 | Hong hyun-jeong hanji craft studio'
const SITE_DESC = '천년의 결을 품은 한지로 빚어낸 오브제들을 만나보세요.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  // 정규 URL — 중복 색인 방지·랭킹 신호 통합(상세 페이지는 generateMetadata에서 자기 경로로 덮어씀)
  alternates: { canonical: `${SITE_URL}/` },
  // 카카오톡·인스타·페이스북 등에서 링크 공유 시 대표 이미지·제목이 노출되도록 OG/트위터 카드 제공
  openGraph: {
    type: 'website',
    siteName: '홍현정한지공예 연구소',
    locale: 'ko_KR',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESC,
    // 명시 크기·타입 — 카카오톡·페이스북 등이 미리보기 카드를 이미지 다운로드 전에 즉시 렌더(이미지 누락·리플로우 방지)
    images: [{ url: `${SITE_URL}/img/01.webp`, width: 2400, height: 1800, type: 'image/webp', alt: '홍현정한지공예 연구소' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: `${SITE_URL}/img/01.webp`, width: 2400, height: 1800, alt: '홍현정한지공예 연구소' }],
  },
}

// 모바일 브라우저 크롬을 크림 톤으로 맞추고 라이트 전용 렌더 명시
export const viewport: Viewport = {
  themeColor: '#F3EDE1',
  colorScheme: 'light',
}

// 검색엔진 리치 결과용 조직 구조화 데이터(정적 값 — XSS 위험 없음)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  // 다른 엔티티(WebSite.publisher 등)가 참조할 수 있도록 안정적 식별자 부여
  '@id': `${SITE_URL}/#organization`,
  name: '홍현정한지공예 연구소',
  alternateName: 'Hong Hyun-jeong Hanji Craft Studio',
  // 조직과 공식 웹사이트를 연결(검색엔진 엔티티 이해·지식 패널)
  url: `${SITE_URL}/`,
  description: '천년의 결을 품은 한지로 빚어낸 오브제들을 만나보세요.',
  email: 'hongcraftstudio@gmail.com',
  sameAs: ['https://www.instagram.com/hhj_hanj1craft'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: '부산 남구',
    postalCode: '48419',
    addressCountry: 'KR',
  },
}

// 웹사이트(WebSite) 엔티티 — 발행처를 위 Organization과 @id로 연결해 검색엔진의 엔티티 그래프를 형성
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: '홍현정한지공예 연구소',
  alternateName: 'Hong Hyun-jeong Hanji Craft Studio',
  description: SITE_DESC,
  // 기본 렌더·정규 URL 기준 언어(EN/FR는 클라이언트 i18n)
  inLanguage: 'ko',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@200;300;400&family=Roboto:wght@300;400&family=Noto+Serif+KR:wght@300;400&family=Noto+Sans+KR:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23F5F0E8'/><text y='.9em' font-size='80' x='50%25' text-anchor='middle' fill='%23B8975A' font-family='serif'>紙</text></svg>"
        />
        {/* JS 비활성 시 본문이 빈 화면으로 남지 않도록 폴백.
            body 노출 + 프리로더 제거에 더해, 스크롤 reveal(IntersectionObserver)·지연 이미지(img-loaded)처럼
            opacity:0으로 시작해 JS로 노출되는 콘텐츠/이미지를 즉시 표시한다(미설정 시 JS-off 화면이 사실상 빈 페이지).
            라이트박스·드롭다운·FAB 서브메뉴 등 'JS로 여는' 요소는 제외해 닫힌 상태가 유지되게 한다. */}
        <noscript>
          <style>{`body{opacity:1 !important}#page-loader{display:none !important}.reveal,.editorial-reveal,.detail-reveal,.title-reveal h1,.meta-item,.detail-image-gallery,.detail-info,.related-item,.related-artworks .section-title,.slide-content .hero-btn,.slide:first-child{opacity:1 !important;transform:none !important;clip-path:none !important}img[loading="lazy"]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body>
        <I18nProvider>
          <LangChangeAnnouncer />
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
