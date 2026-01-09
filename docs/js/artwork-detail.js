// Artwork Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Artwork data with multilingual support
    const artworkData = {
        lamp: {
            ko: {
                title: '바람의결 - 모시풍경',
                description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑) \n 모시의 우아한 실루엣 끝에서 울리는 청아한 종소리.\n 오브제 갯수를 1개 또는 3개 등으로 조정할수 있습니다.',
                story: '모시의 우아한 실루엣과 청아한 종소리는 공간을 차분하게 감싸며 마음에 쉼을 선사할것입니다.\n' +
                    '전통에서 출발한 한국의 미학을 현대적으로 풀어내어, 일상 속 공간에 평온과 행운을 불러옵니다.'
            },
            en: {
                title: 'Wind\'s Edge - Ramie Landscape',
                description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black). \n The elegant silhouette of ramie and the clear sound of bells at the end.\n The number of objects can be adjusted to 1 or 3 pieces.',
                story: 'The elegant silhouette of ramie and the clear sound of bells will gently envelop the space and bring peace to the mind.\n' +
                    'Korean aesthetics rooted in tradition are expressed in a modern way, bringing tranquility and good fortune to everyday spaces.'
            },
            fr: {
                title: 'Bord du Vent - Paysage de Ramie',
                description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir). \n La silhouette élégante du ramie et le son clair des cloches à la fin.\n Le nombre d\'objets peut être ajusté à 1 ou 3 pièces.',
                story: 'La silhouette élégante du ramie et le son clair des cloches envelopperont doucement l\'espace et apporteront la paix à l\'esprit.\n' +
                    'L\'esthétique coréenne enracinée dans la tradition s\'exprime de manière moderne, apportant tranquillité et bonne fortune aux espaces quotidiens.'
            },
            image: './img/02.webp'
        },
        takja: {
            ko: {
                title: '찻상(명상/우담바라를 기다리며)',
                description: '명상 - 우담바라를 기다리며',
                story: '오방색의 생동하는 기운이 대지의 조화를 부르고,\n' +
                    '그 갈망의 끝에 우담바라의 고결한 깨달음이 피어납니다.\n' +
                    '천 년의 한지와 옻칠로 빚은 이 찻상은\n' +
                    '일상의 차 한 잔을 고요한 명상의 여정으로 안내합니다.'
            },
            en: {
                title: 'Traditional Takja (Paper Armor)',
                description: 'This remarkable piece of ceremonial armor demonstrates the incredible strength and versatility of hanji paper. Made entirely from layers of handmade Korean paper, this takja was worn by court officials during important ceremonies.',
                story: 'The construction of this armor required exceptional skill and patience. Hundreds of sheets of hanji were layered and bonded using natural adhesives made from rice starch. The paper was treated with persimmon juice to increase its durability and water resistance. Despite being made entirely of paper, this armor provided significant protection while remaining remarkably lightweight. The intricate patterns visible on the surface represent traditional Korean motifs symbolizing protection and good fortune.'
            },
            fr: {
                title: 'Takja Traditionnel (Armure en Papier)',
                description: 'Cette remarquable pièce d\'armure cérémonielle démontre la force incroyable et la polyvalence du papier hanji. Entièrement fabriquée à partir de couches de papier coréen fait main, cette takja était portée par les fonctionnaires de cour lors d\'importantes cérémonies.',
                story: 'La construction de cette armure nécessitait une compétence exceptionnelle et de la patience. Des centaines de feuilles de hanji ont été stratifiées et liées en utilisant des adhésifs naturels faits d\'amidon de riz. Le papier était traité avec du jus de kaki pour augmenter sa durabilité et sa résistance à l\'eau. Bien qu\'entièrement faite de papier, cette armure offrait une protection significative tout en restant remarquablement légère. Les motifs complexes visibles sur la surface représentent des motifs coréens traditionnels symbolisant la protection et la bonne fortune.'
            },
            image: './img/takja.webp'
        },
        process: {
            ko: {
                title: '경상도골무문 테이블웨어',
                description: '한지와 모시를 결합한 테이블 웨어',
                story: '천년의 한지와 결이 고운 모시를 겹치고 옻칠로 마감하여, 자연의 단단한 생명력을 담았습니다. 옻칠의 깊은 광택과 모시의 섬세한 질감이 어우러진 이 작품은 시간이 흐를수록 견고함과 격조를 더하며 한국적 미학의 정수를 보여줍니다.'
            },
            en: {
                title: 'Master Craftsman at Work',
                description: 'This photograph captures Master Park Soon-ja, a designated Intangible Cultural Property, demonstrating the traditional art of hanji papermaking. Her knowledge represents an unbroken chain of transmission spanning over 30 generations.',
                story: 'Master Park learned the art of hanji making from her grandmother at the age of 12. For over 50 years, she has dedicated her life to preserving and transmitting this ancient craft. The process shown here involves the delicate art of "jongisoji" - the technique of forming each sheet of paper by hand using a bamboo screen called "bal". Every movement is precise, refined through decades of practice. The water temperature, the thickness of the pulp, even the humidity of the air - all factors that Master Park intuitively understands and adjusts for. Her work ensures that this thousand-year-old tradition continues to thrive in the modern world.'
            },
            fr: {
                title: 'Maître Artisan au Travail',
                description: 'Cette photographie capture Maître Park Soon-ja, un Bien Culturel Immatériel désigné, démontrant l\'art traditionnel de la fabrication du papier hanji. Ses connaissances représentent une chaîne ininterrompue de transmission s\'étendant sur plus de 30 générations.',
                story: 'Maître Park a appris l\'art de la fabrication du hanji de sa grand-mère à l\'âge de 12 ans. Pendant plus de 50 ans, elle a consacré sa vie à préserver et transmettre cet artisanat ancien. Le processus montré ici implique l\'art délicat du \"jongisoji\" - la technique de former chaque feuille de papier à la main en utilisant un écran de bambou appelé \"bal\". Chaque mouvement est précis, affiné par des décennies de pratique. La température de l\'eau, l\'épaisseur de la pulpe, même l\'humidité de l\'air - tous des facteurs que Maître Park comprend intuitivement et ajuste. Son travail assure que cette tradition millénaire continue de prospérer dans le monde moderne.'
            },
            image: './img/about.webp'
        },
        neak_circle: {
            ko: {
                title: '지승(紙繩)목걸이',
                description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 목걸이',
                story: '모시의 우아한 실루엣과 청아한 종소리는 공간을 차분하게 감싸며 마음에 쉼을 선사할것입니다.\n' +
                    '전통에서 출발한 한국의 미학을 현대적으로 풀어내어, 일상 속 공간에 평온과 행운을 불러옵니다.'
            },
            en: {
                title: 'Wind\'s Edge - Ramie Landscape',
                description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black). \n The elegant silhouette of ramie and the clear sound of bells at the end.\n The number of objects can be adjusted to 1 or 3 pieces.',
                story: 'The elegant silhouette of ramie and the clear sound of bells will gently envelop the space and bring peace to the mind.\n' +
                    'Korean aesthetics rooted in tradition are expressed in a modern way, bringing tranquility and good fortune to everyday spaces.'
            },
            fr: {
                title: 'Bord du Vent - Paysage de Ramie',
                description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir). \n La silhouette élégante du ramie et le son clair des cloches à la fin.\n Le nombre d\'objets peut être ajusté à 1 ou 3 pièces.',
                story: 'La silhouette élégante du ramie et le son clair des cloches envelopperont doucement l\'espace et apporteront la paix à l\'esprit.\n' +
                    'L\'esthétique coréenne enracinée dans la tradition s\'exprime de manière moderne, apportant tranquillité et bonne fortune aux espaces quotidiens.'
            },
            image: './img/gallery/light_circle.webp'
        },
        circle_ham: {
            ko: {
                title: '지승(紙繩)제기함',
                description: '층층이 쌓인 한지로 만든 의례용 갑옷, 재료의 강도를 보여줌',
                story: '모시의 우아한 실루엣과 청아한 종소리는 공간을 차분하게 감싸며 마음에 쉼을 선사할것입니다.\n' +
                    '전통에서 출발한 한국의 미학을 현대적으로 풀어내어, 일상 속 공간에 평온과 행운을 불러옵니다.'
            },
            en: {
                title: 'Wind\'s Edge - Ramie Landscape',
                description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black). \n The elegant silhouette of ramie and the clear sound of bells at the end.\n The number of objects can be adjusted to 1 or 3 pieces.',
                story: 'The elegant silhouette of ramie and the clear sound of bells will gently envelop the space and bring peace to the mind.\n' +
                    'Korean aesthetics rooted in tradition are expressed in a modern way, bringing tranquility and good fortune to everyday spaces.'
            },
            fr: {
                title: 'Bord du Vent - Paysage de Ramie',
                description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir). \n La silhouette élégante du ramie et le son clair des cloches à la fin.\n Le nombre d\'objets peut être ajusté à 1 ou 3 pièces.',
                story: 'La silhouette élégante du ramie et le son clair des cloches envelopperont doucement l\'espace et apporteront la paix à l\'esprit.\n' +
                    'L\'esthétique coréenne enracinée dans la tradition s\'exprime de manière moderne, apportant tranquillité et bonne fortune aux espaces quotidiens.'
            },
            image: './img/gallery/blue_circle.webp'
        },
        circle_pum: {
            ko: {
                title: '지승(紙繩)풍경',
                description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 풍경',
                story: '모시의 우아한 실루엣과 청아한 종소리는 공간을 차분하게 감싸며 마음에 쉼을 선사할것입니다.\n' +
                    '전통에서 출발한 한국의 미학을 현대적으로 풀어내어, 일상 속 공간에 평온과 행운을 불러옵니다.'
            },
            en: {
                title: 'Wind\'s Edge - Ramie Landscape',
                description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black). \n The elegant silhouette of ramie and the clear sound of bells at the end.\n The number of objects can be adjusted to 1 or 3 pieces.',
                story: 'The elegant silhouette of ramie and the clear sound of bells will gently envelop the space and bring peace to the mind.\n' +
                    'Korean aesthetics rooted in tradition are expressed in a modern way, bringing tranquility and good fortune to everyday spaces.'
            },
            fr: {
                title: 'Bord du Vent - Paysage de Ramie',
                description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir). \n La silhouette élégante du ramie et le son clair des cloches à la fin.\n Le nombre d\'objets peut être ajusté à 1 ou 3 pièces.',
                story: 'La silhouette élégante du ramie et le son clair des cloches envelopperont doucement l\'espace et apporteront la paix à l\'esprit.\n' +
                    'L\'esthétique coréenne enracinée dans la tradition s\'exprime de manière moderne, apportant tranquillité et bonne fortune aux espaces quotidiens.'
            },
            image: './img/two_circle.webp'
        },
        gallery01: {
            ko: {
                title: '한지 모시 무드등',
                description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑)\n한지와 모시를 엮어 만든 전통소재 기반의 은은한 조명 오브제\n 색상은 한국전통오방색을 베이스로 제작합니다.',
                story: '한지와 모시를 엮어 만든 전통 소재의 오브제입니다.\n' +
                    '모시와 한지를 배접하고 죽공예기법으로 엮어 편안한 무드의 빛이 나오도록 표현했습니다. 그리고 보다 내구성을 높인 무드등입니다. '
            },
            en: {
                title: 'Hanji Ramie Mood Lamp',
                description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black)\nA subtle lighting object made from traditional materials combining hanji and ramie\n Colors are made based on traditional Korean five-element colors.',
                story: 'An object made from traditional materials combining hanji and ramie.\n' +
                    'We expressed comfortable mood lighting by backing ramie and hanji and weaving them with bamboo crafting techniques. And it is a more durable mood lamp.'
            },
            fr: {
                title: 'Lampe d\'Ambiance Hanji-Ramie',
                description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir)\nUn objet d\'éclairage subtil fait de matériaux traditionnels combinant hanji et ramie\n Les couleurs sont basées sur les cinq couleurs traditionnelles coréennes.',
                story: 'Un objet fait de matériaux traditionnels combinant hanji et ramie.\n' +
                    'Nous avons exprimé un éclairage d\'ambiance confortable en doublant le ramie et le hanji et en les tissant avec des techniques d\'artisanat de bambou. Et c\'est une lampe d\'ambiance plus durable.'
            },
            image: './img/gallery/01.webp'
        },
        // gallery02: {
        //     ko: {
        //         title: '한지 꽃 장식',
        //         description: '전통 한지를 현대적으로 재해석한 꽃 장식 작품입니다. 한지 특유의 질감을 살려 만든 꽃들은 영원히 시들지 않는 아름다움을 선사합니다.',
        //         story: '이 작품은 전통 한지 제작 기법과 현대적 조형 감각이 만나 탄생했습니다. 작가는 한지를 여러 겹 겹쳐 입체적인 꽃잎을 표현했으며, 천연 염료를 사용해 자연스러운 색감을 구현했습니다. 각각의 꽃은 수작업으로 제작되어 하나하나가 독특한 개성을 지니고 있습니다.'
        //     },
        //     en: {
        //         title: 'Hanji Flower Decoration',
        //         description: 'Flower decoration artwork that reinterprets traditional hanji in a contemporary way. Flowers made utilizing the unique texture of hanji present eternal beauty that never withers.',
        //         story: 'This work was born from the meeting of traditional hanji production techniques and contemporary formative sensibility. The artist expressed three-dimensional petals by layering multiple sheets of hanji and achieved natural colors using natural dyes. Each flower is handcrafted, making each one uniquely individual.'
        //     },
        //     fr: {
        //         title: 'Décoration Florale en Hanji',
        //         description: 'Œuvre de décoration florale qui réinterprète le hanji traditionnel de manière contemporaine. Les fleurs faites en utilisant la texture unique du hanji présentent une beauté éternelle qui ne se fane jamais.',
        //         story: 'Cette œuvre est née de la rencontre entre les techniques traditionnelles de production du hanji et la sensibilité formative contemporaine. L\'artiste a exprimé des pétales tridimensionnels en superposant plusieurs feuilles de hanji et a obtenu des couleurs naturelles en utilisant des teintures naturelles. Chaque fleur est fabriquée à la main, rendant chacune uniquement individuelle.'
        //     },
        //     image: './img/gallery/02.webp'
        // },
        gallery03: {
            ko: {
                title: '한지 조각품 컬렉션',
                description: '한지의 가능성을 탐구한 현대 조각 작품입니다. 전통 재료인 한지를 입체적으로 구성하여 새로운 예술적 가치를 창조했습니다.',
                story: '이 조각품은 한지가 단순한 평면 재료가 아닌 입체적 표현이 가능한 조형 재료임을 보여줍니다. 작가는 수백 장의 한지를 겹겹이 쌓고 접어서 유기적인 형태를 만들어냈으며, 빛의 투과와 반사를 계산하여 시간에 따라 변화하는 작품을 완성했습니다.'
            },
            en: {
                title: 'Hanji Sculpture Collection',
                description: 'Contemporary sculpture work exploring the possibilities of hanji. New artistic value was created by three-dimensionally composing hanji, a traditional material.',
                story: 'This sculpture demonstrates that hanji is not merely a flat material but a formative material capable of three-dimensional expression. The artist created organic forms by layering and folding hundreds of sheets of hanji, and completed a work that changes over time by calculating light transmission and reflection.'
            },
            fr: {
                title: 'Collection de Sculptures en Hanji',
                description: 'Œuvre de sculpture contemporaine explorant les possibilités du hanji. Une nouvelle valeur artistique a été créée en composant de manière tridimensionnelle le hanji, un matériau traditionnel.',
                story: 'Cette sculpture démontre que le hanji n\'est pas simplement un matériau plat mais un matériau formatif capable d\'expression tridimensionnelle. L\'artiste a créé des formes organiques en superposant et pliant des centaines de feuilles de hanji, et a complété une œuvre qui change au fil du temps en calculant la transmission et la réflexion de la lumière.'
            },
            image: './img/gallery/03.webp'
        },
        // gallery06: {
        //     ko: {
        //         title: '한지 등불 컬렉션',
        //         description: '전통 한지와 현대 LED 기술을 결합한 등불 작품입니다. 한지의 투광성을 활용해 따뜻하고 부드러운 조명 효과를 연출합니다.',
        //         story: '작가는 조선시대 궁중에서 사용되던 전통 등불의 형태에서 영감을 받아 현대적 해석을 더했습니다. 한지를 여러 겹 겹쳐 빛의 확산을 조절하고, 대나무 프레임으로 안정성을 높였습니다.'
        //     },
        //     en: {
        //         title: 'Hanji Lantern Collection',
        //         description: 'Lantern artwork combining traditional hanji with modern LED technology. Utilizes the light-transmitting properties of hanji to create warm and soft lighting effects.',
        //         story: 'The artist drew inspiration from traditional lanterns used in the Joseon Dynasty royal court and added a contemporary interpretation. Multiple layers of hanji control light diffusion, while a bamboo frame enhances stability.'
        //     },
        //     fr: {
        //         title: 'Collection de Lanternes en Hanji',
        //         description: 'Œuvre de lanterne combinant le hanji traditionnel avec la technologie LED moderne. Utilise les propriétés de transmission lumineuse du hanji pour créer des effets d\'éclairage chauds et doux.',
        //         story: 'L\'artiste s\'est inspirée des lanternes traditionnelles utilisées dans la cour royale de la dynastie Joseon et a ajouté une interprétation contemporaine. Plusieurs couches de hanji contrôlent la diffusion de la lumière, tandis qu\'un cadre en bambou améliore la stabilité.'
        //     },
        //     image: './img/gallery/06.webp'
        // },
        // gallery07: {
        //     ko: {
        //         title: '한지 부채 예술품',
        //         description: '조선 중기 선비들이 사용하던 접이식 부채입니다. 한지에 그려진 산수화는 당시 문인화의 특징을 잘 보여줍니다.',
        //         story: '이 부채는 18세기 조선의 문인 문화를 대표하는 작품입니다. 부채살은 대나무로 제작되었고, 한지 부채면에는 먹과 천연 안료로 산수화가 그려져 있습니다. 부채를 접고 펼 때마다 그림이 변화하는 재미를 느낄 수 있습니다.'
        //     },
        //     en: {
        //         title: 'Hanji Fan Artwork',
        //         description: 'A folding fan used by scholars during the mid-Joseon period. The landscape painting on hanji demonstrates the characteristics of literati painting of that era.',
        //         story: 'This fan represents the literati culture of 18th-century Joseon. The fan ribs are made of bamboo, and landscape paintings are drawn with ink and natural pigments on the hanji fan surface. You can enjoy how the picture changes each time the fan is folded and unfolded.'
        //     },
        //     fr: {
        //         title: 'Œuvre d\'Art Éventail en Hanji',
        //         description: 'Un éventail pliant utilisé par les lettrés pendant la période du milieu Joseon. La peinture de paysage sur hanji démontre les caractéristiques de la peinture de lettré de cette époque.',
        //         story: 'Cet éventail représente la culture des lettrés du 18e siècle Joseon. Les baleines de l\'éventail sont en bambou, et des peintures de paysage sont dessinées à l\'encre et aux pigments naturels sur la surface de l\'éventail en hanji. Vous pouvez apprécier comment l\'image change chaque fois que l\'éventail est plié et déplié.'
        //     },
        //     image: './img/gallery/07.webp'
        // },
        // gallery08: {
        //     ko: {
        //         title: '현대 한지 설치미술',
        //         description: '대형 한지 설치 작품으로 공간 전체를 아우르는 몰입감 있는 경험을 제공합니다. 한지와 현대 재료의 조화가 인상적입니다.',
        //         story: '이 설치 작품은 한지의 전통적 가치와 현대 미술의 실험 정신이 만난 결과물입니다. 작가는 수백 장의 한지를 공중에 매달아 바람에 의해 움직이는 동적인 작품을 완성했습니다.'
        //     },
        //     en: {
        //         title: 'Contemporary Hanji Installation Art',
        //         description: 'A large-scale hanji installation work providing an immersive experience that encompasses the entire space. The harmony between hanji and contemporary materials is impressive.',
        //         story: 'This installation is the result of meeting traditional values of hanji with the experimental spirit of contemporary art. The artist suspended hundreds of sheets of hanji in the air to create a dynamic work that moves with the wind.'
        //     },
        //     fr: {
        //         title: 'Art d\'Installation Contemporain en Hanji',
        //         description: 'Une œuvre d\'installation en hanji à grande échelle offrant une expérience immersive qui englobe tout l\'espace. L\'harmonie entre le hanji et les matériaux contemporains est impressionnante.',
        //         story: 'Cette installation est le résultat de la rencontre des valeurs traditionnelles du hanji avec l\'esprit expérimental de l\'art contemporain. L\'artiste a suspendu des centaines de feuilles de hanji dans l\'air pour créer une œuvre dynamique qui bouge avec le vent.'
        //     },
        //     image: './img/gallery/08.webp'
        // },
        gallery09: {
            ko: {
                title: '오방색과 모란의 조화를 담은 자수함',
                description: '오방색과 모란의 조화: 오방색 자수함',
                story: '한국 전통의 오방색 패턴과 풍요를 상징하는 모란꽃을 모티브로 공간에 우아함과 복을 불러오는 의미를 담았습니다\n' +
                    '"작은 실타래 하나도 소중히 간직하는 한국의 정서를 느낄수 있는 작품입니다'
            },
            en: {
                title: 'Hanji Ink Painting',
                description: 'An ink painting presumed to be drawn by Jeong Yak-yong, a practical learning scholar of late Joseon. The bamboo painting drawn with ink on hanji is impressive.',
                story: 'This work is valuable material for glimpsing the spiritual world of late Joseon literati. Bamboo symbolizes integrity and fidelity, and the artist\'s philosophy is well revealed through concise yet powerful brushstrokes.'
            },
            fr: {
                title: 'Peinture à l\'Encre sur Hanji',
                description: 'Une peinture à l\'encre présumée dessinée par Jeong Yak-yong, un érudit de l\'apprentissage pratique de la fin de Joseon. La peinture de bambou dessinée à l\'encre sur hanji est impressionnante.',
                story: 'Cette œuvre est un matériau précieux pour entrevoir le monde spirituel des lettrés de la fin de Joseon. Le bambou symbolise l\'intégrité et la fidélité, et la philosophie de l\'artiste est bien révélée par des coups de pinceau concis mais puissants.'
            },
            image: './img/gallery/09.webp'
        },
        gallery10: {
            ko: {
                title: '황후의 시간(The Empress\'s Time)',
                description: '왕후의 아침을 여는 고결한 목련의 빛',
                story: '가야의 김수로왕이 허황옥 왕후를 맞이할 때 탔던 \'목련 배\' 설화에서 영감을 얻은 한지공예 궤경대(좌식 화장대)입니다. 고귀한 목련 문양을 통해 시공간을 초월한 환대와 기다림의 미학을 담았습니다. 전통 한지의 단아한 질감과 현대적 실용성을 결합하여 일상 속 가장 우아한 시간을 선사합니다.\n'
            },
            en: {
                title: 'Hanji Miniature Furniture',
                description: 'Miniature work that meticulously recreates traditional hanok furniture with hanji. Despite its small size, the details are surprisingly delicate.',
                story: 'This miniature is a 1/10 scale reproduction of furniture from Joseon Dynasty aristocratic families. Using the texture and color of hanji, it was crafted so precisely that it\'s difficult to distinguish from real wood.'
            },
            fr: {
                title: 'Mobilier Miniature en Hanji',
                description: 'Œuvre miniature qui recrée méticuleusement le mobilier hanok traditionnel avec du hanji. Malgré sa petite taille, les détails sont étonnamment délicats.',
                story: 'Cette miniature est une reproduction à l\'échelle 1/10 du mobilier des familles aristocratiques de la dynastie Joseon. Utilisant la texture et la couleur du hanji, elle a été conçue si précisément qu\'il est difficile de la distinguer du vrai bois.'
            },
            image: './img/gallery/10.webp'
        },
        gallery11: {
            ko: {
                title: '무드등(염원:기원의 빛)',
                description: '오방색을 활용한 전통한지 무드등',
                story: '화려한 모란 문양과 정갈한 조각들이 어우러져, 공간을 밝히는 따뜻한 빛 속에 간절한 안녕과 복을 바라는 마음을 담았습니다.'
            },
            en: {
                title: 'Hanji Mural Project',
                description: 'A large hanji mural created jointly by village residents. A special case where traditional hanji techniques meet contemporary public art.',
                story: 'This mural is a collaborative work containing the village\'s history and residents\' dreams. Over 50 village residents participated for 3 months to express the village\'s four seasons with hanji. After completion, it became a village landmark and a popular destination for many visitors.'
            },
            fr: {
                title: 'Projet de Fresque en Hanji',
                description: 'Une grande fresque en hanji créée conjointement par les résidents du village. Un cas spécial où les techniques traditionnelles du hanji rencontrent l\'art public contemporain.',
                story: 'Cette fresque est une œuvre collaborative contenant l\'histoire du village et les rêves des résidents. Plus de 50 résidents du village ont participé pendant 3 mois pour exprimer les quatre saisons du village avec du hanji. Après achèvement, elle est devenue un point de repère du village et une destination populaire pour de nombreux visiteurs.'
            },
            image: './img/gallery/11.webp'
        },
        gallery12: {
            ko: {
                title: '장무상망',
                description: '오래도록 서로 잊지말자는 약속을 담은 오브제',
                story: '부산의 상징(부산시화 :동백꽃)을 모티브로 제작한 부산문화 상품입니다 오랫동안 서로 잊지 말자는 약속을 담은 지역 특산 오브제입니다.',
            },
            en: {
                title: 'Hanji Jewelry Box',
                description: 'A hanji jewelry box used in the royal court, beautifully decorated with lacquer and mother-of-pearl. Shows both the strength and aesthetic value of hanji.',
                story: 'This jewelry box was used by royal court women in late Joseon, made by layering multiple sheets of hanji and finished with lacquer. The lid is decorated with mother-of-pearl flower patterns for added splendor.'
            },
            fr: {
                title: 'Boîte à Bijoux en Hanji',
                description: 'Une boîte à bijoux en hanji utilisée dans la cour royale, magnifiquement décorée de laque et de nacre. Montre à la fois la force et la valeur esthétique du hanji.',
                story: 'Cette boîte à bijoux était utilisée par les femmes de la cour royale à la fin de Joseon, fabriquée en superposant plusieurs feuilles de hanji et finie avec de la laque. Le couvercle est décoré de motifs floraux en nacre pour plus de splendeur.'
            },
            image: './img/gallery/12.webp'
        },
        gallery13: {
            ko: {
                title: '마음을 담는 보석함',
                description: '한국전통 패물함(혼구용품)',
                story: '한국 전통 패물함의 고전적인 형태를 현대적인 비례와 색감으로 새롭게 풀어낸 작품입니다.\n' +
                    '오방색에서 착안한 현대적 채도의 색감과 모란문양으로 화려함과 절제미를 동시에 담았습니다.\n'
            },
            en: {
                title: 'Contemporary Hanji Fashion',
                description: 'Innovative fashion work utilizing hanji as clothing material. An experimental work exploring new possibilities of traditional materials.',
                story: 'The designer focused on the breathability and antibacterial properties of hanji to apply it to contemporary clothing. Specially treated hanji provides a unique texture while being as soft as fabric.'
            },
            fr: {
                title: 'Mode Contemporaine en Hanji',
                description: 'Œuvre de mode innovante utilisant le hanji comme matériau vestimentaire. Une œuvre expérimentale explorant de nouvelles possibilités des matériaux traditionnels.',
                story: 'La designer s\'est concentrée sur la respirabilité et les propriétés antibactériennes du hanji pour l\'appliquer aux vêtements contemporains. Le hanji spécialement traité offre une texture unique tout en étant aussi doux que le tissu.'
            },
            image: './img/gallery/13.webp'
        },
        gallery14: {
            ko: {
                title: '한지 모빌',
                description: '한지로 만든 모빌 작품으로 바람에 의해 움직이며 그림자 놀이를 만들어냅니다. 공간에 생동감을 불어넣는 키네틱 아트입니다.',
                story: '이 모빌은 한지의 가벼움과 유연성을 극대화한 작품입니다. 각기 다른 크기의 한지 조각들이 균형을 이루며 돌아가는 모습은 자연의 조화를 표현합니다.'
            },
            en: {
                title: 'Hanji Mobile',
                description: 'A mobile artwork made of hanji that moves with the wind and creates shadow play. Kinetic art that brings vitality to the space.',
                story: 'This mobile maximizes the lightness and flexibility of hanji. The balanced rotation of hanji pieces of different sizes expresses the harmony of nature.'
            },
            fr: {
                title: 'Mobile en Hanji',
                description: 'Une œuvre de mobile faite de hanji qui bouge avec le vent et crée un jeu d\'ombres. Art cinétique qui apporte de la vitalité à l\'espace.',
                story: 'Ce mobile maximise la légèreté et la flexibilité du hanji. La rotation équilibrée de pièces de hanji de différentes tailles exprime l\'harmonie de la nature.'
            },
            image: './img/gallery/14.webp'
        },
        gallery15: {
            ko: {
                title: '한지 캘리그래피',
                description: '현대 서예와 전통 한지가 만난 캘리그래피 작품입니다. 한글의 아름다움을 한지 위에서 재해석했습니다.',
                story: '서예가는 한지의 독특한 질감이 먹의 번짐을 자연스럽게 조절한다는 점에 주목했습니다. 금분을 살짝 뿌려 고급스러운 느낌을 더했습니다.'
            },
            en: {
                title: 'Hanji Calligraphy',
                description: 'Calligraphy work where contemporary calligraphy meets traditional hanji. Reinterprets the beauty of Hangul on hanji.',
                story: 'The calligrapher noted that the unique texture of hanji naturally controls ink bleeding. A touch of gold powder adds an luxurious feel.'
            },
            fr: {
                title: 'Calligraphie Hanji',
                description: 'Œuvre de calligraphie où la calligraphie contemporaine rencontre le hanji traditionnel. Réinterprète la beauté du Hangul sur hanji.',
                story: 'La calligraphe a noté que la texture unique du hanji contrôle naturellement le saignement de l\'encre. Une touche de poudre d\'or ajoute une sensation luxueuse.'
            },
            image: './img/gallery/15.webp'
        },
        gallery16: {
            ko: {
                title: '화양연화(華樣年華)',
                description: '생의 가장 찬란한 순간, 왕실의 예(禮)로 피어나다',
                story: '조선 왕실의 품격 있는 예단 문화를 현대적으로 재해석했습니다. 부귀를 상징하는 모란과 오방색의 미학을 담아, 소중한 인연에게 전하는 가장 고귀한 축복과 진심을 종이 공예의 정수로 빚어냈습니다.'
            },
            en: {
                title: 'Hanji Book Art',
                description: 'Work combining traditional bookbinding techniques with contemporary book art. Each page made of hanji provides unique tactile and visual experiences.',
                story: 'The artist studied Joseon Dynasty book production methods and reinterpreted them in a contemporary way. The natural wrinkles and texture of hanji create different expressions on each page.'
            },
            fr: {
                title: 'Art du Livre Hanji',
                description: 'Œuvre combinant les techniques traditionnelles de reliure avec l\'art contemporain du livre. Chaque page faite de hanji offre des expériences tactiles et visuelles uniques.',
                story: 'L\'artiste a étudié les méthodes de production de livres de la dynastie Joseon et les a réinterprétées de manière contemporaine. Les rides naturelles et la texture du hanji créent différentes expressions sur chaque page.'
            },
            image: './img/gallery/16.webp'
        },
        circle: {
            ko: {
                title: '한지 모시 티코스터',
                description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑)\n' +
                    '은은한 무드를 더한 한지와 모시를 결합한 티코스터',
                story: '[Key Points]\n' +
                    'Material: 한지와 모시의 질감이 살아있는 섬세한 배접 공예\n' +
                    'Color: 한국 전통 오방색(Obangsaek)을 기반으로 한 은은한 무드의 색감\n' +
                    'Finish: 내구성과 항균력이 뛰어난 천연 옻칠(Ottchil) 마감'
            },
            en: {
                title: 'Hanji Ramie Tea Coaster',
                description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black)\n' +
                    'Tea coaster combining hanji and ramie with subtle mood',
                story: '[Key Points]\n' +
                    'Material: Delicate backing craft with the texture of hanji and ramie alive\n' +
                    'Color: Subtle mood colors based on traditional Korean five-element colors (Obangsaek)\n' +
                    'Finish: Natural lacquer (Ottchil) finish with excellent durability and antibacterial properties'
            },
            fr: {
                title: 'Sous-verre Thé Hanji-Ramie',
                description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir)\n' +
                    'Sous-verre à thé combinant hanji et ramie avec une ambiance subtile',
                story: '[Points Clés]\n' +
                    'Matériau: Artisanat de doublage délicat avec la texture du hanji et du ramie vivante\n' +
                    'Couleur: Couleurs d\'ambiance subtiles basées sur les cinq couleurs traditionnelles coréennes (Obangsaek)\n' +
                    'Finition: Finition laque naturelle (Ottchil) avec d\'excellentes propriétés de durabilité et antibactériennes'
            },
            image: './img/gallery/circle.webp'
        },
        multi: {
            ko: {
                title: '화양연화(華樣年華)',
                description: '생의 가장 찬란한 순간, 왕실의 예(禮)로 피어나다',
                story: '조선 왕실의 품격 있는 예단 문화를 현대적으로 재해석했습니다. 부귀를 상징하는 모란과 오방색의 미학을 담아, 소중한 인연에게 전하는 가장 고귀한 축복과 진심을 종이 공예의 정수로 빚어냈습니다.'
            },
            en: {
                title: 'Hanji Book Art',
                description: 'Work combining traditional bookbinding techniques with contemporary book art. Each page made of hanji provides unique tactile and visual experiences.',
                story: 'The artist studied Joseon Dynasty book production methods and reinterpreted them in a contemporary way. The natural wrinkles and texture of hanji create different expressions on each page.'
            },
            fr: {
                title: 'Art du Livre Hanji',
                description: 'Œuvre combinant les techniques traditionnelles de reliure avec l\'art contemporain du livre. Chaque page faite de hanji offre des expériences tactiles et visuelles uniques.',
                story: 'L\'artiste a étudié les méthodes de production de livres de la dynastie Joseon et les a réinterprétées de manière contemporaine. Les rides naturelles et la texture du hanji créent différentes expressions sur chaque page.'
            },
            image: './img/gallery/multi.webp'
        },
        three_circle: {
            ko: {
                title: '지승(紙繩)키링',
                description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 키링\n',
                story: '전통 한지를 한 땀 한 땀 꼬아 엮은 지승 공예의 정수를 담았습니다. 한국의 오방색을 현대적 감각으로 재해석한 이 키링은 가볍지만 견고하며, 손끝에서 느껴지는 따뜻한 질감과 자연의 미학을 전합니다.'
            },
            en: {
                title: 'Hanji Book Art',
                description: 'Work combining traditional bookbinding techniques with contemporary book art. Each page made of hanji provides unique tactile and visual experiences.',
                story: 'The artist studied Joseon Dynasty book production methods and reinterpreted them in a contemporary way. The natural wrinkles and texture of hanji create different expressions on each page.'
            },
            fr: {
                title: 'Art du Livre Hanji',
                description: 'Œuvre combinant les techniques traditionnelles de reliure avec l\'art contemporain du livre. Chaque page faite de hanji offre des expériences tactiles et visuelles uniques.',
                story: 'L\'artiste a étudié les méthodes de production de livres de la dynastie Joseon et les a réinterprétées de manière contemporaine. Les rides naturelles et la texture du hanji créent différentes expressions sur chaque page.'
            },
            image: './img/gallery/3_circle.webp'
        }

    };

    // Get artwork ID from URL parameters
    function getArtworkId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || 'lamp';
    }

    // Load artwork details
    function loadArtworkDetails() {
        const artworkId = getArtworkId();
        const artwork = artworkData[artworkId];

        if (!artwork) {
            showNotFound();
            return;
        }

        // Get current language
        const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'ko';
        const artworkContent = artwork[currentLang] || artwork.ko;

        const contentContainer = document.getElementById('artwork-content');
        contentContainer.innerHTML = `
            <div class="detail-image">
                <img src="${artwork.image}" alt="${artworkContent.title}" loading="lazy">
            </div>
            <div class="detail-info">
                <h1>${artworkContent.title}</h1>
                <div class="artwork-description">
                    <p>${artworkContent.description}</p>
                </div>
                <div class="artwork-story">
                    <h3>${getStoryTitle(currentLang)}</h3>
                    <p>${artworkContent.story}</p>
                </div>
            </div>
        `;

        // Update page title
        const museumName = window.i18n ? window.i18n.t('logo.title') : '홍현정한지공예 연구소';
        document.title = `${artworkContent.title} | ${museumName}`;

        // Add fade-in animation
        contentContainer.style.opacity = '0';
        setTimeout(() => {
            contentContainer.style.opacity = '1';
            contentContainer.style.transition = 'opacity 0.5s ease';
        }, 100);
    }

    // Show not found message
    function showNotFound() {
        const contentContainer = document.getElementById('artwork-content');
        contentContainer.innerHTML = `
            <div class="detail-loading">
                <h2>Artwork Not Found</h2>
                <p>Sorry, the requested artwork could not be found.</p>
                <a href="./index.html" class="back-link">← Return to Main Page</a>
            </div>
        `;
    }

    // Render related artworks with i18n support
    function renderRelatedArtworks() {
        const relatedItemsWrapper = document.getElementById('relatedItemsWrapper');
        if (!relatedItemsWrapper || !window.i18n) return;

        const currentLang = window.i18n.getCurrentLanguage();
        const translations = window.i18n.translations[currentLang];

        if (!translations || !translations.related || !translations.related.artworks) return;

        const artworks = translations.related.artworks;

        // Clear existing items
        relatedItemsWrapper.innerHTML = '';

        // Create new items from translations
        Object.keys(artworks).forEach(artworkId => {
            const artwork = artworks[artworkId];
            const relatedItem = document.createElement('div');
            relatedItem.className = 'related-item';
            relatedItem.setAttribute('data-artwork-id', artworkId);
            relatedItem.style.cursor = 'pointer';

            // Get image path from existing mapping
            const imagePaths = {
                gallery01: './img/gallery/01.webp',
                gallery03: './img/gallery/03.webp',
                gallery09: './img/gallery/09.webp',
                gallery10: './img/gallery/10.webp',
                gallery11: './img/gallery/11.webp',
                gallery12: './img/gallery/12.webp',
                gallery13: './img/gallery/13.webp',
                gallery14: './img/gallery/14.webp',
                gallery15: './img/gallery/15.webp',
                gallery16: './img/gallery/16.webp',
                lamp: './img/02.webp',
                takja: './img/takja.webp'
            };

            relatedItem.innerHTML = `
                <img src="${imagePaths[artworkId] || './img/placeholder.webp'}" alt="${artwork.title}" loading="lazy">
                <div class="related-info">
                    <h3>${artwork.title}</h3>
                    <p>${artwork.period}</p>
                </div>
            `;

            relatedItem.addEventListener('click', () => {
                window.location.href = `./artwork-detail.html?id=${artworkId}`;
            });

            relatedItemsWrapper.appendChild(relatedItem);
        });
    }

    // Handle related artwork clicks (legacy support)
    function setupRelatedArtworks() {
        const relatedItems = document.querySelectorAll('.related-item');

        relatedItems.forEach(item => {
            const artworkId = item.getAttribute('data-artwork-id');
            if (artworkId) {
                item.addEventListener('click', () => {
                    window.location.href = `./artwork-detail.html?id=${artworkId}`;
                });
                item.style.cursor = 'pointer';
            }
        });
    }

    // Setup continuous scroll carousel
    function setupCarousel() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const itemsWrapper = document.getElementById('relatedItemsWrapper');
        const items = document.querySelectorAll('.related-item');

        if (!prevBtn || !nextBtn || !itemsWrapper || items.length === 0) {
            return;
        }

        let currentTranslateX = 0;
        let isUserInteracting = false;
        let animationSpeed = 0.5; // 픽셀 per frame (천천히 움직임)
        let animationId = null;

        // 아이템들을 복제해서 무한 스크롤 구현
        function duplicateItems() {
            const originalItems = Array.from(items);

            // 원본 아이템들을 복제해서 앞뒤로 추가
            originalItems.forEach(item => {
                const cloneBefore = item.cloneNode(true);
                const cloneAfter = item.cloneNode(true);

                // 복제된 아이템의 이벤트 리스너 다시 설정
                const artworkId = item.getAttribute('data-artwork-id');
                if (artworkId) {
                    cloneBefore.addEventListener('click', () => {
                        window.location.href = `./artwork-detail.html?id=${artworkId}`;
                    });
                    cloneAfter.addEventListener('click', () => {
                        window.location.href = `./artwork-detail.html?id=${artworkId}`;
                    });
                }

                itemsWrapper.insertBefore(cloneBefore, itemsWrapper.firstChild);
                itemsWrapper.appendChild(cloneAfter);
            });

            // 시작 위치를 원본 아이템들 시작점으로 설정
            const itemWidth = 300 + 24; // width + gap
            currentTranslateX = -(originalItems.length * itemWidth);
            itemsWrapper.style.transform = `translateX(${currentTranslateX}px)`;
        }

        // 연속 스크롤 애니메이션
        function continuousScroll() {
            if (!isUserInteracting) {
                currentTranslateX -= animationSpeed;

                // 무한 루프 처리
                const itemWidth = 300 + 24; // width + gap
                const totalItems = items.length;
                const originalSectionWidth = totalItems * itemWidth;

                // 오른쪽 끝에 도달하면 왼쪽 시작점으로 리셋
                if (Math.abs(currentTranslateX) >= originalSectionWidth * 2) {
                    currentTranslateX = -originalSectionWidth;
                }

                itemsWrapper.style.transform = `translateX(${currentTranslateX}px)`;
            }

            animationId = requestAnimationFrame(continuousScroll);
        }

        // 수동 네비게이션
        function goToPrevious() {
            stopContinuousScroll();
            currentTranslateX += 324; // itemWidth + gap
            itemsWrapper.classList.add('smooth-scroll');
            itemsWrapper.style.transform = `translateX(${currentTranslateX}px)`;

            setTimeout(() => {
                itemsWrapper.classList.remove('smooth-scroll');
                resumeContinuousScroll();
            }, 300);
        }

        function goToNext() {
            stopContinuousScroll();
            currentTranslateX -= 324; // itemWidth + gap
            itemsWrapper.classList.add('smooth-scroll');
            itemsWrapper.style.transform = `translateX(${currentTranslateX}px)`;

            setTimeout(() => {
                itemsWrapper.classList.remove('smooth-scroll');
                resumeContinuousScroll();
            }, 300);
        }

        // 연속 스크롤 중지
        function stopContinuousScroll() {
            isUserInteracting = true;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }

        // 연속 스크롤 재시작
        function resumeContinuousScroll() {
            isUserInteracting = false;
            if (!animationId) {
                continuousScroll();
            }
        }

        // 일시적 중지 후 재시작
        function temporaryPause(duration = 3000) {
            stopContinuousScroll();
            setTimeout(resumeContinuousScroll, duration);
        }

        // Event listeners
        prevBtn.addEventListener('click', () => {
            goToPrevious();
            temporaryPause();
        });

        nextBtn.addEventListener('click', () => {
            goToNext();
            temporaryPause();
        });

        // 마우스 호버 시 중지/재시작
        itemsWrapper.addEventListener('mouseenter', stopContinuousScroll);
        itemsWrapper.addEventListener('mouseleave', resumeContinuousScroll);

        // 아이템 클릭 시 일시 중지
        const allItems = itemsWrapper.querySelectorAll('.related-item');
        allItems.forEach(item => {
            item.addEventListener('click', () => temporaryPause(1000));
        });

        // 키보드 네비게이션
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.related-artworks')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToPrevious();
                    temporaryPause();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToNext();
                    temporaryPause();
                }
            }
        });

        // 터치 지원
        let startX = 0;
        let isDragging = false;

        itemsWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopContinuousScroll();
        }, { passive: true });

        itemsWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });

        itemsWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    goToNext();
                } else {
                    goToPrevious();
                }
                temporaryPause();
            } else {
                resumeContinuousScroll();
            }

            isDragging = false;
        }, { passive: true });

        // 초기화
        duplicateItems();
        continuousScroll();
    }

    // Smooth scroll for navigation links
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="./index.html#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Let the default behavior handle navigation to index.html with hash
            });
        });
    }

    // Helper functions for multilingual labels
    function getMetaLabel(key, lang) {
        const labels = {
            ko: {
            },
            en: {
            },
            fr: {
            }
        };
        return labels[lang] ? labels[lang][key] : labels.ko[key];
    }

    function getStoryTitle(lang) {
        const titles = {
            ko: '작품 이야기',
            en: 'The Story Behind the Artwork',
            fr: 'L\'Histoire Derrière l\'\u0152uvre'
        };
        return titles[lang] || titles.ko;
    }

    // Initialize i18n and language switcher for detail page
    if (window.i18n) {
        window.i18n.updateUI();

        // Listen for language changes
        window.addEventListener('languageChanged', function() {
            loadArtworkDetails(); // Reload artwork details in new language
            renderRelatedArtworks(); // Re-render related artworks in new language
            setupCarousel(); // Re-setup carousel with new items
        });
    }

    // Language switcher functionality for detail page
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    if (languageToggle && languageDropdown) {
        // Update language button text
        function updateLanguageButton() {
            if (!window.i18n) return;

            const currentLang = window.i18n.getCurrentLanguage();
            const langMap = {
                'ko': 'KO',
                'en': 'EN',
                'fr': 'FR'
            };

            languageToggle.textContent = langMap[currentLang] || 'KO';

            langOptions.forEach(option => {
                const optionLang = option.getAttribute('data-lang');
                option.classList.toggle('active', optionLang === currentLang);
            });
        }

        updateLanguageButton();

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

    // Initialize page
    loadArtworkDetails();
    renderRelatedArtworks();
    setupRelatedArtworks();
    setupCarousel();
    setupSmoothScroll();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        loadArtworkDetails();
    });
});