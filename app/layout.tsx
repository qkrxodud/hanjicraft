import type { Metadata, Viewport } from 'next'
import { I18nProvider } from '@/contexts/I18nContext'
import './globals.css'

export const metadata: Metadata = {
  title: '홍현정한지공예 연구소 | Hong hyun-jeong hanji craft studio',
  description: '천년의 결을 품은 한지로 빚어낸 오브제들을 만나보세요.',
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
  name: '홍현정한지공예 연구소',
  alternateName: 'Hong Hyun-jeong Hanji Craft Studio',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
