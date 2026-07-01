import type { MetadataRoute } from 'next'

// output: 'export'(정적 export)에서 메타데이터 라우트를 정적 생성하려면 명시 필요
export const dynamic = 'force-static'

// 프로덕션(GitHub Pages) 절대 URL — basePath(/hanjicraft) 포함, trailingSlash 설정과 일치
const SITE_URL = 'https://qkrxodud.github.io/hanjicraft'

// 작품 상세 경로 목록 — generateStaticParams와 동일하게 유지
const ARTWORK_IDS = [
  'lamp', 'takja', 'process', 'neak_circle', 'circle_ham', 'circle_pum',
  'gallery01', 'gallery03', 'gallery09', 'gallery10', 'gallery11', 'gallery12',
  'gallery13', 'circle', 'multi', 'three_circle',
]

// 정적 사이트맵 — 검색엔진이 홈·전체 작품 페이지를 빠짐없이 발견하도록 제공
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    ...ARTWORK_IDS.map((id) => ({
      url: `${SITE_URL}/artwork/${id}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
