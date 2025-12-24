// Hanji Craft - Optimized JavaScript with WebP Support
document.addEventListener('DOMContentLoaded', function() {
    // WebP 지원 확인
    function supportsWebP() {
        return new Promise(resolve => {
            const webp = new Image();
            webp.onload = webp.onerror = () => resolve(webp.height === 2);
            webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

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

    // WebP 지원 확인 및 이미지 로딩 초기화
    supportsWebP().then(isWebPSupported => {
        // 로드된 이미지를 추적하는 Set
        const loadedImages = new Set();

        // 이미지 lazy loading을 위한 Intersection Observer
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const elementId = element.dataset.imageId;

                    // 이미 로드된 이미지는 완전히 건너뛰고 관찰 중단
                    if (loadedImages.has(elementId) || element.classList.contains('image-loaded')) {
                        imageObserver.unobserve(element);
                        return;
                    }

                    // 백그라운드 이미지가 있는 요소 처리
                    if (element.dataset.bg) {
                        let imageSrc = element.dataset.bg;

                        // WebP를 지원하지 않는 경우 JPEG/JPG로 변경
                        if (!isWebPSupported) {
                            imageSrc = imageSrc.replace(/\.webp$/i, '.jpeg');
                        }

                        // 이미지 로딩 상태 표시
                        element.classList.add('image-loading');

                        // 큰 이미지를 위한 점진적 로딩
                        const img = new Image();

                        // 로딩 시작 시간 추적
                        const loadStartTime = Date.now();
                        let loadTimeout;

                        img.onload = () => {
                            clearTimeout(loadTimeout);

                            // 이미지 설정
                            element.style.backgroundImage = `url('${imageSrc}')`;
                            element.style.backgroundSize = 'cover';
                            element.style.backgroundPosition = 'center';

                            // 로딩 상태 제거 및 완료 상태 추가
                            element.classList.remove('image-loading');
                            element.classList.add('image-loaded');

                            // 최종 스타일 고정 (더 이상 변경되지 않음)
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                            element.style.transition = 'none';

                            // 로드 완료 추적
                            loadedImages.add(elementId);

                            // 즉시 관찰 중단
                            imageObserver.unobserve(element);

                            console.log(`Image loaded in ${Date.now() - loadStartTime}ms: ${imageSrc}`);
                        };

                        img.onerror = () => {
                            clearTimeout(loadTimeout);
                            element.classList.remove('image-loading');
                            element.classList.add('image-error');
                            imageObserver.unobserve(element);
                            console.warn(`Failed to load image: ${imageSrc}`);
                        };

                        // 대용량 이미지를 위한 타임아웃 (30초)
                        loadTimeout = setTimeout(() => {
                            element.classList.remove('image-loading');
                            element.classList.add('image-timeout');
                            imageObserver.unobserve(element);
                            console.warn(`Image load timeout: ${imageSrc}`);
                        }, 30000);

                        // 이미지 로딩 시작
                        img.src = imageSrc;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '200px 0px' // 더 넓은 영역에서 미리 로딩 시작
        });

        // 이미지 우선순위 큐 (작은 이미지부터 로딩)
        const imageQueue = [];
        let isProcessingQueue = false;

        function processImageQueue() {
            if (isProcessingQueue || imageQueue.length === 0) return;

            isProcessingQueue = true;
            const nextImage = imageQueue.shift();

            // 큐에서 다음 이미지 처리 후 잠시 대기
            setTimeout(() => {
                isProcessingQueue = false;
                processImageQueue(); // 다음 이미지 처리
            }, 100); // 100ms 간격으로 순차 로딩
        }

        // 모든 백그라운드 이미지 요소에 lazy loading 적용
        document.querySelectorAll('.product-image-full, .split-image, .gallery-item, .hero-section').forEach((element, index) => {
            // 현재 background-image URL 추출
            const bgImage = getComputedStyle(element).backgroundImage;
            const urlMatch = bgImage.match(/url\(['"]?(.+?)['"]?\)/);

            if (urlMatch && urlMatch[1]) {
                // 고유 ID 생성
                const imageId = `img-${index}-${Date.now()}`;
                element.dataset.imageId = imageId;

                // 원본 이미지 URL을 data 속성에 저장
                element.dataset.bg = urlMatch[1];

                // 초기에는 이미지 제거 및 로딩 상태 설정
                element.style.backgroundImage = 'none';
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
                element.style.backgroundColor = 'var(--gray-light)';

                // Hero 섹션은 즉시 로드
                if (element.classList.contains('hero-section')) {
                    element.style.opacity = '0';
                    let heroImageSrc = element.dataset.bg;
                    if (!isWebPSupported) {
                        heroImageSrc = heroImageSrc.replace(/\.webp$/i, '.jpeg');
                    }

                    const heroImg = new Image();
                    heroImg.onload = () => {
                        element.style.backgroundImage = `url('${heroImageSrc}')`;
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        element.classList.add('image-loaded');
                        loadedImages.add(imageId);
                    };
                    heroImg.src = heroImageSrc;
                } else {
                    // 다른 이미지들은 lazy loading
                    imageObserver.observe(element);
                }
            }
        });

        // 이미지 프리로딩 (중요한 첫 번째 이미지만)
        const criticalImage = new Image();
        criticalImage.src = isWebPSupported ? './img/01.webp' : './img/01.jpeg';
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

    // Connection hint for better loading
    const prefetch = document.createElement('link');
    prefetch.rel = 'dns-prefetch';
    prefetch.href = './img';
    document.head.appendChild(prefetch);

    // 메모리 사용량 모니터링 (가능한 경우)
    if ('memory' in performance) {
        const memoryInfo = performance.memory;
        console.log(`Memory usage: ${(memoryInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`);
    }

    // 네트워크 상태 감지 (가능한 경우)
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            console.warn('Slow network detected, reducing image quality...');
            document.documentElement.classList.add('slow-network');
        }
    }
});