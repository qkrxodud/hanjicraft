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
            nav_about: "브랜드 소개",
            nav_making: "제작 과정",
            nav_contact: "연락처",
            hero_title: "한지공예",
            hero_subtitle: "한국 전통 종이 예술",
            product1_title: "우담바라꽃",
            product1_subtitle: "3천 년에 한 번 핀다는 전설 속의 성스러운 꽃",
            product1_description: "수공예적 질감과 은은한 색감, 찻잔을 돋보이게 하는 간결하고 우아한 형태가 특징입니다.",
            product2_title: "모시풍경",
            product2_description: "모시로 엮은 복주머니 형태의 풍경으로, 복을 바람에 가져 오라는 의미를 담았습니다. <br>1. 창가에 걸어두면 자연광에 우아하게 투과되는 모시의 질감이 한국적 단아함과 순수함을 뜻합니다.<br>" +
                "2. 시끄러운 일상 속 쉼표를 찍어주듯, 한국의 고즈넉한 정서와 '멈추지 않는 그리움'의 미를 담습니다.<br>" +
                "3. 한 땀 한 땀 정성으로 접은 모시 조각들은, 사랑하는 이에게 복을 빌어주던 복주머니를 닮았습니다.<br>" +
                "4. 창가에 걸어두면 은은하게 울리는 맑은 종소리가 공간을 정화하고, 마음속 평온을 선사할 것입니다." +
                "\n",
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
            about_description: "일상 오브제로 한국 전통을 세계에 전하는 공예 스튜디오\n" +
                "                (한지·모시·옻칠)\n" +
                "                대학에서 산업디자인을 전공하고 디자인 분야에 종사하던 사람이 우연히 전통공예, 특히 한지공예의 매력에 빠져 20년간 활동해 왔습니다.\n" +
                "                '세계 속의 한국'을 모토로 최근 홍현정한지공예연구소를 설립하고, 한지와 섬유를 주 재료로 사용하여 전통공예의 색감과 결을 현대적 트렌드에 맞춘 디자인으로 승화시키고 있습니다.\n" +
                "                주로 젊은 세대와 외국인에게 친근한 소품 위주로 작업하며, 북미, 남미, 포르투갈 등 다양한 국가에 작품을 판매하며해외 진출을 시작했습니다.\n" +
                "                나아가 K컬처에 발맞춰 한지와 모시를 이용한 풍경 제작에 주력하며, 최종 비전인 '세계 속의 한국 문화'를 널리 알리는 데 힘쓰고 있습니다.",
            contact_title: "연락처",
            contact_phone: "전화: 02-123-4567",
            contact_email: "이메일: info@hanjicraft.com",
            contact_address: "주소: 서울시 종로구 전통공예로 123",
            making_title: "제작 과정",
            making_subtitle: "전통 한지공예의 섬세한 제작 과정을 만나보세요",
            making_step1: "1단계: 재료 준비",
            making_step1_desc: "천연 닥나무 섬유를 선별하고 준비합니다",
            making_step2: "2단계: 한지 제작",
            making_step2_desc: "전통 기법으로 한지를 직접 제작합니다",
            making_step3: "3단계: 디자인 설계",
            making_step3_desc: "작품의 형태와 패턴을 디자인합니다",
            making_step4: "4단계: 절단과 조형",
            making_step4_desc: "정교한 손길로 한지를 자르고 모양을 만듭니다",
            making_step5: "5단계: 조립과 접합",
            making_step5_desc: "각 부분을 정밀하게 조립하고 접합합니다",
            making_step6: "6단계: 세부 장식",
            making_step6_desc: "전통 문양과 장식을 세심하게 추가합니다",
            making_step7: "7단계: 마무리 작업",
            making_step7_desc: "작품을 완성하고 마무리 처리를 합니다",
            making_step8: "8단계: 완성품 검수",
            making_step8_desc: "품질을 확인하고 최종 완성합니다"
        },
        en: {
            brand: "Hanji Craft",
            nav_collection: "Collection",
            nav_gallery: "Gallery",
            nav_about: "Brand Story",
            nav_making: "Making Process",
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
            contact_address: "Address: 123 Traditional Craft St, Jongno-gu, Seoul",
            making_title: "Making Process",
            making_subtitle: "Discover the delicate traditional hanji craft-making process",
            making_step1: "Step 1: Material Preparation",
            making_step1_desc: "Select and prepare natural mulberry fibers",
            making_step2: "Step 2: Hanji Creation",
            making_step2_desc: "Create hanji using traditional techniques",
            making_step3: "Step 3: Design Planning",
            making_step3_desc: "Design the shape and patterns of the artwork",
            making_step4: "Step 4: Cutting & Shaping",
            making_step4_desc: "Cut and shape hanji with precise craftsmanship",
            making_step5: "Step 5: Assembly & Joining",
            making_step5_desc: "Precisely assemble and join each component",
            making_step6: "Step 6: Detail Decoration",
            making_step6_desc: "Carefully add traditional patterns and decorations",
            making_step7: "Step 7: Finishing Work",
            making_step7_desc: "Complete the artwork with final touches",
            making_step8: "Step 8: Quality Inspection",
            making_step8_desc: "Inspect quality and finalize the product"
        },
        fr: {
            brand: "Artisanat Hanji",
            nav_collection: "Collection",
            nav_gallery: "Galerie",
            nav_about: "Histoire de la Marque",
            nav_making: "Processus de Fabrication",
            nav_contact: "Contact",
            hero_title: "Artisanat Hanji",
            hero_subtitle: "Art Traditionnel Coréen du Papier",
            product1_title: "Éclairage Hanji Décoratif",
            product1_subtitle: "Lanternes Chaleureuses aux Six Couleurs",
            product1_description: "Une collection spéciale composée de six lampes décoratives hanji de couleurs différentes, du brun au bleu marine. Chaque lampe apporte une personnalité unique à votre espace grâce à des motifs en damier raffinés qui diffusent une lumière chaleureuse.",
            product2_title: "Mobile Décoratif Hanji",
            product2_description: "Belles décorations mobiles alliant hanji triangulaire et nœuds traditionnels. Le hanji aux couleurs subtiles crée un effet flottant élégant dans l'espace, se balançant gracieusement comme une œuvre d'art vivante.",
            product3_title: "Collection de Lanternes Hanji",
            product3_subtitle: "Harmonie Lumineuse",
            product3_description: "Un ensemble d'éclairage où six lanternes hanji forment une œuvre unique. Différentes couleurs et motifs créent une harmonie, tandis que les bases en bois ajoutent une atmosphère raffinée.",
            product4_title: "Lanterne Hanji",
            product4_description: "Lanterne carrée préservant la texture naturelle du hanji traditionnel. La lumière filtrant à travers des motifs en damier précis crée une atmosphère chaleureuse et confortable dans tout l'espace.",
            product5_title: "Mobile à Nœuds Hanji",
            product5_subtitle: "Interprétation Moderne des Nœuds Traditionnels",
            product5_description: "Un mobile combinant nœuds traditionnels floraux et hanji triangulaire. Cette pièce, capturée avec des gestes naturels, montre la beauté de l'artisanat hanji dans la vie quotidienne.",
            product6_title: "Sculptures Hanji Colorées",
            product6_description: "Pièces sculpturales triangulaires faites de hanji multicolore : rouge, jaune, vert, bleu et plus encore. Chaque pièce est belle individuellement, mais ensemble elles créent une œuvre encore plus vibrante et dynamique.",
            product7_title: "Mobile Triangulaire Hanji",
            product7_subtitle: "L'Essence de la Beauté Minimaliste",
            product7_description: "Un mobile triangulaire fait de hanji rose et gris. Avec son design simple mais sophistiqué, il complète parfaitement les espaces modernes tandis que les couleurs subtiles créent une atmosphère paisible.",
            product8_title: "Art Triangulaire Hanji",
            product8_description: "Œuvre d'art contemporaine présentant des triangles hanji aux couleurs arc-en-ciel disposés librement. La texture naturelle et les couleurs vives du hanji traditionnel créent une harmonie, offrant différentes impressions selon les angles de vue dans cette œuvre dynamique.",
            gallery_title: "Galerie",
            gallery_subtitle: "Appréciez diverses œuvres d'artisanat hanji en un coup d'œil",
            about_title: "Notre Patrimoine",
            about_description: "L'artisanat hanji est un art qui incarne l'essence de la culture traditionnelle coréenne. En réinterprétant des techniques traditionnelles millénaires avec une sensibilité moderne, il présente une beauté intemporelle qui transcende le temps.\n\nComme artisanat écologique et durable fait de matériaux naturels, il offre une valeur spéciale qui se mélange harmonieusement avec le mode de vie des gens modernes.",
            contact_title: "Contact",
            contact_phone: "Téléphone: 02-123-4567",
            contact_email: "Email: info@hanjicraft.com",
            contact_address: "Adresse: 123 Rue de l'Artisanat Traditionnel, Jongno-gu, Séoul",
            making_title: "Processus de Fabrication",
            making_subtitle: "Découvrez le délicat processus de fabrication de l'artisanat hanji traditionnel",
            making_step1: "Étape 1: Préparation des Matériaux",
            making_step1_desc: "Sélectionner et préparer les fibres naturelles de mûrier",
            making_step2: "Étape 2: Création du Hanji",
            making_step2_desc: "Créer le hanji selon les techniques traditionnelles",
            making_step3: "Étape 3: Conception du Design",
            making_step3_desc: "Concevoir la forme et les motifs de l'œuvre",
            making_step4: "Étape 4: Découpage et Façonnage",
            making_step4_desc: "Découper et façonner le hanji avec un savoir-faire précis",
            making_step5: "Étape 5: Assemblage et Jointure",
            making_step5_desc: "Assembler et joindre précisément chaque composant",
            making_step6: "Étape 6: Décoration Détaillée",
            making_step6_desc: "Ajouter soigneusement des motifs et décorations traditionnels",
            making_step7: "Étape 7: Finitions",
            making_step7_desc: "Compléter l'œuvre avec les touches finales",
            making_step8: "Étape 8: Contrôle Qualité",
            making_step8_desc: "Inspecter la qualité et finaliser le produit"
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

    // 이미지 모달 기능
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.image-modal-close');

    // 요소가 존재하는지 확인
    if (imageModal && modalImage && modalClose) {
        console.log('Modal elements found successfully');

        // 클릭 가능한 이미지들 선택 (히어로 이미지 제외)
        const clickableImages = document.querySelectorAll('.product-img, .split-img, .gallery-img, .making-img');
        console.log('Clickable images found:', clickableImages.length);

        // 이미지 클릭 이벤트
        clickableImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault(); // 기본 동작 방지
                e.stopPropagation(); // 이벤트 전파 방지

                console.log('Image clicked:', this.src);

                try {
                    imageModal.style.display = 'block';
                    modalImage.src = this.src;
                    modalImage.alt = this.alt;

                    console.log('Modal displayed');

                    // 즉시 표시하고 페이드인은 제거 (문제 해결을 위해)
                    modalImage.style.opacity = '1';

                    // 배경 스크롤 방지는 제거 (문제가 될 수 있음)
                    // document.body.style.overflow = 'hidden';
                } catch (error) {
                    console.error('Modal open error:', error);
                }
            });
        });
        // 모달 닫기 이벤트
        function closeModal() {
            try {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // 스크롤 복원
                modalImage.src = ''; // 메모리 정리
                modalImage.style.opacity = '1'; // 초기화
                console.log('Modal closed');
            } catch (error) {
                console.error('Modal close error:', error);
            }
        }

        // 닫기 버튼 클릭
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });

        // 모달 배경 클릭 시 닫기
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            }
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.style.display === 'block') {
                e.preventDefault();
                closeModal();
            }
        });
    } else {
        console.error('Modal elements not found');
    }

    // 부드러운 스크롤과 네비게이션 개선
    let lastScrollY = window.scrollY;
    const navbarEl = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 스크롤 방향에 따라 네비게이션 스타일 조정
        if (currentScrollY > 100) {
            navbarEl.style.background = 'rgba(255, 255, 255, 0.98)';
            navbarEl.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            navbarEl.style.background = 'rgba(255, 255, 255, 0.95)';
            navbarEl.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

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
                './img/03.webp',
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