'use client'

import { useEffect, useRef } from 'react'

export default function ClientWrapper() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // ===== 페이지 프리로더 =====
    // React 마운트 시점에 이미 load 이벤트가 지난 경우도 처리
    const pageLoader = document.getElementById('page-loader')
    const triggerLoaded = () => {
      setTimeout(() => {
        if (pageLoader) {
          pageLoader.classList.add('fade-out')
          pageLoader.addEventListener('transitionend', function handler() {
            pageLoader.style.display = 'none'
            pageLoader.removeEventListener('transitionend', handler)
          })
        }
        document.body.classList.add('page-loaded')
      }, 400)
    }

    if (document.readyState === 'complete') {
      triggerLoaded()
    } else {
      window.addEventListener('load', triggerLoaded)
    }

    // ===== 스크롤 진행 바 =====
    const scrollProgress = document.getElementById('scrollProgress')
    if (scrollProgress) {
      window.addEventListener(
        'scroll',
        () => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          scrollProgress.style.width = ((window.scrollY / docHeight) * 100) + '%'
        },
        { passive: true },
      )
    }

    // ===== 커스텀 커서 =====
    const cursorDot = document.getElementById('cursorDot')
    const cursorRing = document.getElementById('cursorRing')
    if (cursorDot && cursorRing) {
      let ringX = 0, ringY = 0, dotX = 0, dotY = 0
      document.addEventListener('mousemove', (e) => {
        dotX = e.clientX
        dotY = e.clientY
        cursorDot.style.left = dotX + 'px'
        cursorDot.style.top = dotY + 'px'
      })
      const animateRing = () => {
        ringX += (dotX - ringX) * 0.12
        ringY += (dotY - ringY) * 0.12
        cursorRing.style.left = ringX + 'px'
        cursorRing.style.top = ringY + 'px'
        requestAnimationFrame(animateRing)
      }
      animateRing()
      document
        .querySelectorAll('a, button, .masterpiece-item, .artwork-card, .highlight-card, .collection-item')
        .forEach((el) => {
          el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'))
          el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'))
        })
    }

    // ===== 숫자 카운트업 =====
    function animateCount(el: Element, target: number, duration: number) {
      let start = 0
      const step = target / (duration / 16)
      const timer = setInterval(() => {
        start += step
        if (start >= target) {
          start = target
          clearInterval(timer)
        }
        el.textContent = Math.floor(start).toLocaleString()
      }, 16)
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
    const heroStats = document.querySelector('.hero-stats')
    if (heroStats) statsObserver.observe(heroStats)

    // ===== 히어로 패럴랙스 =====
    const heroImg = document.querySelector<HTMLImageElement>('.slide img')
    if (heroImg) {
      heroImg.style.transform = 'translateY(0px) scale(1.05)'
      window.addEventListener(
        'scroll',
        () => {
          if (window.scrollY < window.innerHeight * 1.2) {
            heroImg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.05)`
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
    window.addEventListener(
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

    // ===== 스크롤 힌트 =====
    const scrollHint = document.querySelector<HTMLElement>('.hero-scroll-hint')
    if (scrollHint) {
      window.addEventListener(
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
      window.addEventListener(
        'scroll',
        () => {
          const st = window.scrollY
          if (bottomNav.querySelector('.bottom-nav-primary-menu.active')) {
            lastBottomScrollTop = st
            return
          }
          bottomNav.classList.toggle('nav-hidden', st > lastBottomScrollTop && st > 200)
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
                link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`)
              })
            }
          })
        },
        { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' },
      )
      pageSections.forEach((s) => sectionObserver.observe(s))
    }

    // ===== 스크롤 투 탑 =====
    const scrollTopBtn = document.getElementById('scrollTopBtn')
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 600), { passive: true })
      scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    }

    // ===== 이미지 fade-in =====
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('img-loaded')
      } else {
        img.addEventListener('load', () => img.classList.add('img-loaded'))
        img.addEventListener('error', () => { img.style.visibility = 'hidden' })
      }
    })

    // ===== 내부 앵커 스크롤 =====
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href')
        if (!href || href === '#') { e.preventDefault(); return }
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const navHeight = document.querySelector<HTMLElement>('.top-nav')?.offsetHeight || 60
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight - 16, behavior: 'smooth' })
        }
      })
    })

    // ===== 히어로 슬라이더 =====
    const slides = document.querySelectorAll<HTMLElement>('.slide')
    const indicators = document.querySelectorAll<HTMLElement>('.hero-indicator')
    let currentSlide = 0
    let slideInterval: ReturnType<typeof setInterval> | null = null

    function showSlide(index: number) {
      slides.forEach((s) => s.classList.remove('active'))
      const next = slides[index]
      if (next) {
        next.querySelectorAll<HTMLElement>('h2, p, .hero-btn').forEach((el) => {
          el.style.animation = 'none'
          void el.offsetHeight
          el.style.animation = ''
        })
        next.classList.add('active')
      }
      indicators.forEach((ind, i) => ind.classList.toggle('active', i === index))
    }

    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => {
        currentSlide = i
        showSlide(currentSlide)
        if (slideInterval) clearInterval(slideInterval)
        if (slides.length > 1) {
          slideInterval = setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide) }, 6000)
        }
      })
    })

    if (slides.length > 1) {
      slideInterval = setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide) }, 6000)

      // 키보드
      document.addEventListener('keydown', (e) => {
        if (!document.querySelector('.hero:hover') && document.activeElement?.closest('.hero') === null) return
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          currentSlide = e.key === 'ArrowRight'
            ? (currentSlide + 1) % slides.length
            : (currentSlide - 1 + slides.length) % slides.length
          showSlide(currentSlide)
          if (slideInterval) clearInterval(slideInterval)
          slideInterval = setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide) }, 6000)
        }
      })

      // 터치 스와이프
      const heroSlider = document.querySelector('.hero-slider')
      if (heroSlider) {
        let heroTouchStartX = 0
        heroSlider.addEventListener('touchstart', (e) => { heroTouchStartX = (e as TouchEvent).touches[0].clientX }, { passive: true })
        heroSlider.addEventListener('touchend', (e) => {
          const diffX = heroTouchStartX - (e as TouchEvent).changedTouches[0].clientX
          if (Math.abs(diffX) < 50) return
          currentSlide = diffX > 0 ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length
          showSlide(currentSlide)
          if (slideInterval) clearInterval(slideInterval)
          slideInterval = setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide) }, 6000)
        }, { passive: true })
      }
    }

    // ===== 마키 호버 일시정지 =====
    const marqueeTrack = document.querySelector<HTMLElement>('.marquee-track')
    if (marqueeTrack) {
      marqueeTrack.addEventListener('mouseenter', () => { marqueeTrack.style.animationPlayState = 'paused' })
      marqueeTrack.addEventListener('mouseleave', () => { marqueeTrack.style.animationPlayState = 'running' })
    }

    // ===== Primary Menu =====
    const primaryMenu = document.getElementById('primary-menu')
    const primaryMenuBtn = document.getElementById('primary-menu-btn')
    let primaryMenuIsOpen = false
    if (primaryMenuBtn && primaryMenu) {
      primaryMenuBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        primaryMenuIsOpen = !primaryMenuIsOpen
        primaryMenu.classList.toggle('active', primaryMenuIsOpen)
        primaryMenuBtn.classList.toggle('active', primaryMenuIsOpen)
      })
      document.addEventListener('click', (e) => {
        if (primaryMenuIsOpen && !primaryMenu.contains(e.target as Node)) {
          primaryMenuIsOpen = false
          primaryMenu.classList.remove('active')
          primaryMenuBtn.classList.remove('active')
        }
      })
    }

    // ===== Collection grid drag scroll =====
    const collectionGrid = document.querySelector<HTMLElement>('.collection-grid')
    if (collectionGrid) {
      let isDown = false, startX = 0, scrollLeftPos = 0
      collectionGrid.addEventListener('mousedown', (e) => {
        isDown = true
        startX = e.pageX - collectionGrid.offsetLeft
        scrollLeftPos = collectionGrid.scrollLeft
      })
      collectionGrid.addEventListener('mouseleave', () => { isDown = false })
      collectionGrid.addEventListener('mouseup', () => { isDown = false })
      collectionGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        collectionGrid.scrollLeft = scrollLeftPos - (e.pageX - collectionGrid.offsetLeft - startX) * 1.5
      })
    }

    // ===== 드롭다운 외부 클릭 닫기 =====
    document.addEventListener('click', () => {
      document.getElementById('language-dropdown')?.classList.remove('show')
    })
  }, [])

  return null
}
