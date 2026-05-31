import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 | 홍현정한지공예 연구소',
}

// 잘못된 URL 접근 시 보여줄 브랜드 404 페이지(사이트 미감과 일치)
export default function NotFound() {
  return (
    // 다른 페이지와 동일하게 main 랜드마크 제공(스크린리더 탐색 일관성)
    <main className="artwork-not-found">
      <p className="not-found-label" aria-hidden="true">404</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/" className="back-link">← 홈으로 돌아가기</Link>
    </main>
  )
}
