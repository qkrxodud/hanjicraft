// Main JavaScript for Hanji Craft Museum Website

document.addEventListener('DOMContentLoaded', function() {

    // ===== 페이지 입장 애니메이션 =====
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    // ===== 스크롤 진행 바 =====
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / docHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }, { passive: true });
    }

    // ===== 커스텀 커서 =====
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    if (cursorDot && cursorRing) {
        let ringX = 0, ringY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', function(e) {
            dotX = e.clientX;
            dotY = e.clientY;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
        });

        // 링은 부드럽게 따라가기
        function animateRing() {
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // 클릭 가능 요소에 호버 시 링 확대
        document.querySelectorAll('a, button, .masterpiece-item, .artwork-card, .highlight-card, .collection-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
        });
    }

    // ===== 히어로 숫자 카운트업 애니메이션 =====
    function animateCount(el, target, duration) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(start).toLocaleString();
        }, 16);
    }

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('[data-count]');
                numbers.forEach(function(num) {
                    animateCount(num, parseInt(num.getAttribute('data-count')), 1800);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    // ===== 히어로 패럴랙스 =====
    const heroSection = document.querySelector('.hero');
    const heroImg = document.querySelector('.slide img');
    if (heroImg && heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight * 1.2) {
                heroImg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px) scale(1.05)';
            }
        }, { passive: true });
        // 초기 scale 적용
        heroImg.style.transform = 'translateY(0px) scale(1.05)';
    }



    // Restore scroll position if returning from artwork detail
    function restoreScrollPosition() {
        const urlParams = new URLSearchParams(window.location.search);
        const fromDetail = urlParams.get('fromDetail');

        if (fromDetail || window.location.hash === '#gallery') {
            const savedPosition = sessionStorage.getItem('scrollPosition');
            const clickedArtworkId = sessionStorage.getItem('clickedArtworkId');

            if (savedPosition) {
                // Small delay to ensure page is fully loaded
                setTimeout(() => {
                    window.scrollTo({
                        top: parseInt(savedPosition),
                        behavior: 'smooth'
                    });
                }, 100);

                // Clear the stored position after use
                sessionStorage.removeItem('scrollPosition');
                sessionStorage.removeItem('clickedArtworkId');
            } else if (window.location.hash === '#gallery') {
                // If no saved position but #gallery hash, scroll to gallery
                setTimeout(() => {
                    const gallerySection = document.querySelector('#gallery');
                    if (gallerySection) {
                        gallerySection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            }
        }
    }

    // Call restore function
    restoreScrollPosition();

    // Language switcher functionality
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    // Update language button text
    function updateLanguageButton() {
        if (!window.i18n || !languageToggle) return;

        const currentLang = window.i18n.getCurrentLanguage();
        const langMap = {
            'ko': 'KO',
            'en': 'EN',
            'fr': 'FR'
        };

        languageToggle.textContent = langMap[currentLang] || 'KO';

        // Update active state in dropdown
        langOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            option.classList.toggle('active', optionLang === currentLang);
        });
    }

    // Initialize i18n
    if (window.i18n) {
        window.i18n.updateUI();
        updateLanguageButton();
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // href가 "#"만인 경우 기본 동작을 막고 아무것도 하지 않음
            if (href === '#') {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // sticky nav 높이(60px) + 여유 16px 오프셋 보정
                const navHeight = document.querySelector('.top-nav')?.offsetHeight || 60;
                const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.top-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 스크롤 방향 감지: 아래로 스크롤 시 숨김 (100px 이상 내려간 경우)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // 히어로 영역(50px 이내)에서는 투명, 벗어나면 크림색 배경
        // CSS .scrolled 클래스로 제어 — 인라인 background 제거
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // ===== 히어로 스크롤 힌트 — 스크롤 시 페이드아웃 =====
    const scrollHint = document.querySelector('.hero-scroll-hint');
    if (scrollHint) {
        window.addEventListener('scroll', () => {
            const opacity = Math.max(0, 1 - window.scrollY / 200);
            scrollHint.style.opacity = opacity;
        }, { passive: true });
    }

    // ===== Bottom nav 스크롤 감지 숨김 =====
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        let lastBottomScrollTop = 0;
        window.addEventListener('scroll', () => {
            const st = window.scrollY;
            // 서브메뉴 열려있을 때는 숨기지 않음
            if (bottomNav.querySelector('.bottom-nav-primary-menu.active')) {
                lastBottomScrollTop = st;
                return;
            }
            if (st > lastBottomScrollTop && st > 200) {
                bottomNav.classList.add('nav-hidden');
            } else {
                bottomNav.classList.remove('nav-hidden');
            }
            lastBottomScrollTop = st;
        }, { passive: true });
    }

    // ===== 활성 섹션 nav 하이라이트 =====
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('section[id]');
    if (pageSections.length > 0 && navLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        link.classList.toggle('nav-active', href === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' });
        pageSections.forEach(s => sectionObserver.observe(s));
    }

    // ===== 스크롤 투 탑 버튼 =====
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== 이미지 지연 로딩 fade-in + 에러 처리 =====
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('img-loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('img-loaded'));
            img.addEventListener('error', () => {
                img.style.visibility = 'hidden'; // 깨진 이미지 아이콘 숨김
            });
        }
    });

    // Scroll reveal animation (IntersectionObserver)
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Cards and grid items get staggered reveal
    document.querySelectorAll('.brand-card, .value-card, .highlight-card, .collection-item, .masterpiece-item').forEach(function(el) {
        el.classList.add('reveal', 'reveal-stagger');
        revealObserver.observe(el);
    });

    // Editorial rows — image and text slide in
    document.querySelectorAll('.editorial-image, .editorial-text').forEach(function(el) {
        el.classList.add('editorial-reveal');
        revealObserver.observe(el);
    });

    // Philosophy strip
    const philosophyQuote = document.querySelector('.philosophy-strip blockquote');
    if (philosophyQuote) {
        philosophyQuote.classList.add('reveal');
        revealObserver.observe(philosophyQuote);
    }

    // Section titles and subtitles get simple reveal
    document.querySelectorAll('.section-title, .brand-subtitle, .inquiry-lead, .values-title').forEach(function(el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Save scroll position for all artwork detail links
    function saveScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
    }

    // Masterpiece item click handlers with position saving
    document.querySelectorAll('.masterpiece-item').forEach(item => {
        function navigateToArtwork() {
            const artworkId = item.getAttribute('data-artwork-id');
            if (artworkId) {
                saveScrollPosition();
                sessionStorage.setItem('clickedArtworkId', artworkId);
                document.body.classList.remove('page-loaded');
                setTimeout(() => {
                    window.location.href = `./artwork-detail.html?id=${artworkId}`;
                }, 400);
            }
        }
        item.addEventListener('click', navigateToArtwork);
        // 키보드 접근성 — Enter/Space 클릭과 동일하게 동작
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToArtwork();
            }
        });
    });

    // Add position saving to all artwork detail links
    document.querySelectorAll('a[href*="artwork-detail.html"]').forEach(link => {
        link.addEventListener('click', function() {
            saveScrollPosition();
        });
    });

    // Dropdown menu functionality for mobile
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-content');

        if (dropdown) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });

    // Primary Menu functionality
    const primaryMenu = document.getElementById('primary-menu');
    const primaryMenuBtn = document.getElementById('primary-menu-btn');
    let primaryMenuIsOpen = false;

    if (primaryMenuBtn) {
        // Add click event for menu toggle functionality
        primaryMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            primaryMenuIsOpen = !primaryMenuIsOpen;

            if (primaryMenuIsOpen) {
                primaryMenu.classList.add('active');
                primaryMenuBtn.classList.add('active');
            } else {
                primaryMenu.classList.remove('active');
                primaryMenuBtn.classList.remove('active');
            }
        });

        // Close primary menu when clicking outside
        document.addEventListener('click', function(e) {
            if (primaryMenuIsOpen && !primaryMenu.contains(e.target)) {
                primaryMenuIsOpen = false;
                primaryMenu.classList.remove('active');
                primaryMenuBtn.classList.remove('active');
            }
        });

        // Close primary menu when pressing escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && primaryMenuIsOpen) {
                primaryMenuIsOpen = false;
                primaryMenu.classList.remove('active');
                primaryMenuBtn.classList.remove('active');
            }
        });
    }

    // Bottom navigation scroll behavior — 위 '스크롤 감지 숨김' 블록에서 통합 처리

    // Horizontal drag scroll for collection grid
    const collectionGrid = document.querySelector('.collection-grid');
    if (collectionGrid) {
        let isDown = false;
        let startX;
        let scrollLeftPos;

        collectionGrid.addEventListener('mousedown', function(e) {
            isDown = true;
            startX = e.pageX - collectionGrid.offsetLeft;
            scrollLeftPos = collectionGrid.scrollLeft;
        });
        collectionGrid.addEventListener('mouseleave', function() { isDown = false; });
        collectionGrid.addEventListener('mouseup', function() { isDown = false; });
        collectionGrid.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - collectionGrid.offsetLeft;
            var walk = (x - startX) * 1.5;
            collectionGrid.scrollLeft = scrollLeftPos - walk;
        });
    }

    // Form validation (if needed)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add form validation logic here
            console.log('Form submitted');
        });
    });

    if (languageToggle && languageDropdown) {
        // Toggle dropdown
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageDropdown.classList.remove('show');
        });

        // Language option selection — fade-out → 번역 적용 → fade-in
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');
                languageDropdown.classList.remove('show');

                if (!window.i18n || selectedLang === window.i18n.getCurrentLanguage()) return;

                // 콘텐츠 페이드 아웃
                const i18nEls = document.querySelectorAll('[data-i18n]');
                i18nEls.forEach(el => {
                    el.style.transition = 'opacity 0.18s ease';
                    el.style.opacity = '0';
                });

                setTimeout(() => {
                    window.i18n.setLanguage(selectedLang);
                    updateLanguageButton();
                    // 페이드 인
                    i18nEls.forEach(el => {
                        el.style.opacity = '1';
                    });
                    setTimeout(() => {
                        i18nEls.forEach(el => { el.style.transition = ''; el.style.opacity = ''; });
                    }, 200);
                }, 180);
            });
        });
    }

    // Listen for language changes from i18n system
    window.addEventListener('languageChanged', function() {
        updateLanguageButton();
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Add search modal or redirect logic
            console.log('Search clicked');
        });
    }

    // Hero slider functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    let currentSlide = 0;
    let slideInterval = null;

    function showSlide(index) {
        // 현재 슬라이드 비활성화
        slides.forEach(slide => slide.classList.remove('active'));

        // 새 슬라이드 활성화 + 애니메이션 리셋
        const nextSlide = slides[index];
        if (nextSlide) {
            // slide-content 내 애니메이션 요소들 리셋 (forwards 고착 해제)
            const animEls = nextSlide.querySelectorAll('h2, p, .hero-btn');
            animEls.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // reflow 강제
                el.style.animation = '';
            });
            nextSlide.classList.add('active');
        }

        // 인디케이터 업데이트
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
    }

    // 인디케이터 클릭으로 슬라이드 이동
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', function() {
            currentSlide = i;
            showSlide(currentSlide);
            // 클릭 시 인터벌 리셋
            if (slideInterval) clearInterval(slideInterval);
            if (slides.length > 1) {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 6000);
            }
        });
    });

    // 자동 로테이션 (슬라이드 1개 초과 시)
    if (slides.length > 1) {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 6000);
    }

    // ===== 히어로 슬라이더 키보드 화살표 =====
    if (slides.length > 1) {
        document.addEventListener('keydown', (e) => {
            if (!document.querySelector('.hero:hover') && document.activeElement.closest('.hero') === null) return;
            if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
                if (slideInterval) clearInterval(slideInterval);
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 6000);
            } else if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
                if (slideInterval) clearInterval(slideInterval);
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 6000);
            }
        });
    }

    // ===== 히어로 슬라이더 터치/스와이프 =====
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider && slides.length > 1) {
        let heroTouchStartX = 0;
        heroSlider.addEventListener('touchstart', (e) => {
            heroTouchStartX = e.touches[0].clientX;
        }, { passive: true });
        heroSlider.addEventListener('touchend', (e) => {
            const diffX = heroTouchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diffX) < 50) return; // 최소 스와이프 거리 50px
            if (diffX > 0) {
                currentSlide = (currentSlide + 1) % slides.length;
            } else {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            }
            showSlide(currentSlide);
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 6000);
        }, { passive: true });
    }

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== 페이지 전환 fade-out =====
    document.querySelectorAll('a[href*="artwork-detail.html"], a[href*="index.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // 외부 링크, 앵커 링크, target=_blank 제외
            if (!href || href.startsWith('#') || href.startsWith('http') || this.target === '_blank') return;
            e.preventDefault();
            document.body.classList.remove('page-loaded');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

    // Preload critical images
    const criticalImages = [
        './img/01.webp',
        './img/gallery/01.webp',
        './img/makeing/01.webp'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}