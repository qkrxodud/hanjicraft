// Hanji Craft - Simplified JavaScript with Native Lazy Loading

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

    // Service Worker 등록 (이미지 캐싱)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('[SW] Registration successful:', registration);

                // Service Worker가 활성화되면 백그라운드 캐싱 시작
                if (registration.active) {
                    registration.active.postMessage({
                        type: 'CACHE_REMAINING_IMAGES'
                    });
                }
            })
            .catch(error => {
                console.log('[SW] Registration failed:', error);
            });
    }
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
            about_title: "우리의 전통",
            about_description: "한지공예는 한국 전통 문화의 정수를 담은 예술입니다. 천년의 세월을 이어온 전통 기법을 현대적 감각으로 재해석하여, 시간을 초월한 아름다움을 선사합니다.\n\n자연에서 얻은 재료로 만드는 친환경적이고 지속 가능한 공예품으로, 현대인의 라이프스타일에 조화롭게 어우러지는 특별한 가치를 제공합니다.",
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
            about_title: "Our Heritage",
            about_description: "Hanji craft is an art form that embodies the essence of Korean traditional culture. By reinterpreting thousand-year-old traditional techniques with modern sensibilities, it presents timeless beauty that transcends time.\n\nAs eco-friendly and sustainable crafts made from natural materials, they provide special value that harmoniously blends with the lifestyle of modern people.",
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
                // HTML에서 개행 문자 처리
                const translatedText = translations[lang][key].replace(/\n\n/g, '<br><br>');

                // HTML이 포함된 경우 innerHTML 사용, 아니면 textContent 사용
                if (translatedText.includes('<br>')) {
                    element.innerHTML = translatedText;
                } else {
                    element.textContent = translatedText;
                }
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

    // Progressive Image Loading Enhancement
    // 이미지가 뷰포트에 들어올 때 우선순위 높이기
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // 페이드인 애니메이션
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '0';

                    // 이미지 로드 완료 시 페이드인
                    const handleLoad = () => {
                        img.style.opacity = '1';
                        img.removeEventListener('load', handleLoad);
                    };

                    // 이미 로드된 이미지 처리
                    if (img.complete) {
                        img.style.opacity = '1';
                    } else {
                        img.addEventListener('load', handleLoad);
                    }

                    // 관찰 중단
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // 50px 미리 로딩 시작
        });

        // 모든 이미지에 옵서버 적용
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 이미지 프리로딩 - 유저 상호작용 후 백그라운드에서 실행
    let preloadTriggered = false;
    const triggerPreload = () => {
        if (preloadTriggered) return;
        preloadTriggered = true;

        setTimeout(() => {
            // 아직 로드되지 않은 이미지들을 백그라운드에서 미리 로드
            const imagesToPreload = [
                './img/04.webp',
                './img/05.webp',
                './img/06.webp',
                './img/07.webp',
                './img/08.webp'
            ];

            imagesToPreload.forEach((src, index) => {
                setTimeout(() => {
                    const img = new Image();
                    img.src = src;
                    console.log('Preloading image:', src);
                }, index * 200); // 200ms 간격으로 로딩
            });
        }, 1000); // 1초 후 시작
    };

    // 유저 상호작용 시 프리로딩 시작
    ['scroll', 'click', 'mousemove', 'keydown'].forEach(event => {
        document.addEventListener(event, triggerPreload, { once: true });
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

    } catch (error) {
        console.warn('Main script execution failed:', error);
        // 에러 발생 시에도 기본 기능은 유지되도록 함
    }
});