'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'

export default function Nav() {
  const { t, lang, setLang } = useI18n()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }

  function handleLangSelect(newLang: Lang) {
    setLang(newLang)
    setDropdownOpen(false)
  }

  return (
    <nav className="top-nav">
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
            <div className="language-switcher">
              <button
                className="lang-btn"
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
