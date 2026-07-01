// 서버 컴포넌트 — generateStaticParams/generateMetadata를 export하고 클라이언트 컴포넌트를 렌더링
import type { Metadata } from 'next'
import ArtworkDetailClient from '@/components/ArtworkDetailClient'
import { artworkData } from '@/lib/artworkData'
import { BASE_PATH } from '@/lib/config'

export function generateStaticParams() {
  return [
    'lamp', 'takja', 'process', 'neak_circle', 'circle_ham', 'circle_pum',
    'gallery01', 'gallery03', 'gallery09', 'gallery10', 'gallery11', 'gallery12',
    'gallery13', 'circle', 'multi', 'three_circle',
  ].map((id) => ({ id }))
}

// 프로덕션(GitHub Pages) 절대 URL — 소셜 공유 미리보기 이미지의 기준 도메인
const SITE_URL = 'https://qkrxodud.github.io/hanjicraft'

// 작품별 고유 메타데이터(탭·북마크·소셜 공유에서 작품명 구분)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const entry = artworkData[id]
  const ko = entry?.ko
  if (!ko) {
    return { title: '홍현정한지공예 연구소 | Hong hyun-jeong hanji craft studio' }
  }
  const description = ko.description.replace(/\s+/g, ' ').trim().slice(0, 150)
  const title = `${ko.title} | 홍현정한지공예 연구소`
  // 작품 자체가 콘텐츠인 비주얼 브랜드 — 공유 시 해당 작품 이미지가 미리보기로 노출되도록 첫 이미지를 OG 이미지로 사용
  const firstImg = entry?.images?.[0] ?? entry?.image
  const ogImage = `${SITE_URL}${firstImg ?? '/img/01.webp'}`
  return {
    title,
    description,
    // 정규 URL — 작품별 자기 경로로 지정(레이아웃의 홈 canonical을 덮어씀)
    alternates: { canonical: `${SITE_URL}/artwork/${id}/` },
    openGraph: {
      type: 'article',
      siteName: '홍현정한지공예 연구소',
      locale: 'ko_KR',
      url: `${SITE_URL}/artwork/${id}/`,
      title,
      description,
      images: [{ url: ogImage, alt: ko.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogImage, alt: ko.title }],
    },
  }
}

export default async function ArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const entry = artworkData[id]
  const ko = entry?.ko
  const images = entry?.images ?? (entry?.image ? [entry.image] : [])
  // 작품별 구조화 데이터(검색 리치 결과) — root-relative 이미지 경로는 도메인 무관 해석
  const artworkSchema = ko
    ? {
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        name: ko.title,
        description: ko.description.replace(/\s+/g, ' ').trim(),
        image: images.map((img) => `${BASE_PATH}${img}`),
        artMedium: '한지(Hanji)',
        creator: { '@type': 'Organization', name: '홍현정한지공예 연구소' },
        // 작품 엔티티의 정규 페이지 URL과 콘텐츠 언어를 명시(검색엔진 엔티티-페이지 연결·언어 타겟팅)
        url: `${SITE_URL}/artwork/${id}/`,
        inLanguage: 'ko',
      }
    : null
  // 사이트 내 위치(홈 › 갤러리 › 작품) — 검색 결과에 경로(빵부스러기) 리치 결과 노출용
  const breadcrumbSchema = ko
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '갤러리', item: `${SITE_URL}/#gallery` },
          { '@type': 'ListItem', position: 3, name: ko.title, item: `${SITE_URL}/artwork/${id}/` },
        ],
      }
    : null
  return (
    <>
      {artworkSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(artworkSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ArtworkDetailClient />
    </>
  )
}
