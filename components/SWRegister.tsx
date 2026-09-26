'use client'

import { useEffect } from 'react'
import { BASE_PATH } from '@/lib/config'

/**
 * 서비스 워커 등록 — 이미지·해시 자산을 cache-first로 저장해 재방문을 즉시 렌더로 만든다.
 * 프로덕션에서만 등록한다(dev에서는 핫 리로드 자산이 캐시에 잡혀 혼란을 일으킴).
 */
export default function SWRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return
    // 등록 실패(비지원·시크릿 모드 등)는 조용히 무시 — 사이트 동작에는 영향 없음
    navigator.serviceWorker.register(`${BASE_PATH}/sw.js`).catch(() => {})
  }, [])

  return null
}
