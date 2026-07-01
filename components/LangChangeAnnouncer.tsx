'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'

// 언어 전환 시 스크린리더에 변경 사실을 현재 언어로 안내한다(시각적으로 숨긴 aria-live 라이브 리전).
// html lang이 동시에 갱신되므로 메시지는 새 언어 발음으로 읽힌다.
export default function LangChangeAnnouncer() {
  const { lang } = useI18n()
  const prevLang = useRef<Lang | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // 최초 마운트(초기 언어 결정)에는 안내하지 않고, 실제 사용자 전환에만 안내
    if (prevLang.current && prevLang.current !== lang) {
      const messages: Record<Lang, string> = {
        ko: '언어가 한국어로 변경되었습니다',
        en: 'Language changed to English',
        fr: 'Langue changée en français',
      }
      setMessage(messages[lang] ?? '')
    }
    prevLang.current = lang
  }, [lang])

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  )
}
