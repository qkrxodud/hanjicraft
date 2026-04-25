// 서버 컴포넌트 — generateStaticParams를 export하고 클라이언트 컴포넌트를 렌더링
import ArtworkDetailClient from '@/components/ArtworkDetailClient'

export function generateStaticParams() {
  return [
    'lamp', 'takja', 'process', 'neak_circle', 'circle_ham', 'circle_pum',
    'gallery01', 'gallery03', 'gallery09', 'gallery10', 'gallery11', 'gallery12',
    'gallery13', 'circle', 'multi', 'three_circle',
  ].map((id) => ({ id }))
}

export default function ArtworkPage() {
  return <ArtworkDetailClient />
}
