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

// 작품별 고유 메타데이터(탭·북마크·소셜 공유에서 작품명 구분)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const ko = artworkData[id]?.ko
  if (!ko) {
    return { title: '홍현정한지공예 연구소 | Hong hyun-jeong hanji craft studio' }
  }
  const description = ko.description.replace(/\s+/g, ' ').trim().slice(0, 150)
  const title = `${ko.title} | 홍현정한지공예 연구소`
  return {
    title,
    description,
    openGraph: { title, description },
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
      <ArtworkDetailClient />
    </>
  )
}
