'use client'

import { useState, useEffect, useRef } from 'react'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'

// 섹션 앵커 — 순서가 페이지의 섹션 순서와 같아야 스크롤 하이라이트가 자연스럽다
const NAV_ITEMS = [
  { href: '#brand', key: 'nav.brand' },
  { href: '#highlights', key: 'nav.exhibitions' },
  { href: '#collections', key: 'nav.collections' },
  { href: '#gallery', key: 'nav.gallery' },
  { href: '#about', key: 'nav.about' },
]

export default function Nav() {
  const { t, lang, setLang } = useI18n()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)
  const langBtnRef = useRef<HTMLButtonElement>(null)

  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }
  const langNames: Record<Lang, string> = { ko: '한국어', en: 'English', fr: 'Français' }
  // 언어 전환 버튼은 현재 선택된 UI 언어로 자기 자신을 안내한다(EN/FR 사용자가 한국어 라벨을 듣지 않도록)
  const switcherLabel: Record<Lang, string> = {
    ko: `언어 선택 — 현재 ${langNames[lang]}`,
    en: `Select language — current: ${langNames[lang]}`,
    fr: `Choisir la langue — actuelle : ${langNames[lang]}`,
  }
  // 내비게이션 랜드마크 라벨 — 스크린리더 사용자가 랜드마크로 점프 탐색할 때 현재 언어로 안내
  const navLandmark: Record<Lang, string> = { ko: '주 메뉴', en: 'Main menu', fr: 'Menu principal' }

  // 열린 동안 바깥 클릭·Escape·포커스 이탈로 닫기(Escape 시 포커스를 버튼으로 복귀)
  useEffect(() => {
    if (!dropdownOpen) return
    const switcher = switcherRef.current
    const onDocClick = (e: MouseEvent) => {
      if (switcher && !switcher.contains(e.target as Node)) setDropdownOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDropdownOpen(false); langBtnRef.current?.focus() }
    }
    // Tab 등으로 포커스가 스위처 밖으로 나가면 닫는다(disclosure 표준 — 열린 채 방치 방지)
    const onFocusOut = (e: FocusEvent) => {
      if (switcher && !switcher.contains(e.relatedTarget as Node)) setDropdownOpen(false)
    }
    // 스크롤 시 닫는다 — 헤더가 스크롤다운 시 숨으면서 열린 드롭다운이 화면 밖으로 끌려가는 문제 방지
    const onScroll = () => setDropdownOpen(false)
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    switcher?.addEventListener('focusout', onFocusOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
      switcher?.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [dropdownOpen])

  function handleLangSelect(newLang: Lang) {
    setLang(newLang)
    setDropdownOpen(false)
    // 드롭다운이 닫히며 visibility:hidden으로 포커스가 유실되므로 트리거로 포커스 복귀
    langBtnRef.current?.focus()
  }

  return (
    <nav className="top-nav" aria-label={navLandmark[lang]}>
      <div className="nav-container">
        <div className="logo">
          {/* 로고 클릭 시 최상단으로 이동 — 보편적 '로고=홈' 관례이자 상세 페이지 로고(→/)와의 동작 일관성 */}
          <a href="#hero">
            {/* 장식용 한자 심볼 — 옆의 브랜드명이 의미를 전달하므로 접근성 트리에서 제외 */}
            <span className="logo-mark" aria-hidden="true">紙</span>
            {/* 홈의 h1은 히어로 제목이므로 로고는 heading이 아닌 텍스트로 둔다(h1 중복 방지) */}
            <span className="logo-text">
              <span className="logo-title">{t('logo.title')}</span>
              <span className="logo-sub">{t('logo.subtitle')}</span>
            </span>
          </a>
        </div>

        <ul className="nav-menu">
          {NAV_ITEMS.map(({ href, key }) => (
            <li key={href}>
              <a href={href} className="nav-link">{t(key)}</a>
            </li>
          ))}
          <li>
            <a href="#inquiry" className="nav-link nav-link--cta">{t('nav.contact')}</a>
          </li>
        </ul>

        <div className="nav-actions">
          <div className="language-switcher" ref={switcherRef}>
            <button
              type="button"
              ref={langBtnRef}
              className="lang-btn"
              aria-expanded={dropdownOpen}
              aria-controls="lang-dropdown-nav"
              aria-label={switcherLabel[lang]}
              onClick={(e) => {
                e.stopPropagation()
                setDropdownOpen((o) => !o)
              }}
            >
              {langLabels[lang]}
            </button>
            <div id="lang-dropdown-nav" className={`lang-dropdown${dropdownOpen ? ' show' : ''}`}>
              {(['ko', 'en', 'fr'] as Lang[]).map((l) => (
                <button
                  type="button"
                  key={l}
                  className={`lang-option${lang === l ? ' active' : ''}`}
                  // 옵션 라벨이 외국어 고유명(English/Français)이라 페이지 언어와 다를 때
                  // 스크린리더가 잘못 발음하지 않도록 각 옵션에 해당 언어를 명시(WCAG 3.1.2)
                  lang={l}
                  aria-current={lang === l ? 'true' : undefined}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLangSelect(l)
                  }}
                >
                  {langNames[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
