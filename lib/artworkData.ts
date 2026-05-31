export type Lang = 'ko' | 'en' | 'fr'

export interface ArtworkLang {
  title: string
  description: string
  story: string
}

export interface ArtworkEntry {
  ko: ArtworkLang
  en: ArtworkLang
  fr: ArtworkLang
  image?: string
  images?: string[]
}

export const artworkData: Record<string, ArtworkEntry> = {
  lamp: {
    ko: {
      title: '바람의결 - 모시풍경',
      description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑) \n 모시의 우아한 실루엣 끝에서 울리는 청아한 종소리.\n 오브제 갯수를 1개 또는 3개 등으로 조정할수 있습니다.',
      story: '모시의 우아한 실루엣과 청아한 종소리는 공간을 차분하게 감싸며 마음에 쉼을 선사할것입니다.\n전통에서 출발한 한국의 미학을 현대적으로 풀어내어, 일상 속 공간에 평온과 행운을 불러옵니다.',
    },
    en: {
      title: "Wind's Edge - Ramie Wind Bell",
      description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black). \n The elegant silhouette of ramie and the clear sound of bells at the end.\n The number of objects can be adjusted to 1 or 3 pieces.',
      story: "The elegant silhouette of ramie and the clear sound of bells will gently envelop the space and bring peace to the mind.\nKorean aesthetics rooted in tradition are expressed in a modern way, bringing tranquility and good fortune to everyday spaces.",
    },
    fr: {
      title: 'Bord du Vent - Paysage de Ramie',
      description: "Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir). \n La silhouette élégante du ramie et le son clair des cloches à la fin.\n Le nombre d'objets peut être ajusté à 1 ou 3 pièces.",
      story: "La silhouette élégante du ramie et le son clair des cloches envelopperont doucement l'espace et apporteront la paix à l'esprit.\nL'esthétique coréenne enracinée dans la tradition s'exprime de manière moderne, apportant tranquillité et bonne fortune aux espaces quotidiens.",
    },
    image: '/img/02.webp',
  },
  takja: {
    ko: {
      title: '찻상(명상/우담바라를 기다리며)',
      description: '명상 - 우담바라를 기다리며',
      story: '오방색의 생동하는 기운이 대지의 조화를 부르고,\n그 갈망의 끝에 우담바라의 고결한 깨달음이 피어납니다.\n천 년의 한지와 옻칠로 빚은 이 찻상은\n일상의 차 한 잔을 고요한 명상의 여정으로 안내합니다.',
    },
    en: {
      title: 'Tea Table (Meditation/Waiting for Udumbara)',
      description: 'Meditation - Waiting for Udumbara',
      story: "The vivid energy of the five colors calls for the harmony of the earth,\nand at the end of that longing, the noble enlightenment of udumbara blooms.\nThis tea table crafted with thousand-year-old hanji and lacquer\nguides everyday tea time into a quiet meditation journey.",
    },
    fr: {
      title: "Table à Thé (Méditation/En Attendant l'Udumbara)",
      description: "Méditation - En attendant l'Udumbara",
      story: "L'énergie vivante des cinq couleurs appelle l'harmonie de la terre,\net à la fin de cette aspiration, l'illumination noble de l'udumbara fleurit.\nCette table à thé façonnée avec du hanji millénaire et de la laque\nguide le thé quotidien vers un voyage de méditation silencieux.",
    },
    image: '/img/takja.webp',
  },
  process: {
    ko: {
      title: '경상도골무문 테이블웨어',
      description: '한지와 모시를 결합한 테이블 웨어',
      story: '천년의 한지와 결이 고운 모시를 겹치고 옻칠로 마감하여, 자연의 단단한 생명력을 담았습니다. 옻칠의 깊은 광택과 모시의 섬세한 질감이 어우러진 이 작품은 시간이 흐를수록 견고함과 격조를 더하며 한국적 미학의 정수를 보여줍니다.',
    },
    en: {
      title: 'Gyeongsang-do Thimble Pattern Tableware',
      description: 'Tableware combining hanji and ramie',
      story: "By layering thousand-year-old hanji with fine-textured ramie and finishing with lacquer, it contains nature's solid vitality. This work, where the deep gloss of lacquer and the delicate texture of ramie harmonize, gains solidity and elegance over time, showing the essence of Korean aesthetics.",
    },
    fr: {
      title: 'Vaisselle à Motif de Dé Gyeongsang-do',
      description: 'Vaisselle combinant hanji et ramie',
      story: "En superposant le hanji millénaire avec le ramie à texture fine et en finissant avec de la laque, cela contient la vitalité solide de la nature. Cette œuvre, où l'éclat profond de la laque et la texture délicate du ramie s'harmonisent, gagne en solidité et en élégance au fil du temps, montrant l'essence de l'esthétique coréenne.",
    },
    image: '/img/about.webp',
  },
  neak_circle: {
    ko: {
      title: '지승(紙繩)목걸이',
      description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 목걸이',
      story: '전통 한지 지승 공예에 오방색을 현대적으로 담은, 가볍고 견고한 목걸이입니다. 한지를 한 땀 한 땀 꼬아 만든 지승의 따뜻한 질감과 자연스러운 색감이 착용자에게 편안함과 우아함을 선사합니다.',
    },
    en: {
      title: 'Jiseung (Paper Rope) Necklace',
      description: 'A jiseung (paper rope) necklace made by twisting thousand-year-old paper, hanji',
      story: "A light yet sturdy necklace that modernly incorporates the five traditional colors into traditional hanji jiseung craft. The warm texture and natural colors of jiseung made by twisting hanji stitch by stitch provide comfort and elegance to the wearer.",
    },
    fr: {
      title: 'Collier Jiseung (Corde en Papier)',
      description: 'Un collier jiseung (corde en papier) fait en tordant du papier millénaire, hanji',
      story: "Un collier léger mais robuste qui incorpore de manière moderne les cinq couleurs traditionnelles dans l'artisanat jiseung hanji traditionnel. La texture chaude et les couleurs naturelles du jiseung fait en tordant le hanji point par point procurent confort et élégance à celui qui le porte.",
    },
    image: '/img/gallery/light_circle.webp',
  },
  circle_ham: {
    ko: {
      title: '지승(紙繩)제기함',
      description: '불교의식용 다기',
      story: '전통 한지 지승줄을 정성스럽게 감아 형태를 만들고, 그 위에 천연 옻칠로 마감하여 견고함과 깊은 색감을 더한 불교 의식용 다기입니다. 청수나 차를 부처님께 올리는 용도로 사용되며, 지승 공예의 정교함과 종교적 숭고함이 하나로 어우러진 작품입니다.',
    },
    en: {
      title: 'Jiseung (Paper Rope) Ritual Tea Set',
      description: 'Buddhist ceremonial tea set',
      story: 'This is a Buddhist ceremonial tea set made by carefully wrapping traditional hanji jiseung ropes into shape and finishing with natural lacquer for added durability and deep color. Used for offering clear water or tea to Buddha, it is a work where the precision of jiseung craft and religious sublimity harmonize as one.',
    },
    fr: {
      title: 'Service à Thé Rituel Jiseung (Corde en Papier)',
      description: 'Service à thé cérémoniel bouddhiste',
      story: "Il s'agit d'un service à thé cérémoniel bouddhiste fait en enroulant soigneusement des cordes jiseung hanji traditionnelles pour former la shape et en finissant avec de la laque naturelle pour ajouter durabilité et couleur profonde. Utilisé pour offrir de l'eau claire ou du thé à Bouddha, c'est une œuvre où la précision de l'artisanat jiseung et la sublimité religieuse s'harmonisent comme un.",
    },
    image: '/img/gallery/blue_circle.webp',
  },
  circle_pum: {
    ko: {
      title: '지승(紙繩)풍경',
      description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 풍경',
      story: '전통 지승 공예로 엮은 구슬 위에 단청의 화려하고 단아한 색채를 입힌 동자승을 얹어 만든 풍경입니다. 맑은 소리와 함께 마음의 평안을 전하는 불교적 예술미를 담고 있으며, 바람에 흔들릴 때마다 은은한 종소리가 공간에 고요함을 선사합니다.',
    },
    en: {
      title: 'Jiseung (Paper Rope) Wind Chime',
      description: 'A jiseung (paper rope) wind chime made by twisting thousand-year-old paper, hanji',
      story: 'A wind chime made by placing a young monk painted with the gorgeous and elegant colors of dancheong on beads woven with traditional jiseung craft. It contains Buddhist artistic beauty that brings peace of mind with clear sounds, and whenever it sways in the wind, gentle bell sounds bring tranquility to the space.',
    },
    fr: {
      title: 'Carillon à Vent Jiseung (Corde en Papier)',
      description: 'Un carillon à vent jiseung (corde en papier) fait en tordant du papier millénaire, hanji',
      story: "Un carillon à vent fait en plaçant un jeune moine peint avec les couleurs magnifiques et élégantes du dancheong sur des perles tissées avec l'artisanat jiseung traditionnel. Il contient la beauté artistique bouddhiste qui apporte la paix de l'esprit avec des sons clairs, et chaque fois qu'il se balance dans le vent, des sons de cloche doux apportent la tranquillité à l'espace.",
    },
    image: '/img/two_circle.webp',
  },
  gallery01: {
    ko: {
      title: '한지 모시 무드등',
      description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑)\n한지와 모시를 엮어 만든 전통소재 기반의 은은한 조명 오브제\n 색상은 한국전통오방색을 베이스로 제작합니다.',
      story: '한지와 모시를 엮어 만든 전통 소재의 오브제입니다.\n모시와 한지를 배접하고 죽공예기법으로 엮어 편안한 무드의 빛이 나오도록 표현했습니다. 그리고 보다 내구성을 높인 무드등입니다.',
    },
    en: {
      title: 'Hanji Ramie Mood Lamp',
      description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black)\nA subtle lighting object made from traditional materials combining hanji and ramie\n Colors are made based on traditional Korean five-element colors.',
      story: 'An object made from traditional materials combining hanji and ramie.\nWe expressed comfortable mood lighting by backing ramie and hanji and weaving them with bamboo crafting techniques. And it is a more durable mood lamp.',
    },
    fr: {
      title: "Lampe d'Ambiance Hanji-Ramie",
      description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir)\nUn objet d\'éclairage subtil fait de matériaux traditionnels combinant hanji et ramie\n Les couleurs sont basées sur les cinq couleurs traditionnelles coréennes.',
      story: "Un objet fait de matériaux traditionnels combinant hanji et ramie.\nNous avons exprimé un éclairage d'ambiance confortable en doublant le ramie et le hanji et en les tissant avec des techniques d'artisanat de bambou. Et c'est une lampe d'ambiance plus durable.",
    },
    image: '/img/gallery/01.webp',
  },
  gallery03: {
    ko: {
      title: '한지 조각품 컬렉션',
      description: '한지의 가능성을 탐구한 현대 조각 작품입니다.',
      story: '이 조각품은 한지가 단순한 평면 재료가 아닌 입체적 표현이 가능한 조형 재료임을 보여줍니다. 작가는 수백 장의 한지를 겹겹이 쌓고 접어서 유기적인 형태를 만들어냈으며, 빛의 투과와 반사를 계산하여 시간에 따라 변화하는 작품을 완성했습니다.',
    },
    en: {
      title: 'Hanji Sculpture Collection',
      description: 'Contemporary sculpture work exploring the possibilities of hanji.',
      story: 'This sculpture demonstrates that hanji is not merely a flat material but a formative material capable of three-dimensional expression. The artist created organic forms by layering and folding hundreds of sheets of hanji, and completed a work that changes over time by calculating light transmission and reflection.',
    },
    fr: {
      title: 'Collection de Sculptures en Hanji',
      description: "Œuvre de sculpture contemporaine explorant les possibilités du hanji.",
      story: "Cette sculpture démontre que le hanji n'est pas simplement un matériau plat mais un matériau formatif capable d'expression tridimensionnelle. L'artiste a créé des formes organiques en superposant et pliant des centaines de feuilles de hanji, et a complété une œuvre qui change au fil du temps en calculant la transmission et la réflexion de la lumière.",
    },
    image: '/img/gallery/03.webp',
  },
  gallery09: {
    ko: {
      title: '오방색과 모란의 조화를 담은 자수함',
      description: '오방색과 모란의 조화: 오방색 자수함',
      story: '한국 전통의 오방색 패턴과 풍요를 상징하는 모란꽃을 모티브로 공간에 우아함과 복을 불러오는 의미를 담았습니다\n"작은 실타래 하나도 소중히 간직하는 한국의 정서를 느낄수 있는 작품입니다',
    },
    en: {
      title: 'Embroidery Box with Harmony of Five Colors and Peonies',
      description: 'Harmony of five colors and peonies: Five-color embroidery box',
      story: 'This work contains the meaning of bringing elegance and blessings to space with traditional Korean five-color patterns and peony flowers symbolizing abundance as motifs.\nIt is a work where you can feel the Korean sentiment of treasuring even a small skein of thread.',
    },
    fr: {
      title: 'Boîte à Broderie avec Harmonie des Cinq Couleurs et Pivoines',
      description: 'Harmonie des cinq couleurs et pivoines : Boîte à broderie aux cinq couleurs',
      story: "Cette œuvre contient le sens d'apporter élégance et bénédictions à l'espace avec des motifs de motifs traditionnels coréens aux cinq couleurs et des fleurs de pivoine symbolisant l'abondance.\nC'est une œuvre où vous pouvez ressentir le sentiment coréen de chérir même un petit écheveau de fil.",
    },
    image: '/img/gallery/09.webp',
  },
  gallery10: {
    ko: {
      title: "황후의 시간(The Empress's Time)",
      description: '왕후의 아침을 여는 고결한 목련의 빛',
      story: "가야의 김수로왕이 허황옥 왕후를 맞이할 때 탔던 '목련 배' 설화에서 영감을 얻은 한지공예 궤경대(좌식 화장대)입니다. 고귀한 목련 문양을 통해 시공간을 초월한 환대와 기다림의 미학을 담았습니다. 전통 한지의 단아한 질감과 현대적 실용성을 결합하여 일상 속 가장 우아한 시간을 선사합니다.\n",
    },
    en: {
      title: "The Empress's Time",
      description: "The noble light of magnolia that opens the empress's morning",
      story: "This is a hanji craft mirror stand (floor-sitting dressing table) inspired by the legend of the 'magnolia ship' that King Suro of Gaya rode when welcoming Queen Heo Hwang-ok. Through the noble magnolia pattern, it contains the aesthetics of hospitality and waiting that transcends time and space. By combining the elegant texture of traditional hanji with modern practicality, it presents the most graceful time in daily life.",
    },
    fr: {
      title: "Le Temps de l'Impératrice",
      description: "La lumière noble du magnolia qui ouvre le matin de l'impératrice",
      story: "Il s'agit d'un support de miroir artisanal hanji (table de maquillage assise au sol) inspiré de la légende du 'navire magnolia' que le roi Suro de Gaya montait en accueillant la reine Heo Hwang-ok. À travers le motif noble du magnolia, il contient l'esthétique de l'hospitalité et de l'attente qui transcende le temps et l'espace. En combinant la texture élégante du hanji traditionnel avec la praticité moderne, il présente le moment le plus gracieux de la vie quotidienne.",
    },
    images: ['/img/gallery/10.webp', '/img/10-1.webp', '/img/10-2.webp'],
  },
  gallery11: {
    ko: {
      title: '무드등(염원:기원의 빛)',
      description: '오방색을 활용한 전통한지 무드등',
      story: '화려한 모란 문양과 정갈한 조각들이 어우러져, 공간을 밝히는 따뜻한 빛 속에 간절한 안녕과 복을 바라는 마음을 담았습니다.',
    },
    en: {
      title: 'Mood Lamp (Wish: Light of Prayer)',
      description: 'Traditional hanji mood lamp utilizing the five colors',
      story: 'Gorgeous peony patterns and neat sculptures harmonize together, containing the heart of earnest wishes for peace and blessings within the warm light that illuminates the space.',
    },
    fr: {
      title: "Lampe d'Ambiance (Souhait: Lumière de Prière)",
      description: "Lampe d'ambiance hanji traditionnelle utilisant les cinq couleurs",
      story: "De magnifiques motifs de pivoines et des sculptures soignées s'harmonisent ensemble, contenant le cœur de souhaits sincères de paix et de bénédictions dans la lumière chaude qui illumine l'espace.",
    },
    image: '/img/gallery/11.webp',
  },
  gallery12: {
    ko: {
      title: '장무상망',
      description: '오래도록 서로 잊지말자는 약속을 담은 오브제',
      story: '부산의 상징(부산시화 :동백꽃)을 모티브로 제작한 부산문화 상품입니다 오랫동안 서로 잊지 말자는 약속을 담은 지역 특산 오브제입니다.',
    },
    en: {
      title: 'Eternal Remembrance',
      description: 'An object containing the promise not to forget each other for a long time',
      story: "This is a Busan cultural product made with the motif of Busan's symbol (Busan city flower: camellia flower). It is a regional specialty object containing the promise not to forget each other for a long time.",
    },
    fr: {
      title: 'Souvenir Éternel',
      description: "Un objet contenant la promesse de ne pas s'oublier longtemps",
      story: "Il s'agit d'un produit culturel de Busan fabriqué avec le motif du symbole de Busan (fleur de la ville de Busan : fleur de camélia). C'est un objet de spécialité régionale contenant la promesse de ne pas s'oublier longtemps.",
    },
    image: '/img/gallery/12.webp',
  },
  gallery13: {
    ko: {
      title: '마음을 담는 보석함',
      description: '한국전통 패물함(혼구용품)',
      story: '한국 전통 패물함의 고전적인 형태를 현대적인 비례와 색감으로 새롭게 풀어낸 작품입니다.\n오방색에서 착안한 현대적 채도의 색감과 모란문양으로 화려함과 절제미를 동시에 담았습니다.\n',
    },
    en: {
      title: 'Jewelry Box that Holds the Heart',
      description: 'Traditional Korean accessory box (wedding items)',
      story: 'This is a work that newly interprets the classical form of traditional Korean jewelry boxes with modern proportions and colors.\nIt contains both splendor and restraint with modern saturation colors inspired by the five traditional colors and peony patterns.',
    },
    fr: {
      title: 'Boîte à Bijoux qui Porte le Cœur',
      description: 'Boîte à accessoires traditionnelle coréenne (articles de mariage)',
      story: "Il s'agit d'une œuvre qui réinterprète nouvellement la forme classique des boîtes à bijoux coréennes traditionnelles avec des proportions et des couleurs modernes.\nElle contient à la fois splendeur et retenue avec des couleurs de saturation moderne inspirées des cinq couleurs traditionnelles et des motifs de pivoine.",
    },
    image: '/img/gallery/13.webp',
  },
  circle: {
    ko: {
      title: '한지 모시 티코스터',
      description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑)\n은은한 무드를 더한 한지와 모시를 결합한 티코스터',
      story: '한지와 모시의 섬세한 질감을 살린 배접 공예로 완성한 티코스터입니다.\n한국 전통 오방색을 기반으로 한 은은하고 깊은 색감이 일상의 다도를 품격 있게 만들어 줍니다.\n천연 옻칠 마감으로 내구성과 항균력을 더해, 세월이 흐를수록 깊어지는 아름다움을 간직합니다.',
    },
    en: {
      title: 'Hanji Ramie Tea Coaster',
      description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black)\nTea coaster combining hanji and ramie with subtle mood',
      story: "A tea coaster completed through delicate backing craft that brings out the subtle texture of hanji and ramie.\nThe deep, understated colors rooted in Korea's traditional five-element palette elevate the everyday ritual of tea.\nFinished with natural lacquer for lasting durability and antibacterial qualities — beauty that deepens with time.",
    },
    fr: {
      title: 'Sous-verre Thé Hanji-Ramie',
      description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir)\nSous-verre à thé combinant hanji et ramie avec une ambiance subtile',
      story: "Un sous-verre à thé réalisé par un artisanat de doublage délicat qui révèle la texture subtile du hanji et du ramie.\nLes teintes profondes et discrètes ancrées dans la palette traditionnelle coréenne des cinq éléments élèvent le rituel quotidien du thé.\nFini avec de la laque naturelle pour une durabilité durable et des propriétés antibactériennes — une beauté qui s'approfondit avec le temps.",
    },
    image: '/img/gallery/circle.webp',
  },
  multi: {
    ko: {
      title: '화양연화(華樣年華)',
      description: '생의 가장 찬란한 순간, 왕실의 예(禮)로 피어나다',
      story: '조선 왕실의 품격 있는 예단 문화를 현대적으로 재해석했습니다. 부귀를 상징하는 모란과 오방색의 미학을 담아, 소중한 인연에게 전하는 가장 고귀한 축복과 진심을 종이 공예의 정수로 빚어냈습니다.',
    },
    en: {
      title: 'Flower-like Years (華樣年華)',
      description: "Life's most brilliant moment, blooming with royal ceremony",
      story: 'It modernly reinterpreted the elegant wedding gift culture of the Joseon royal court. With the aesthetics of peonies symbolizing wealth and the five traditional colors, it crafted the most noble blessings and sincerity conveyed to precious relationships through the essence of paper craft.',
    },
    fr: {
      title: 'Années Fleuries (華樣年華)',
      description: "Le moment le plus brillant de la vie, s'épanouissant avec la cérémonie royale",
      story: "Il a réinterprété de manière moderne la culture élégante des cadeaux de mariage de la cour royale Joseon. Avec l'esthétique des pivoines symbolisant la richesse et les cinq couleurs traditionnelles, il a façonné les bénédictions et la sincérité les plus nobles transmises aux relations précieuses à travers l'essence de l'artisanat du papier.",
    },
    image: '/img/gallery/multi.webp',
  },
  three_circle: {
    ko: {
      title: '지승(紙繩)키링',
      description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 키링\n',
      story: '전통 한지를 한 땀 한 땀 꼬아 엮은 지승 공예의 정수를 담았습니다. 한국의 오방색을 현대적 감각으로 재해석한 이 키링은 가볍지만 견고하며, 손끝에서 느껴지는 따뜻한 질감과 자연의 미학을 전합니다.',
    },
    en: {
      title: 'Jiseung (Paper Rope) Keyring',
      description: 'A jiseung (paper rope) keyring made by twisting thousand-year-old paper, hanji',
      story: "It contains the essence of jiseung craft woven by twisting traditional hanji stitch by stitch. This keyring, which reinterprets Korea's five traditional colors with modern sensibility, is light yet sturdy, conveying the warm texture felt at the fingertips and the aesthetics of nature.",
    },
    fr: {
      title: 'Porte-clés Jiseung (Corde en Papier)',
      description: 'Un porte-clés jiseung (corde en papier) fait en tordant du papier millénaire, hanji',
      story: "Il contient l'essence de l'artisanat jiseung tissé en tordant le hanji traditionnel point par point. Ce porte-clés, qui réinterprète les cinq couleurs traditionnelles de la Corée avec une sensibilité moderne, est léger mais robuste, transmettant la texture chaude ressentie au bout des doigts et l'esthétique de la nature.",
    },
    image: '/img/gallery/3_circle.webp',
  },
}
