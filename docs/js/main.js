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
            nav_collection: "컬렉션",
            nav_gallery: "갤러리",
            nav_about: "소개",
            nav_contact: "연락처",
            hero_title: "한지공예",
            hero_subtitle: "한국 전통 종이 예술",
            product1_title: "한지 조명",
            product1_subtitle: "천년의 빛을 품은 전통 조명",
            product1_description: "천연 닥나무 섬유로 제작된 한지가 만들어내는 부드럽고 따뜻한 광색. 전통 제지 기법과 현대적 조명 설계가 만나 탄생한 혁신적 조명 솔루션입니다.",
            product2_title: "한지 꽃",
            product2_description: "시간이 흘러도 변치 않는 아름다움. 숙련된 장인이 100% 한지로 정교하게 제작한 예술 작품으로, 자연의 생명력을 영구히 간직합니다. 전통 한지 공예의 섬세함과 현대적 미감이 조화롭게 어우러진 독특한 작품입니다.",
            product3_title: "한지 보관함",
            product3_subtitle: "전통 기법의 현대적 해석",
            product3_description: "1,000년 전통의 한지 제작 기법으로 탄생한 최고급 보관함. 습도 조절 기능과 방충 효과를 갖춘 천연 보존 시스템입니다.",
            product4_title: "한지 액자",
            product4_description: "천년 역사의 전통 문양과 현대적 미감이 어우러진 프리미엄 액자. 한지 특유의 자연스러운 질감이 작품의 가치를 한층 더 높여줍니다. 예술과 전통이 만나 완성된 격조 높은 인테리어 솔루션입니다.",
            product5_title: "한지 인형",
            product5_subtitle: "한국의 정신을 담은 예술품",
            product5_description: "조선 시대 궁중 복식을 완벽히 재현한 프리미엄 한지 인형. 전통 의상의 세부 디테일까지 정교하게 표현하여 한국 문화의 우아함을 선사합니다.",
            product6_title: "한지 조각품",
            product6_description: "한지의 무한한 가능성을 보여주는 현대적 조각 작품. 전통 재료가 현대 예술과 만나 창조하는 새로운 형태의 아름다움입니다. 공간에 자연스러운 따뜻함과 깊이를 더하는 인테리어 오브제로 완벽합니다.",
            product7_title: "한지 장신구",
            product7_subtitle: "일상에 스며드는 전통의 아름다움",
            product7_description: "한지로 만든 섬세하고 우아한 장신구 컬렉션. 가벼우면서도 견고하며, 자연스러운 질감이 돋보이는 독특한 액세서리입니다.",
            product8_title: "한지 예술품",
            product8_description: "한지 공예의 정점을 보여주는 마스터피스 컬렉션. 수십 년간 축적된 장인의 기법과 예술적 감성이 조화롭게 어우러진 한국 전통 문화의 진수를 담은 특별한 작품입니다.",
            gallery_title: "갤러리",
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
            product1_title: "Hanji Lamp",
            product1_subtitle: "Traditional Lighting with Millennium Light",
            product1_description: "Soft and warm light created by hanji made from natural mulberry fibers. An innovative lighting solution born from the meeting of traditional papermaking techniques and modern lighting design.",
            product2_title: "Hanji Flower",
            product2_description: "Beauty that never fades with time. Artistic works meticulously crafted from 100% hanji by skilled artisans, eternally preserving the vitality of nature. A unique work where the delicacy of traditional hanji crafts harmoniously blends with modern aesthetics.",
            product3_title: "Hanji Storage",
            product3_subtitle: "Modern Interpretation of Traditional Techniques",
            product3_description: "Premium storage boxes created with 1,000-year-old hanji crafting techniques. A natural preservation system with humidity control and insect-repelling effects.",
            product4_title: "Hanji Frame",
            product4_description: "Premium frames where traditional patterns with thousand-year history meet modern aesthetics. The natural texture unique to hanji further enhances the value of artworks. An elegant interior solution completed through the meeting of art and tradition.",
            product5_title: "Hanji Doll",
            product5_subtitle: "Artwork Embodying Korean Spirit",
            product5_description: "Premium hanji dolls perfectly recreating Joseon Dynasty court attire. Meticulously expressing even the finest details of traditional clothing to present the elegance of Korean culture.",
            product6_title: "Hanji Sculpture",
            product6_description: "Modern sculptural works showcasing the infinite possibilities of hanji. New forms of beauty created when traditional materials meet contemporary art. Perfect as interior objects that add natural warmth and depth to spaces.",
            product7_title: "Hanji Jewelry",
            product7_subtitle: "Traditional Beauty Permeating Daily Life",
            product7_description: "A delicate and elegant jewelry collection made from hanji. Light yet durable, unique accessories with outstanding natural texture.",
            product8_title: "Hanji Art",
            product8_description: "Masterpiece collection showcasing the pinnacle of hanji craftsmanship. Special works containing the essence of Korean traditional culture, where decades of accumulated artisan techniques harmoniously blend with artistic sensibility.",
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
        });
    }

    // 초기 언어 설정 적용
    changeLanguage(currentLanguage);
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

                            // 최종 스타일 완전 고정 - 더 이상 변경되지 않도록 강제
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0) translateZ(0)';
                            element.style.transition = 'none';
                            element.style.animation = 'none';
                            element.style.willChange = 'auto'; // GPU 레이어 최적화 중단
                            element.style.filter = 'none'; // 모든 필터 제거

                            // 추가 정적 속성 설정
                            element.style.backfaceVisibility = 'visible';
                            element.style.transformStyle = 'flat';

                            // 로드 완료 추적
                            loadedImages.add(elementId);

                            // 즉시 관찰 중단
                            imageObserver.unobserve(element);

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