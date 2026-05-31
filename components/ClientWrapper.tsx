'use client'

import { useEffect } from 'react'

export default function ClientWrapper() {
  useEffect(() => {
    // 언마운트(클라이언트 라우팅 포함) 시 일괄 해제할 정리 함수 모음
    const cleanups: Array<() => void> = []
    // 대상에 리스너를 등록하면서 동시에 제거 함수를 등록해 누수를 방지하는 헬퍼
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, opts)
      cleanups.push(() => target.removeEventListener(type, handler, opts))
    }
    const timeouts: Array<ReturnType<typeof setTimeout>> = []
    const observers: IntersectionObserver[] = []
    // 모션 최소화 선호 시 JS 상시 모션(패럴랙스·카운트업·자동 슬라이드)을 끈다
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ===== 페이지 프리로더 =====
    // React 마운트 시점에 이미 load 이벤트가 지난 경우도 처리
    const pageLoader = document.getElementById('page-loader')
    const triggerLoaded = () => {
      const t = setTimeout(() => {
        if (pageLoader) {
          pageLoader.classList.add('fade-out')
          pageLoader.addEventListener('transitionend', function handler() {
            pageLoader.style.display = 'none'
            pageLoader.removeEventListener('transitionend', handler)
          })
        }
        document.body.classList.add('page-loaded')
      }, 400)
      timeouts.push(t)
    }

    if (document.readyState === 'complete') {
      triggerLoaded()
    } else {
      on(window, 'load', triggerLoaded)
    }

    // ===== 스크롤 진행 바 =====
    const scrollProgress = document.getElementById('scrollProgress')
    if (scrollProgress) {
      // 문서 높이를 캐싱 — 매 스크롤마다 scrollHeight를 읽는 강제 레이아웃 제거.
      // 지연 이미지 로드 등으로 높이가 바뀌면 ResizeObserver가 갱신.
      let docHeight = document.documentElement.scrollHeight - window.innerHeight
      const updateDocHeight = () => { docHeight = document.documentElement.scrollHeight - window.innerHeight }
      const docHeightObserver = new ResizeObserver(updateDocHeight)
      docHeightObserver.observe(document.body)
      cleanups.push(() => docHeightObserver.disconnect())
      on(window, 'resize', updateDocHeight, { passive: true })
      on(
        window,
        'scroll',
        () => {
          scrollProgress.style.width = (docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0) + '%'
        },
        { passive: true },
      )
    }

    // ===== 숫자 카운트업 =====
    function animateCount(el: Element, target: number, duration: number) {
      // 모션 최소화 시 최종값을 즉시 표시
      if (reduce) {
        el.textContent = target.toLocaleString()
        return
      }
      // rAF + 경과시간 기반 — 프레임 동기화, 시간 정확, 백그라운드 탭에서 자동 정지
      let startTime = 0
      let rafId = 0
      const tick = (now: number) => {
        if (startTime === 0) startTime = now
        const progress = Math.min((now - startTime) / duration, 1)
        el.textContent = Math.floor(target * progress).toLocaleString()
        if (progress < 1) {
          rafId = requestAnimationFrame(tick)
          return
        }
        el.textContent = target.toLocaleString()
      }
      rafId = requestAnimationFrame(tick)
      cleanups.push(() => cancelAnimationFrame(rafId))
    }
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('[data-count]').forEach((num) => {
              animateCount(num, parseInt(num.getAttribute('data-count') || '0'), 1800)
            })
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
    observers.push(statsObserver)
    const heroStats = document.querySelector('.hero-stats')
    if (heroStats) statsObserver.observe(heroStats)

    // ===== 히어로 패럴랙스 =====
    // 진입 시 CSS 켄번즈가 먼저 재생되도록 초기 transform은 설정하지 않고,
    // 실제 스크롤이 시작될 때만 패럴랙스를 적용한다(켄번즈 종료값 scale(1.05)와 일치).
    const heroImg = document.querySelector<HTMLImageElement>('.slide img')
    if (heroImg && !reduce) {
      on(
        window,
        'scroll',
        () => {
          if (window.scrollY > 0 && window.scrollY < window.innerHeight * 1.2) {
            heroImg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.03)`
          }
        },
        { passive: true },
      )
    }

    // ===== 스크롤 리빌 =====
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )
    observers.push(revealObserver)
    document
      .querySelectorAll('.brand-card, .value-card, .highlight-card, .collection-item, .masterpiece-item')
      .forEach((el) => {
        el.classList.add('reveal', 'reveal-stagger')
        revealObserver.observe(el)
      })
    document.querySelectorAll('.editorial-image, .editorial-text').forEach((el) => {
      el.classList.add('editorial-reveal')
      revealObserver.observe(el)
    })
    const philosophyQuote = document.querySelector('.philosophy-strip blockquote')
    if (philosophyQuote) {
      philosophyQuote.classList.add('reveal')
      revealObserver.observe(philosophyQuote)
    }
    document
      .querySelectorAll('.section-title, .brand-subtitle, .inquiry-lead, .values-title')
      .forEach((el) => {
        el.classList.add('reveal')
        revealObserver.observe(el)
      })

    // ===== 네비게이션 스크롤 효과 =====
    const navbar = document.querySelector<HTMLElement>('.top-nav')
    let lastScrollTop = 0
    on(
      window,
      'scroll',
      () => {
        const scrollTop = window.pageYOffset
        if (navbar) {
          navbar.style.transform = scrollTop > lastScrollTop && scrollTop > 100 ? 'translateY(-100%)' : 'translateY(0)'
          navbar.classList.toggle('scrolled', scrollTop > 50)
        }
        lastScrollTop = scrollTop
      },
      { passive: true },
    )
    // 키보드 포커스가 내비 내부로 들어오면 숨겨졌던 내비를 다시 노출 — 화면 밖 포커스 방지(WCAG 2.4.7)
    if (navbar) {
      on(navbar, 'focusin', () => {
        navbar.style.transform = 'translateY(0)'
      })
    }

    // ===== 스크롤 힌트 =====
    const scrollHint = document.querySelector<HTMLElement>('.hero-scroll-hint')
    if (scrollHint) {
      on(
        window,
        'scroll',
        () => {
          scrollHint.style.opacity = String(Math.max(0, 1 - window.scrollY / 200))
        },
        { passive: true },
      )
    }

    // ===== 바텀 nav 숨김 =====
    const bottomNav = document.querySelector<HTMLElement>('.bottom-nav')
    if (bottomNav) {
      let lastBottomScrollTop = 0
      on(
        window,
        'scroll',
        () => {
          const st = window.scrollY
          if (bottomNav.querySelector('.bottom-nav-primary-menu.active')) {
            lastBottomScrollTop = st
            return
          }
          const hidden = st > lastBottomScrollTop && st > 200
          bottomNav.classList.toggle('nav-hidden', hidden)
          // 숨겨졌을 때 inert로 키보드 탭/접근성 트리에서 제외(화면 밖 버튼 포커스 방지)
          bottomNav.inert = hidden
          lastBottomScrollTop = st
        },
        { passive: true },
      )
    }

    // ===== 활성 섹션 nav 하이라이트 =====
    const navLinks = document.querySelectorAll('.nav-link')
    const pageSections = document.querySelectorAll('section[id]')
    if (pageSections.length > 0 && navLinks.length > 0) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id')
              navLinks.forEach((link) => {
                const isCurrent = link.getAttribute('href') === `#${id}`
                link.classList.toggle('nav-active', isCurrent)
                // 스크린리더에 현재 섹션 노출
                if (isCurrent) link.setAttribute('aria-current', 'true')
                else link.removeAttribute('aria-current')
              })
            }
          })
        },
        { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' },
      )
      observers.push(sectionObserver)
      pageSections.forEach((s) => sectionObserver.observe(s))
    }

    // ===== 스크롤 투 탑 =====
    const scrollTopBtn = document.getElementById('scrollTopBtn')
    if (scrollTopBtn) {
      on(window, 'scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 600), { passive: true })
      on(scrollTopBtn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // 맨 위로 이동 후 포커스를 문서 상단(main)으로 옮겨 키보드 탐색이 위에서 이어지게 한다
        // preventScroll로 부드러운 스크롤 애니메이션을 방해하지 않는다
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
        if (target) {
          const navHeight = document.querySelector<HTMLElement>('.top-nav')?.offsetHeight || 60
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight - 16, behavior: 'smooth' })
        }
      }) as EventListener)
    })

    // ===== 히어로 슬라이더 =====
    const slides = document.querySelectorAll<HTMLElement>('.slide')
    const indicators = document.querySelectorAll<HTMLElement>('.hero-indicator')
    let currentSlide = 0
    let slideInterval: ReturnType<typeof setInterval> | null = null

    // 초기: 활성 슬라이드 외 전부 inert (숨겨진 슬라이드의 링크가 탭되지 않도록)
    slides.forEach((s) => { s.inert = !s.classList.contains('active') })

    // 호버/포커스 중(heroPaused)이거나 히어로가 화면 밖(heroVisible=false)이면 자동 전환 중단
    let heroPaused = false
    let heroVisible = true

    const startAutoSlide = () => {
      if (slideInterval) clearInterval(slideInterval)
      // 모션 최소화 시 자동 전환 중단(인디케이터·키보드 수동 전환은 유지)
      if (reduce) return
      if (slides.length > 1) {
        slideInterval = setInterval(() => {
          if (heroPaused || !heroVisible) return
          currentSlide = (currentSlide + 1) % slides.length
          showSlide(currentSlide)
        }, 6000)
      }
    }

    function showSlide(index: number) {
      // 비활성 슬라이드는 inert로 탭 순서·접근성 트리에서 제외(숨겨진 CTA 포커스 방지)
      slides.forEach((s) => { s.classList.remove('active'); s.inert = true })
      const next = slides[index]
      if (next) {
        next.inert = false
        next.querySelectorAll<HTMLElement>('h2, p, .hero-btn').forEach((el) => {
          el.style.animation = 'none'
          void el.offsetHeight
          el.style.animation = ''
        })
        next.classList.add('active')
      }
      indicators.forEach((ind, i) => {
        const on = i === index
        ind.classList.toggle('active', on)
        // 스크린리더에 현재 슬라이드 노출
        if (on) ind.setAttribute('aria-current', 'true')
        else ind.removeAttribute('aria-current')
      })
    }

    indicators.forEach((ind, i) => {
      on(ind, 'click', () => {
        currentSlide = i
        showSlide(currentSlide)
        startAutoSlide()
      })
    })

    if (slides.length > 1) {
      startAutoSlide()

      // 수동 이전/다음 화살표 버튼
      const goTo = (dir: number) => {
        currentSlide = (currentSlide + dir + slides.length) % slides.length
        showSlide(currentSlide)
        startAutoSlide()
      }
      const heroPrev = document.getElementById('heroPrev')
      const heroNext = document.getElementById('heroNext')
      if (heroPrev) on(heroPrev, 'click', () => goTo(-1))
      if (heroNext) on(heroNext, 'click', () => goTo(1))

      // 히어로 위 마우스 진입 여부를 신뢰성 있게 추적 (:hover 셀렉터 의존 제거)
      let heroHovered = false
      const heroEl = document.querySelector('.hero')
      if (heroEl) {
        // 호버·포커스 시 자동 전환 일시정지(벗어나면 재개)
        on(heroEl, 'mouseenter', () => { heroHovered = true; heroPaused = true })
        on(heroEl, 'mouseleave', () => { heroHovered = false; heroPaused = false })
        on(heroEl, 'focusin', () => { heroPaused = true })
        on(heroEl, 'focusout', () => { heroPaused = false })
        // 히어로가 화면 밖이면 자동 전환을 멈춰 불필요한 DOM 조작 방지
        const heroVisObserver = new IntersectionObserver(
          (entries) => { heroVisible = entries[0].isIntersecting },
          { threshold: 0 },
        )
        observers.push(heroVisObserver)
        heroVisObserver.observe(heroEl)
      }

      // 키보드 — 입력 요소 포커스 시에는 캐럿 이동을 방해하지 않도록 제외
      on(document, 'keydown', ((e: KeyboardEvent) => {
        const ae = document.activeElement as HTMLElement | null
        const tag = ae?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || ae?.isContentEditable) return
        if (!heroHovered && (ae?.closest('.hero') ?? null) === null) return
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          currentSlide = e.key === 'ArrowRight'
            ? (currentSlide + 1) % slides.length
            : (currentSlide - 1 + slides.length) % slides.length
          showSlide(currentSlide)
          startAutoSlide()
        }
      }) as EventListener)

      // 터치 스와이프
      const heroSlider = document.querySelector('.hero-slider')
      if (heroSlider) {
        let heroTouchStartX = 0
        on(heroSlider, 'touchstart', ((e: TouchEvent) => { heroTouchStartX = e.touches[0].clientX }) as EventListener, { passive: true })
        on(heroSlider, 'touchend', ((e: TouchEvent) => {
          const diffX = heroTouchStartX - e.changedTouches[0].clientX
          if (Math.abs(diffX) < 50) return
          currentSlide = diffX > 0 ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length
          showSlide(currentSlide)
          startAutoSlide()
        }) as EventListener, { passive: true })
      }
    }

    // ===== 마키 호버 일시정지 + 화면 밖이면 정지(자원 절약) =====
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

    // ===== Primary Menu =====
    const primaryMenu = document.getElementById('primary-menu')
    const primaryMenuBtn = document.getElementById('primary-menu-btn')
    let primaryMenuIsOpen = false
    if (primaryMenuBtn && primaryMenu) {
      on(primaryMenuBtn, 'click', ((e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        primaryMenuIsOpen = !primaryMenuIsOpen
        primaryMenu.classList.toggle('active', primaryMenuIsOpen)
        primaryMenuBtn.classList.toggle('active', primaryMenuIsOpen)
        primaryMenuBtn.setAttribute('aria-expanded', String(primaryMenuIsOpen))
      }) as EventListener)
      on(document, 'click', ((e: Event) => {
        if (primaryMenuIsOpen && !primaryMenu.contains(e.target as Node)) {
          primaryMenuIsOpen = false
          primaryMenu.classList.remove('active')
          primaryMenuBtn.classList.remove('active')
          primaryMenuBtn.setAttribute('aria-expanded', 'false')
        }
      }) as EventListener)
      // Escape로 닫고 포커스를 버튼으로 복귀(disclosure 키보드 표준)
      on(document, 'keydown', ((e: KeyboardEvent) => {
        if (e.key === 'Escape' && primaryMenuIsOpen) {
          primaryMenuIsOpen = false
          primaryMenu.classList.remove('active')
          primaryMenuBtn.classList.remove('active')
          primaryMenuBtn.setAttribute('aria-expanded', 'false')
          primaryMenuBtn.focus()
        }
      }) as EventListener)
    }

    // ===== Collection grid drag scroll =====
    const collectionGrid = document.querySelector<HTMLElement>('.collection-grid')
    if (collectionGrid) {
      let isDown = false, startX = 0, scrollLeftPos = 0
      on(collectionGrid, 'mousedown', ((e: MouseEvent) => {
        isDown = true
        startX = e.pageX - collectionGrid.offsetLeft
        scrollLeftPos = collectionGrid.scrollLeft
      }) as EventListener)
      on(collectionGrid, 'mouseleave', () => { isDown = false })
      on(collectionGrid, 'mouseup', () => { isDown = false })
      on(collectionGrid, 'mousemove', ((e: MouseEvent) => {
        if (!isDown) return
        e.preventDefault()
        collectionGrid.scrollLeft = scrollLeftPos - (e.pageX - collectionGrid.offsetLeft - startX) * 1.5
      }) as EventListener)
    }

    // ===== 정리 =====
    return () => {
      cleanups.forEach((fn) => fn())
      timeouts.forEach((t) => clearTimeout(t))
      if (slideInterval) clearInterval(slideInterval)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return null
}
