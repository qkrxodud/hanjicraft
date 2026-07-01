'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'

// 404 본문 — 사이트 유일의 미지역화 페이지였으므로 현재 언어로 표시(lib/translations 수정 불가로 인라인 맵 사용)
const TEXT: Record<Lang, { title: string; desc: string; back: string }> = {
  ko: {
    title: '페이지를 찾을 수 없습니다',
    desc: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
    back: '← 홈으로 돌아가기',
  },
  en: {
    title: 'Page not found',
    desc: "The page you requested doesn't exist or has been moved.",
    back: '← Back to home',
  },
  fr: {
    title: 'Page introuvable',
    desc: "La page demandée n'existe pas ou a été déplacée.",
    back: "← Retour à l'accueil",
  },
}

export default function NotFoundContent() {
  const { lang, t: tr } = useI18n()
  const t = TEXT[lang] ?? TEXT.ko
  // 정적 메타데이터 탭 제목은 한국어 고정이므로, 본문·브랜드명까지 같은 언어로 탭 제목을 동기화(홈·상세와 동일 패턴).
  // 브랜드 접미사도 tr('logo.title')로 현지화 — EN/FR 404 탭만 한국어 브랜드로 어긋나지 않도록
  useEffect(() => {
    document.title = `${t.title} | ${tr('logo.title')}`
  }, [t.title, tr])
  return (
    // 다른 페이지와 동일하게 main 랜드마크 제공(스크린리더 탐색 일관성)
    <main className="artwork-not-found">
      <p className="not-found-label" aria-hidden="true">404</p>
      <h1>{t.title}</h1>
      <p>{t.desc}</p>
      <Link href="/" className="back-link">{t.back}</Link>
    </main>
  )
}
