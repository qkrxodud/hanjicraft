import type { Metadata } from 'next'
import NotFoundContent from '@/components/NotFoundContent'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 | 홍현정한지공예 연구소',
  // 레이아웃이 기본으로 거는 홈 마케팅 설명 대신 404 고유 설명으로 교체
  description: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
  // 레이아웃이 기본으로 거는 홈 canonical/OG를 404에서는 제거 —
  // noindex 에러 페이지가 홈을 정규 URL로 주장하거나(canonical) 공유 시 홈처럼 표현되지(OG) 않도록
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
}

// 잘못된 URL 접근 시 보여줄 브랜드 404 페이지(사이트 미감과 일치) — 본문은 현재 언어로 지역화
export default function NotFound() {
  return <NotFoundContent />
}
