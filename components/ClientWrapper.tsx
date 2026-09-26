'use client'

import { useEffect } from 'react'

/**
 * 홈 페이지의 클라이언트 사이드 효과.
 * 히어로 슬라이더는 Hero.tsx가 상태로 직접 관리하므로 여기서는 다루지 않는다.
 */
export default function ClientWrapper() {
  useEffect(() => {
    // 언마운트(클라이언트 라우팅 포함) 시 일괄 해제할 정리 함수 모음
    const cleanups: Array<() => void> = []
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, opts)
      cleanups.push(() => target.removeEventListener(type, handler, opts))
    }
    const observers: IntersectionObserver[] = []

    // ===== 페이지 진입 페이드 =====
    // 진입 페이드는 CSS 애니메이션(artwork-detail.css의 pageFadeIn)이 스타일 파싱 즉시 재생 —
    // JS는 상세 페이지에서 이탈(page-leaving)한 흔적만 걷어낸다(bfcache 복원 포함)
    document.body.classList.remove('page-leaving')
    on(window, 'pageshow', ((e: Event) => {
      if ((e as PageTransitionEvent).persisted) document.body.classList.remove('page-leaving')
    }) as EventListener)

    // ===== 스크롤 진행 바 =====
    const scrollProgress = document.getElementById('scrollProgress')
    if (scrollProgress) {
      // 문서 높이를 캐싱 — 매 스크롤마다 scrollHeight를 읽는 강제 레이아웃 제거
      let docHeight = document.documentElement.scrollHeight - window.innerHeight
      const renderProgress = () => {
        scrollProgress.style.width = (docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0) + '%'
      }
      const updateDocHeight = () => {
        docHeight = document.documentElement.scrollHeight - window.innerHeight
        renderProgress()
      }
      const docHeightObserver = new ResizeObserver(updateDocHeight)
      docHeightObserver.observe(document.body)
      cleanups.push(() => docHeightObserver.disconnect())
      on(window, 'resize', updateDocHeight, { passive: true })
      on(window, 'scroll', renderProgress, { passive: true })
    }

    // ===== 스크롤 리빌 =====
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 빠르게 스크롤하면 IO 콜백이 합쳐지면서 화면을 스쳐 지나간 요소가 한 번도
          // isIntersecting=true로 보고되지 않는다. 그대로 두면 opacity:0으로 영영 남으므로,
          // 이미 화면 위로 지나간(top < 0) 요소도 노출 처리한다.
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    )
    observers.push(revealObserver)
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    // ===== 헤더 스크롤 숨김 =====
    const navbar = document.querySelector<HTMLElement>('.top-nav')
    if (navbar) {
      let lastScrollTop = 0
      on(
        window,
        'scroll',
        () => {
          const scrollTop = window.scrollY
          navbar.style.transform =
            scrollTop > lastScrollTop && scrollTop > 200 ? 'translateY(-100%)' : 'translateY(0)'
          lastScrollTop = scrollTop
        },
        { passive: true },
      )
      // 키보드 포커스가 내비 내부로 들어오면 다시 노출 — 화면 밖 포커스 방지(WCAG 2.4.7)
      on(navbar, 'focusin', () => {
        navbar.style.transform = 'translateY(0)'
      })
    }

    // ===== 활성 섹션 nav 하이라이트 =====
    const navLinks = document.querySelectorAll('.nav-link')
    const pageSections = document.querySelectorAll('section[id]')
    if (pageSections.length > 0 && navLinks.length > 0) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const id = entry.target.getAttribute('id')
            navLinks.forEach((link) => {
              const isCurrent = link.getAttribute('href') === `#${id}`
              link.classList.toggle('nav-active', isCurrent)
              // 스크린리더에 현재 섹션 노출
              if (isCurrent) link.setAttribute('aria-current', 'true')
              else link.removeAttribute('aria-current')
            })
          })
        },
        { threshold: 0.2, rootMargin: '-96px 0px -40% 0px' },
      )
      observers.push(sectionObserver)
      pageSections.forEach((s) => sectionObserver.observe(s))
    }

    // ===== 스크롤 투 탑 =====
    const scrollTopBtn = document.getElementById('scrollTopBtn')
    if (scrollTopBtn) {
      const footer = document.querySelector('.site-footer')
      const updateScrollTopBtn = () => {
        // 푸터가 버튼 높이까지 올라오면 콘텐츠를 가리므로 버튼을 숨긴다
        const overlapsFooter = footer
          ? footer.getBoundingClientRect().top < scrollTopBtn.getBoundingClientRect().bottom
          : false
        scrollTopBtn.classList.toggle('visible', window.scrollY > 600 && !overlapsFooter)
      }
      on(window, 'scroll', updateScrollTopBtn, { passive: true })
      on(window, 'resize', updateScrollTopBtn, { passive: true })
      updateScrollTopBtn()
      on(scrollTopBtn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // 맨 위로 이동 후 포커스를 문서 상단으로 옮겨 키보드 탐색이 위에서 이어지게 한다
        document.getElementById('main-content')?.focus({ preventScroll: true })
      })
    }

    // ===== 이미지 fade-in =====
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      // 디코딩을 메인스레드에서 분리해 스크롤 중 잰크를 줄인다
      img.decoding = 'async'
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('img-loaded')
      } else {
        on(img, 'load', () => img.classList.add('img-loaded'))
        on(img, 'error', () => { img.style.visibility = 'hidden' })
      }
    })

    // ===== 내부 앵커 스크롤 (skip-link는 네이티브 포커스 이동을 위해 제외) =====
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not(.skip-link)').forEach((anchor) => {
      on(anchor, 'click', ((e: Event) => {
        const href = anchor.getAttribute('href')
        if (!href || href === '#') { e.preventDefault(); return }
        e.preventDefault()
        const target = document.querySelector(href)
        if (!target) return
        const navHeight = document.querySelector<HTMLElement>('.top-nav')?.offsetHeight ?? 72
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navHeight - 16,
          behavior: 'smooth',
        })
      }) as EventListener)
    })

    // ===== 마키 — 화면 밖이면 정지(자원 절약), 호버 시 일시정지 =====
    const marqueeTrack = document.querySelector<HTMLElement>('.marquee-track')
    if (marqueeTrack) {
      on(marqueeTrack, 'mouseenter', () => { marqueeTrack.style.animationPlayState = 'paused' })
      on(marqueeTrack, 'mouseleave', () => { marqueeTrack.style.animationPlayState = 'running' })
      const marqueeObserver = new IntersectionObserver(
        (entries) => { marqueeTrack.style.animationPlayState = entries[0].isIntersecting ? 'running' : 'paused' },
        { threshold: 0 },
      )
      observers.push(marqueeObserver)
      marqueeObserver.observe(marqueeTrack)
    }

    // ===== 정리 =====
    return () => {
      cleanups.forEach((fn) => fn())
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return null
}
