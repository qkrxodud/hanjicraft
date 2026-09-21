'use client'

import { useEffect, useRef, useState } from 'react'

// 네이버 팝업스토어 링크 — 실제 URL 확정 시 이 상수만 교체하면 된다.
const NAVER_URL = 'https://naver.me/'
// "하루동안 보지 않기" 만료 타임스탬프(epoch ms)를 저장하는 localStorage 키
const HIDE_UNTIL_KEY = 'hanji_naver_popup_hide_until'
// 숨김 유지 기간(24시간)
const HIDE_DURATION_MS = 24 * 60 * 60 * 1000

// 명조/고딕 폰트는 layout.tsx에 없으므로 폴백 체인으로 처리한다.
const SERIF = "'Nanum Myeongjo', 'Noto Serif KR', serif"
const SANS = "'Noto Sans KR', sans-serif"

// keyframes는 styles/*.css를 건드리지 않고 컴포넌트 내부에서 <style>로 주입한다.
const POPUP_KEYFRAMES = `
@keyframes hanjiNaverFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes hanjiNaverPopIn {
  from { opacity: 0; transform: translateY(14px) scale(.97); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hanji-naver-overlay, .hanji-naver-card { animation: none !important; }
}
`

export default function PopupNaver() {
  // SSR/정적 export에서 hydration mismatch를 피하려고 초기값은 false로 두고
  // 마운트 후 useEffect에서 localStorage를 확인해 노출 여부를 결정한다.
  const [open, setOpen] = useState(false)
  // "하루동안 보지 않기" 체크박스 상태
  const [dontShow, setDontShow] = useState(false)
  // 열릴 때 포커스를 카드 패널로 옮긴다(닫기 버튼에 걸면 골드 포커스 링이 즉시 크게 보여 어색함).
  const cardRef = useRef<HTMLDivElement>(null)
  // 이벤트 핸들러(ESC 등) 클로저가 stale 상태를 읽지 않도록 최신 체크 여부를 ref로 보관한다.
  const dontShowRef = useRef(false)
  dontShowRef.current = dontShow

  useEffect(() => {
    let hideUntil = 0
    try {
      hideUntil = Number(localStorage.getItem(HIDE_UNTIL_KEY)) || 0
    } catch {
      // localStorage 접근 불가 환경은 무시하고 노출한다.
    }
    // 만료 시각이 아직 지나지 않았으면 숨기고, 그 외에는 노출한다.
    if (Date.now() >= hideUntil) setOpen(true)
  }, [])

  const close = () => {
    setOpen(false)
    // 체크 안 됨 → 아무것도 저장하지 않아 새로고침 시 다시 노출된다.
    if (!dontShowRef.current) return
    // 체크됨 → 현재 시각 + 24시간을 만료 시각으로 저장한다.
    try {
      localStorage.setItem(HIDE_UNTIL_KEY, String(Date.now() + HIDE_DURATION_MS))
    } catch {
      // 저장 실패는 무시한다.
    }
  }

  useEffect(() => {
    if (!open) return
    // 열렸을 때 다이얼로그 패널로 포커스 이동(접근성)
    cardRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  if (!open) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: POPUP_KEYFRAMES }} />
      <div
        className="hanji-naver-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hanji-naver-popup-title"
        onClick={close}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(30,26,22,.34)',
          animation: 'hanjiNaverFadeIn .3s ease both',
        }}
      >
        <div
          className="hanji-naver-card"
          ref={cardRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            outline: 'none',
            width: 'min(472px, calc(100vw - 40px))',
            background: '#F8F2E7',
            borderRadius: '8px',
            boxShadow: '0 30px 70px rgba(0,0,0,.4)',
            padding: '46px 46px 40px',
            textAlign: 'center',
            animation: 'hanjiNaverPopIn .5s ease both',
            boxSizing: 'border-box',
          }}
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={close}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '19px',
              color: '#9A8F7F',
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#2B2621',
              color: '#F3EDE1',
              fontFamily: SERIF,
              fontSize: '23px',
              fontWeight: 700,
            }}
          >
            紙
          </span>

          <div
            style={{
              fontFamily: SANS,
              fontSize: '11.5px',
              letterSpacing: '.28em',
              color: '#03C75A',
              fontWeight: 700,
              marginTop: '20px',
            }}
          >
            NAVER 팝업스토어
          </div>

          <h2
            id="hanji-naver-popup-title"
            style={{
              fontFamily: SERIF,
              fontWeight: 800,
              fontSize: '28px',
              lineHeight: 1.4,
              color: '#2B2621',
              margin: '12px 0 0',
            }}
          >
            지금 네이버에서 만나보세요
          </h2>

          <div
            aria-hidden="true"
            style={{
              width: '48px',
              height: '2px',
              background: '#C08A2E',
              margin: '20px auto 0',
            }}
          />

          <p
            style={{
              fontFamily: SANS,
              fontSize: '13.5px',
              color: '#6F655A',
              margin: '18px 0 0',
              lineHeight: 1.7,
            }}
          >
            홍현정한지공예 연구소의 팝업스토어가
            <br />
            네이버에서 열렸습니다. 2026. 6. 20 – 7. 5
          </p>

          {/* CTA와 체크박스를 세로 중앙 컬럼으로 묶어 카드의 중앙 정렬 레이아웃과 어울리게 배치 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '28px',
            }}
          >
            <a
              href={NAVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '52px',
                padding: '0 40px',
                background: '#03C75A',
                color: '#FFFFFF',
                fontFamily: SANS,
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              팝업스토어 바로가기 →
            </a>

            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                marginTop: '18px',
                padding: '4px 6px',
                cursor: 'pointer',
                fontFamily: SANS,
                fontSize: '12.5px',
                color: '#8A8072',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
                style={{
                  width: '14px',
                  height: '14px',
                  accentColor: '#C08A2E',
                  cursor: 'pointer',
                }}
              />
              하루동안 보지 않기
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
