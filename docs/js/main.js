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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.top-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }

        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(245, 240, 232, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(28,28,28,0.07)';
        } else {
            navbar.style.background = 'rgba(245, 240, 232, 0.97)';
            navbar.style.boxShadow = 'none';
        }

        // Logo shrink effect on scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
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
        item.addEventListener('click', function() {
            const artworkId = this.getAttribute('data-artwork-id');
            if (artworkId) {
                saveScrollPosition();
                sessionStorage.setItem('clickedArtworkId', artworkId);
                window.location.href = `./artwork-detail.html?id=${artworkId}`;
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

        // Add right-click event for menu functionality (alternative)
        primaryMenuBtn.addEventListener('contextmenu', function(e) {
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

    // Bottom navigation scroll behavior
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight * 0.3) {
                bottomNav.style.opacity = '1';
                bottomNav.style.visibility = 'visible';
            } else {
                bottomNav.style.opacity = '0.8';
                bottomNav.style.visibility = 'visible';
            }
        });
    }

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

        // Language option selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');

                if (window.i18n) {
                    window.i18n.setLanguage(selectedLang);
                    updateLanguageButton();
                }

                languageDropdown.classList.remove('show');
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

    // Hero slider functionality (if multiple slides are added)
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }

    // Auto-rotate slides (if more than one slide exists)
    if (slides.length > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
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