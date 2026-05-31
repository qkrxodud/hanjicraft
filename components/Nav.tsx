'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'

export default function Nav() {
  const { t, lang, setLang } = useI18n()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)
  const langBtnRef = useRef<HTMLButtonElement>(null)

  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }

  // 열린 동안 바깥 클릭·Escape로 닫기(Escape 시 포커스를 버튼으로 복귀)
  useEffect(() => {
    if (!dropdownOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDropdownOpen(false); langBtnRef.current?.focus() }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [dropdownOpen])

  function handleLangSelect(newLang: Lang) {
    setLang(newLang)
    setDropdownOpen(false)
    // 드롭다운이 닫히며 visibility:hidden으로 포커스가 유실되므로 트리거로 포커스 복귀
    langBtnRef.current?.focus()
  }

  return (
    <nav className="top-nav" aria-label="주 메뉴">
      <div className="nav-container">
        <ul className="nav-menu nav-left">
          <li className="nav-item">
            <a href="#hero" className="nav-link">{t('nav.home')}</a>
          </li>
          <li className="nav-item">
            <a href="#brand" className="nav-link">{t('nav.brand')}</a>
          </li>
          <li className="nav-item">
            <a href="#highlights" className="nav-link">{t('nav.exhibitions')}</a>
          </li>
        </ul>

        <div className="logo">
          <h1>{t('logo.title')}</h1>
          <p>{t('logo.subtitle')}</p>
        </div>

        <div className="nav-right-section">
          <ul className="nav-menu nav-right">
            <li className="nav-item">
              <a href="#collections" className="nav-link">{t('nav.collections')}</a>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">{t('nav.gallery')}</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">{t('nav.about')}</a>
            </li>
          </ul>

          <div className="nav-actions">
            <div className="language-switcher" ref={switcherRef}>
              <button
                ref={langBtnRef}
                className="lang-btn"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label={`언어 선택, 현재 ${langLabels[lang]}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setDropdownOpen((o) => !o)
                }}
              >
                {langLabels[lang]}
              </button>
              <div className={`lang-dropdown${dropdownOpen ? ' show' : ''}`}>
                {(['ko', 'en', 'fr'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    className={`lang-option${lang === l ? ' active' : ''}`}
                    aria-current={lang === l ? 'true' : undefined}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLangSelect(l)
                    }}
                  >
                    {l === 'ko' ? '한국어' : l === 'en' ? 'English' : 'Français'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
