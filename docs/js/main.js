// Hanji Craft - Optimized JavaScript with WebP Support and Multi-language

// 전역 에러 핸들러 - 브라우저 확장 프로그램 충돌 방지
window.addEventListener('error', function(event) {
    // Solana Actions나 기타 확장 프로그램 에러 무시
    if (event.filename && (
        event.filename.includes('solanaActionsContentScript') ||
        event.filename.includes('chrome-extension') ||
        event.filename.includes('moz-extension') ||
        event.filename.includes('safari-extension')
    )) {
        event.preventDefault();
        return false;
    }
});

// unhandled promise rejection 에러 핸들러
window.addEventListener('unhandledrejection', function(event) {
    // 확장 프로그램 관련 에러 무시
    if (event.reason && event.reason.stack && (
        event.reason.stack.includes('solanaActionsContentScript') ||
        event.reason.stack.includes('chrome-extension') ||
        event.reason.stack.includes('extension')
    )) {
        event.preventDefault();
        return false;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 안전한 실행을 위한 try-catch wrapper
    try {
    // 다국어 번역 데이터
    const translations = {
        ko: {
            brand: "한지공예",
            nav_collection: "작품집",
            nav_gallery: "전시관",
            nav_about: "소개",
            nav_contact: "연락처",
            hero_title: "한지공예",
            hero_subtitle: "한국 전통 종이 예술",
            product1_title: "한지 장식등",
            product1_subtitle: "여섯빛깔 따스한 등불",
            product1_description: "갈색부터 남빛까지, 여섯 가지 색깔의 한지 장식등으로 만든 특별한 작품입니다. 각각의 등불은 정교한 바둑판 무늬를 통해 따스한 빛을 내어 공간에 온기를 더해줍니다.",
            product2_title: "한지 매듭장식",
            product2_description: "삼각 한지와 전통 매듭이 어우러진 아름다운 장식품입니다. 은은한 빛깔의 한지가 공중에 떠 있는 듯한 우아함을 연출하며, 바람에 흔들리는 모습이 마치 살아 숨쉬는 예술품 같습니다.",
            product3_title: "한지 등불 모음",
            product3_subtitle: "조화로운 빛의 어울림",
            product3_description: "여섯 개의 한지 등불이 하나의 작품을 이루는 조명 세트입니다. 저마다 다른 빛깔과 무늬가 어우러지며, 나무 받침이 더욱 품격 있는 분위기를 만들어냅니다.",
            product4_title: "한지 풍등",
            product4_description: "전통 한지의 자연스러운 결을 살린 네모 풍등입니다. 정교한 바둑판 무늬를 통해 스며 나오는 빛이 온 공간을 따뜻하고 포근하게 감싸줍니다.",
            product5_title: "한지 매듭 장식",
            product5_subtitle: "전통 매듭의 현대적 해석",
            product5_description: "꽃무늬 전통 매듭과 삼각 한지가 어우러진 장식품입니다. 자연스러운 손길과 함께 담겨진 이 작품은 일상 속에서 누리는 한지 공예의 아름다움을 보여줍니다.",
            product6_title: "오색 한지 조각",
            product6_description: "빨강, 노랑, 초록, 파랑 등 여러 빛깔의 한지로 만든 삼각 조각 작품들입니다. 하나하나도 아름답지만, 함께 모였을 때 더욱 화려하고 생동감 넘치는 작품이 됩니다.",
            product7_title: "한지 삼각 장식",
            product7_subtitle: "소담한 아름다움의 정수",
            product7_description: "분홍빛과 회색빛 한지로 만든 삼각 장식입니다. 간결하면서도 세련된 멋으로 현대적인 공간에 잘 어울리며, 은은한 빛깔이 차분한 분위기를 자아냅니다.",
            product8_title: "한지 삼각 예술품",
            product8_description: "무지개빛 한지 삼각들이 자유롭게 배치된 현대적 예술 작품입니다. 전통 한지가 지닌 자연스러운 결과 선명한 빛깔이 어우러져, 보는 각도마다 다른 느낌을 주는 생동감 넘치는 작품입니다.",
            gallery_title: "전시관",
            gallery_subtitle: "한지공예의 다양한 작품들을 한눈에 감상하세요",
            contact_title: "연락처",
            contact_phone: "전화: 02-123-4567",
            contact_email: "이메일: info@hanjicraft.com",
            contact_address: "주소: 서울시 종로구 전통공예로 123"
        },
        en: {
            brand: "Hanji Craft",
            nav_collection: "Collection",
            nav_gallery: "Gallery",
            nav_about: "About",
            nav_contact: "Contact",
            hero_title: "Hanji Craft",
            hero_subtitle: "Korean Traditional Paper Art",
            product1_title: "Hanji Cube Lighting",
            product1_subtitle: "Illuminating Spaces with Colorful Light",
            product1_description: "A special collection featuring six different colored hanji cube lights, from brown to navy blue. Each light adds personality to your space with unique grid patterns and warm illumination.",
            product2_title: "Hanji Mobile",
            product2_description: "Beautiful mobile decorations combining triangular hanji with traditional knots. The subtle colored hanji creates an elegant floating effect in space, swaying gracefully with the breeze like living artwork.",
            product3_title: "Hanji Cube Light Set",
            product3_subtitle: "Harmonious Ensemble of Light",
            product3_description: "A lighting set where six hanji cubes come together as one artwork. Different colors and patterns create harmony, while wooden bases add a luxurious atmosphere.",
            product4_title: "Hanji Cube Light",
            product4_description: "Cube-shaped lighting that preserves the natural texture of traditional hanji. Light filtering through precise grid patterns creates a warm and cozy atmosphere throughout the space.",
            product5_title: "Hanji Knot Mobile",
            product5_subtitle: "Modern Interpretation of Traditional Knots",
            product5_description: "A mobile combining flower-shaped traditional knots with triangular hanji. Captured with natural hand movements, this piece showcases the beauty of hanji crafts enjoyed in daily life.",
            product6_title: "Colorful Hanji Sculptures",
            product6_description: "Triangular sculpture pieces made from various colored hanji in red, yellow, green, blue, and more. Each piece is beautiful individually, but together they create an even more vibrant and dynamic artwork.",
            product7_title: "Hanji Triangle Mobile",
            product7_subtitle: "The Ultimate in Minimal Beauty",
            product7_description: "A triangular mobile made from pink and gray hanji. With its simple yet sophisticated design, it perfectly complements modern spaces while the subtle colors create a calm atmosphere.",
            product8_title: "Hanji Triangle Art",
            product8_description: "Contemporary art piece featuring rainbow-colored hanji triangles arranged freely. The natural texture and vivid colors of traditional hanji create harmony, offering different impressions from various viewing angles in this dynamic artwork.",
            gallery_title: "Gallery",
            gallery_subtitle: "Appreciate various hanji craft works at a glance",
            contact_title: "Contact",
            contact_phone: "Phone: 02-123-4567",
            contact_email: "Email: info@hanjicraft.com",
            contact_address: "Address: 123 Traditional Craft St, Jongno-gu, Seoul"
        }
    };

    // 현재 언어 설정 (로컬 스토리지에서 불러오기)
    let currentLanguage = localStorage.getItem('language') || 'ko';

    // 언어 변경 함수
    function changeLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        // 언어 선택자 업데이트
        document.getElementById('languageSelector').value = lang;

        // 모든 번역 가능한 요소 업데이트
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        console.log(`Language changed to: ${lang}`);
    }

    // 언어 선택자 이벤트 리스너
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', function(e) {
            changeLanguage(e.target.value);

            // 언어 변경 후 모바일 메뉴 닫기
            setTimeout(function() {
                if (typeof closeNavbarMenu === 'function') {
                    closeNavbarMenu();
                }
            }, 100);
        });
    }

    // 초기 언어 설정 적용
    changeLanguage(currentLanguage);

    // 햄버거 메뉴 자동 닫기 기능
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // 메뉴 닫기 헬퍼 함수
    function closeNavbarMenu() {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // Bootstrap이 로드된 경우 Bootstrap 방식 사용
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
            // Bootstrap이 없는 경우 직접 클래스 제거
            else {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }

    // 스크롤 시 메뉴 닫기
    window.addEventListener('scroll', closeNavbarMenu);

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(event) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // 클릭한 요소가 네비게이션 내부가 아닌 경우
            const navbar = document.querySelector('.navbar');
            if (!navbar.contains(event.target)) {
                closeNavbarMenu();
            }
        }
    });

    // 네비게이션 링크 클릭 시 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // 약간의 지연을 두어 부드러운 스크롤 후 메뉴 닫기
            setTimeout(closeNavbarMenu, 100);
        });
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeNavbarMenu();
        }
    });
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

        // 이미지 lazy loading을 위한 Intersection Observer - 한 번만 실행되도록 설정
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const elementId = element.dataset.imageId;

                    // 이미 로드된 이미지는 완전히 건너뛰고 관찰 중단
                    if (loadedImages.has(elementId) ||
                        element.classList.contains('image-loaded') ||
                        element.hasAttribute('data-permanently-loaded')) {
                        imageObserver.unobserve(element);
                        console.log(`Skipping already loaded image: ${elementId}`);
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

                            // 최종 스타일 완전 고정 - 더 이상 변경되지 않도록 강제
                            element.style.setProperty('opacity', '1', 'important');
                            element.style.setProperty('transform', 'translateY(0) translateZ(0)', 'important');
                            element.style.setProperty('transition', 'none', 'important');
                            element.style.setProperty('animation', 'none', 'important');
                            element.style.setProperty('will-change', 'auto', 'important');
                            element.style.setProperty('filter', 'none', 'important');

                            // 추가 정적 속성 설정 - 강제로 !important 적용
                            element.style.setProperty('backface-visibility', 'visible', 'important');
                            element.style.setProperty('transform-style', 'flat', 'important');
                            element.style.setProperty('contain', 'none', 'important');
                            element.style.setProperty('content-visibility', 'visible', 'important');

                            // 로드 완료 추적
                            loadedImages.add(elementId);

                            // 즉시 관찰 중단 - 영구적으로
                            imageObserver.unobserve(element);

                            // 요소에 완료 플래그 추가
                            element.setAttribute('data-permanently-loaded', 'true');

                            console.log(`Image permanently loaded in ${Date.now() - loadStartTime}ms: ${imageSrc}`);
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
                        element.style.transform = 'scale(1) translateZ(0)';
                        element.style.transition = 'none';
                        element.style.animation = 'none';
                        element.style.willChange = 'auto';
                        element.style.filter = 'none';
                        element.classList.add('image-loaded');
                        loadedImages.add(imageId);
                    };
                    heroImg.src = heroImageSrc;
                } else {
                    // 다른 이미지들은 lazy loading - 이미 로드되지 않은 경우만
                    if (!element.classList.contains('image-loaded') &&
                        !element.hasAttribute('data-permanently-loaded') &&
                        !loadedImages.has(imageId)) {
                        imageObserver.observe(element);
                        console.log(`Observing image: ${imageId}`);
                    } else {
                        console.log(`Already loaded, skipping observation: ${imageId}`);
                    }
                }
            }
        });

        // 이미지 프리로딩 (중요한 첫 번째 이미지만)
        const criticalImage = new Image();
        criticalImage.src = isWebPSupported ? './img/01.webp' : './img/01.jpeg';

        // 대용량 이미지에 대한 추가 최적화
        const largeImageElements = document.querySelectorAll('.product-image-05, .product-image-06, .product-image-07, .product-image-08');
        largeImageElements.forEach(element => {
            // 대용량 이미지들은 뷰포트에 더 가까워질 때까지 로딩 지연
            if (imageObserver && element) {
                imageObserver.unobserve(element);

                // 더 제한적인 옵저버로 재관찰
                const largeImageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            const imageId = el.dataset.imageId;

                            if (!loadedImages.has(imageId) && !el.classList.contains('image-loaded')) {
                                // 원래 이미지 로더 로직 실행
                                imageObserver.observe(el);
                            }
                            largeImageObserver.unobserve(el);
                        }
                    });
                }, {
                    threshold: 0.05, // 더 늦게 로딩 시작
                    rootMargin: '100px 0px' // 더 좁은 마진
                });

                largeImageObserver.observe(element);
            }
        });
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

    } catch (error) {
        // 실행 중 오류 발생 시 콘솔에만 로그하고 사용자에게는 영향 주지 않음
        console.error('Website script error:', error);

        // 기본적인 언어 기능은 유지
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.addEventListener('change', function() {
                location.reload(); // 간단한 페이지 새로고침으로 언어 변경
            });
        }
    }
});