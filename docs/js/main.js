// Main JavaScript for Hanji Craft Museum Website

document.addEventListener('DOMContentLoaded', function() {

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
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.highlight-card, .collection-item, .masterpiece-item');
    animatedElements.forEach(el => {
        observer.observe(el);
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

    // Bottom navigation scroll behavior
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight) {
                bottomNav.style.opacity = '1';
                bottomNav.style.visibility = 'visible';
            } else {
                bottomNav.style.opacity = '0';
                bottomNav.style.visibility = 'hidden';
            }
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