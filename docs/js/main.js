// Hanji Craft - Optimized JavaScript with Image Loading
document.addEventListener('DOMContentLoaded', function() {
    // 스무스 스크롤링
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 이미지 lazy loading을 위한 Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // 백그라운드 이미지가 있는 요소 처리
                if (element.dataset.bg) {
                    element.style.backgroundImage = `url('${element.dataset.bg}')`;
                    element.classList.add('loaded');
                }

                // 페이드 인 효과
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';

                imageObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });

    // 모든 백그라운드 이미지 요소에 lazy loading 적용
    document.querySelectorAll('.product-image-full, .split-image, .gallery-item, .hero-section').forEach((element, index) => {
        // 현재 background-image URL 추출
        const bgImage = getComputedStyle(element).backgroundImage;
        const urlMatch = bgImage.match(/url\(['"]?(.+?)['"]?\)/);

        if (urlMatch && urlMatch[1]) {
            // 원본 이미지 URL을 data 속성에 저장
            element.dataset.bg = urlMatch[1];

            // 초기에는 이미지 제거 및 로딩 상태 설정
            element.style.backgroundImage = 'none';
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            element.style.backgroundColor = 'var(--gray-light)';

            // 관찰 시작
            imageObserver.observe(element);
        }
    });

    // 네비게이션 스크롤 효과
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // 제품 오버레이 애니메이션
    const productOverlays = document.querySelectorAll('.product-overlay');
    const overlayObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    productOverlays.forEach(overlay => {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(30px)';
        overlay.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        overlayObserver.observe(overlay);
    });

    // 이미지 프리로딩 (중요한 첫 번째 이미지만)
    const criticalImage = new Image();
    criticalImage.src = './img/01.jpeg';

    // Connection hint for better loading
    const prefetch = document.createElement('link');
    prefetch.rel = 'dns-prefetch';
    prefetch.href = './img';
    document.head.appendChild(prefetch);
});