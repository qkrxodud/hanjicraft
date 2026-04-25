'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import type { Lang } from '@/lib/translations'

// 아트워크 데이터 (artwork-detail.js 변환)
const artworkData: Record<string, { ko: ArtworkLang; en: ArtworkLang; fr: ArtworkLang; image?: string; images?: string[] }> = {
  lamp: {
    ko: { title: '바람의결 - 모시풍경', description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑) \n 모시의 우아한 실루엣 끝에서 울리는 청아한 종소리.\n 오브제 갯수를 1개 또는 3개 등으로 조정할수 있습니다.', story: '모시의 우아한 실루엣과 청아한 종소리는 공간을 차분하게 감싸며 마음에 쉼을 선사할것입니다.\n전통에서 출발한 한국의 미학을 현대적으로 풀어내어, 일상 속 공간에 평온과 행운을 불러옵니다.' },
    en: { title: "Wind's Edge - Ramie Wind Bell", description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black). \n The elegant silhouette of ramie and the clear sound of bells at the end.\n The number of objects can be adjusted to 1 or 3 pieces.', story: 'The elegant silhouette of ramie and the clear sound of bells will gently envelop the space and bring peace to the mind.\nKorean aesthetics rooted in tradition are expressed in a modern way, bringing tranquility and good fortune to everyday spaces.' },
    fr: { title: 'Bord du Vent - Paysage de Ramie', description: "Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir). \n La silhouette élégante du ramie et le son clair des cloches à la fin.\n Le nombre d'objets peut être ajusté à 1 ou 3 pièces.", story: "La silhouette élégante du ramie et le son clair des cloches envelopperont doucement l'espace et apporteront la paix à l'esprit.\nL'esthétique coréenne enracinée dans la tradition s'exprime de manière moderne, apportant tranquillité et bonne fortune aux espaces quotidiens." },
    image: '/img/02.webp',
  },
  takja: {
    ko: { title: '찻상(명상/우담바라를 기다리며)', description: '명상 - 우담바라를 기다리며', story: '오방색의 생동하는 기운이 대지의 조화를 부르고,\n그 갈망의 끝에 우담바라의 고결한 깨달음이 피어납니다.\n천 년의 한지와 옻칠로 빚은 이 찻상은\n일상의 차 한 잔을 고요한 명상의 여정으로 안내합니다.' },
    en: { title: 'Tea Table (Meditation/Waiting for Udumbara)', description: 'Meditation - Waiting for Udumbara', story: 'The vivid energy of the five colors calls for the harmony of the earth,\nand at the end of that longing, the noble enlightenment of udumbara blooms.\nThis tea table crafted with thousand-year-old hanji and lacquer\nguides everyday tea time into a quiet meditation journey.' },
    fr: { title: "Table à Thé (Méditation/En Attendant l'Udumbara)", description: "Méditation - En attendant l'Udumbara", story: "L'énergie vivante des cinq couleurs appelle l'harmonie de la terre,\net à la fin de cette aspiration, l'illumination noble de l'udumbara fleurit.\nCette table à thé façonnée avec du hanji millénaire et de la laque\nguide le thé quotidien vers un voyage de méditation silencieux." },
    image: '/img/takja.webp',
  },
  process: {
    ko: { title: '경상도골무문 테이블웨어', description: '한지와 모시를 결합한 테이블 웨어', story: '천년의 한지와 결이 고운 모시를 겹치고 옻칠로 마감하여, 자연의 단단한 생명력을 담았습니다.' },
    en: { title: 'Gyeongsang-do Thimble Pattern Tableware', description: 'Tableware combining hanji and ramie', story: "By layering thousand-year-old hanji with fine-textured ramie and finishing with lacquer, it contains nature's solid vitality." },
    fr: { title: 'Vaisselle à Motif de Dé Gyeongsang-do', description: 'Vaisselle combinant hanji et ramie', story: "En superposant le hanji millénaire avec le ramie à texture fine et en finissant avec de la laque, cela contient la vitalité solide de la nature." },
    image: '/img/about.webp',
  },
  neak_circle: {
    ko: { title: '지승(紙繩)목걸이', description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 목걸이', story: '전통 한지 지승 공예에 오방색을 현대적으로 담은, 가볍고 견고한 목걸이입니다.' },
    en: { title: 'Jiseung (Paper Rope) Necklace', description: 'A jiseung (paper rope) necklace made by twisting thousand-year-old paper, hanji', story: 'A light yet sturdy necklace that modernly incorporates the five traditional colors into traditional hanji jiseung craft.' },
    fr: { title: 'Collier Jiseung (Corde en Papier)', description: 'Un collier jiseung (corde en papier) fait en tordant du papier millénaire, hanji', story: "Un collier léger mais robuste qui incorpore de manière moderne les cinq couleurs traditionnelles dans l'artisanat jiseung hanji traditionnel." },
    image: '/img/gallery/light_circle.webp',
  },
  circle_ham: {
    ko: { title: '지승(紙繩)제기함', description: '불교의식용 다기', story: '전통 한지 지승줄을 정성스럽게 감아 형태를 만들고, 그 위에 천연 옻칠로 마감하여 견고함과 깊은 색감을 더한 불교 의식용 다기입니다.' },
    en: { title: 'Jiseung (Paper Rope) Ritual Tea Set', description: 'Buddhist ceremonial tea set', story: 'This is a Buddhist ceremonial tea set made by carefully wrapping traditional hanji jiseung ropes into shape and finishing with natural lacquer for added durability and deep color.' },
    fr: { title: 'Service à Thé Rituel Jiseung (Corde en Papier)', description: 'Service à thé cérémoniel bouddhiste', story: "Il s'agit d'un service à thé cérémoniel bouddhiste fait en enroulant soigneusement des cordes jiseung hanji traditionnelles pour former la shape et en finissant avec de la laque naturelle." },
    image: '/img/gallery/blue_circle.webp',
  },
  circle_pum: {
    ko: { title: '지승(紙繩)풍경', description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 풍경', story: '전통 지승 공예로 엮은 구슬 위에 단청의 화려하고 단아한 색채를 입힌 동자승을 얹어 만든 풍경입니다.' },
    en: { title: 'Jiseung (Paper Rope) Wind Chime', description: 'A jiseung (paper rope) wind chime made by twisting thousand-year-old paper, hanji', story: 'A wind chime made by placing a young monk painted with the gorgeous and elegant colors of dancheong on beads woven with traditional jiseung craft.' },
    fr: { title: 'Carillon à Vent Jiseung (Corde en Papier)', description: 'Un carillon à vent jiseung (corde en papier) fait en tordant du papier millénaire, hanji', story: "Un carillon à vent fait en plaçant un jeune moine peint avec les couleurs magnifiques et élégantes du dancheong sur des perles tissées avec l'artisanat jiseung traditionnel." },
    image: '/img/two_circle.webp',
  },
  gallery01: {
    ko: { title: '한지 모시 무드등', description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑)\n한지와 모시를 엮어 만든 전통소재 기반의 은은한 조명 오브제', story: '한지와 모시를 엮어 만든 전통 소재의 오브제입니다.\n모시와 한지를 배접하고 죽공예기법으로 엮어 편안한 무드의 빛이 나오도록 표현했습니다.' },
    en: { title: 'Hanji Ramie Mood Lamp', description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black)\nA subtle lighting object made from traditional materials combining hanji and ramie', story: 'An object made from traditional materials combining hanji and ramie.\nWe expressed comfortable mood lighting by backing ramie and hanji and weaving them with bamboo crafting techniques.' },
    fr: { title: "Lampe d'Ambiance Hanji-Ramie", description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir)\nUn objet d\'éclairage subtil fait de matériaux traditionnels combinant hanji et ramie', story: "Un objet fait de matériaux traditionnels combinant hanji et ramie.\nNous avons exprimé un éclairage d'ambiance confortable en doublant le ramie et le hanji et en les tissant avec des techniques d'artisanat de bambou." },
    image: '/img/gallery/01.webp',
  },
  gallery03: {
    ko: { title: '한지 조각품 컬렉션', description: '한지의 가능성을 탐구한 현대 조각 작품입니다.', story: '이 조각품은 한지가 단순한 평면 재료가 아닌 입체적 표현이 가능한 조형 재료임을 보여줍니다.' },
    en: { title: 'Hanji Sculpture Collection', description: 'Contemporary sculpture work exploring the possibilities of hanji.', story: 'This sculpture demonstrates that hanji is not merely a flat material but a formative material capable of three-dimensional expression.' },
    fr: { title: 'Collection de Sculptures en Hanji', description: "Œuvre de sculpture contemporaine explorant les possibilités du hanji.", story: "Cette sculpture démontre que le hanji n'est pas simplement un matériau plat mais un matériau formatif capable d'expression tridimensionnelle." },
    image: '/img/gallery/03.webp',
  },
  gallery09: {
    ko: { title: '오방색과 모란의 조화를 담은 자수함', description: '오방색과 모란의 조화: 오방색 자수함', story: '한국 전통의 오방색 패턴과 풍요를 상징하는 모란꽃을 모티브로 공간에 우아함과 복을 불러오는 의미를 담았습니다.' },
    en: { title: 'Embroidery Box with Harmony of Five Colors and Peonies', description: 'Harmony of five colors and peonies: Five-color embroidery box', story: 'This work contains the meaning of bringing elegance and blessings to space with traditional Korean five-color patterns and peony flowers symbolizing abundance as motifs.' },
    fr: { title: 'Boîte à Broderie avec Harmonie des Cinq Couleurs et Pivoines', description: "Harmonie des cinq couleurs et pivoines : Boîte à broderie aux cinq couleurs", story: "Cette œuvre contient le sens d'apporter élégance et bénédictions à l'espace avec des motifs de motifs traditionnels coréens aux cinq couleurs et des fleurs de pivoine symbolisant l'abondance." },
    image: '/img/gallery/09.webp',
  },
  gallery10: {
    ko: { title: "황후의 시간(The Empress's Time)", description: '왕후의 아침을 여는 고결한 목련의 빛', story: "가야의 김수로왕이 허황옥 왕후를 맞이할 때 탔던 '목련 배' 설화에서 영감을 얻은 한지공예 궤경대(좌식 화장대)입니다." },
    en: { title: "The Empress's Time", description: "The noble light of magnolia that opens the empress's morning", story: "This is a hanji craft mirror stand (floor-sitting dressing table) inspired by the legend of the 'magnolia ship' that King Suro of Gaya rode when welcoming Queen Heo Hwang-ok." },
    fr: { title: "Le Temps de l'Impératrice", description: "La lumière noble du magnolia qui ouvre le matin de l'impératrice", story: "Il s'agit d'un support de miroir artisanal hanji (table de maquillage assise au sol) inspiré de la légende du 'navire magnolia' que le roi Suro de Gaya montait en accueillant la reine Heo Hwang-ok." },
    images: ['/img/gallery/10.webp', '/img/10-1.webp', '/img/10-2.webp'],
  },
  gallery11: {
    ko: { title: '무드등(염원:기원의 빛)', description: '오방색을 활용한 전통한지 무드등', story: '화려한 모란 문양과 정갈한 조각들이 어우러져, 공간을 밝히는 따뜻한 빛 속에 간절한 안녕과 복을 바라는 마음을 담았습니다.' },
    en: { title: 'Mood Lamp (Wish: Light of Prayer)', description: 'Traditional hanji mood lamp utilizing the five colors', story: 'Gorgeous peony patterns and neat sculptures harmonize together, containing the heart of earnest wishes for peace and blessings within the warm light that illuminates the space.' },
    fr: { title: "Lampe d'Ambiance (Souhait: Lumière de Prière)", description: "Lampe d'ambiance hanji traditionnelle utilisant les cinq couleurs", story: "De magnifiques motifs de pivoines et des sculptures soignées s'harmonisent ensemble, contenant le cœur de souhaits sincères de paix et de bénédictions dans la lumière chaude qui illumine l'espace." },
    image: '/img/gallery/11.webp',
  },
  gallery12: {
    ko: { title: '장무상망', description: '오래도록 서로 잊지말자는 약속을 담은 오브제', story: "부산의 상징(부산시화 :동백꽃)을 모티브로 제작한 부산문화 상품입니다." },
    en: { title: 'Eternal Remembrance', description: 'An object containing the promise not to forget each other for a long time', story: "This is a Busan cultural product made with the motif of Busan's symbol (Busan city flower: camellia flower)." },
    fr: { title: 'Souvenir Éternel', description: "Un objet contenant la promesse de ne pas s'oublier longtemps", story: "Il s'agit d'un produit culturel de Busan fabriqué avec le motif du symbole de Busan (fleur de la ville de Busan : fleur de camélia)." },
    image: '/img/gallery/12.webp',
  },
  gallery13: {
    ko: { title: '마음을 담는 보석함', description: '한국전통 패물함(혼구용품)', story: '한국 전통 패물함의 고전적인 형태를 현대적인 비례와 색감으로 새롭게 풀어낸 작품입니다.' },
    en: { title: 'Jewelry Box that Holds the Heart', description: 'Traditional Korean accessory box (wedding items)', story: 'This is a work that newly interprets the classical form of traditional Korean jewelry boxes with modern proportions and colors.' },
    fr: { title: 'Boîte à Bijoux qui Porte le Cœur', description: 'Boîte à accessoires traditionnelle coréenne (articles de mariage)', story: "Il s'agit d'une œuvre qui réinterprète nouvellement la forme classique des boîtes à bijoux coréennes traditionnelles avec des proportions et des couleurs modernes." },
    image: '/img/gallery/13.webp',
  },
  circle: {
    ko: { title: '한지 모시 티코스터', description: '색상은 전통 오방색을 베이스로 제작됩니다.(청, 적, 황, 백, 흑)\n은은한 무드를 더한 한지와 모시를 결합한 티코스터', story: '한지와 모시의 섬세한 질감을 살린 배접 공예로 완성한 티코스터입니다.' },
    en: { title: 'Hanji Ramie Tea Coaster', description: 'Colors are made based on traditional Korean five-element colors (blue, red, yellow, white, black)\nTea coaster combining hanji and ramie with subtle mood', story: "A tea coaster completed through delicate backing craft that brings out the subtle texture of hanji and ramie." },
    fr: { title: 'Sous-verre Thé Hanji-Ramie', description: 'Les couleurs sont créées sur la base des cinq couleurs traditionnelles coréennes (bleu, rouge, jaune, blanc, noir)\nSous-verre à thé combinant hanji et ramie avec une ambiance subtile', story: "Un sous-verre à thé réalisé par un artisanat de doublage délicat qui révèle la texture subtile du hanji et du ramie." },
    image: '/img/gallery/circle.webp',
  },
  multi: {
    ko: { title: '화양연화(華樣年華)', description: '생의 가장 찬란한 순간, 왕실의 예(禮)로 피어나다', story: '조선 왕실의 품격 있는 예단 문화를 현대적으로 재해석했습니다.' },
    en: { title: 'Flower-like Years (華樣年華)', description: "Life's most brilliant moment, blooming with royal ceremony", story: 'It modernly reinterpreted the elegant wedding gift culture of the Joseon royal court.' },
    fr: { title: 'Années Fleuries (華樣年華)', description: "Le moment le plus brillant de la vie, s'épanouissant avec la cérémonie royale", story: "Il a réinterprété de manière moderne la culture élégante des cadeaux de mariage de la cour royale Joseon." },
    image: '/img/gallery/multi.webp',
  },
  three_circle: {
    ko: { title: '지승(紙繩)키링', description: '천 년의 종이, 한지를 꼬아 만든 지승(紙繩) 키링', story: '전통 한지를 한 땀 한 땀 꼬아 엮은 지승 공예의 정수를 담았습니다.' },
    en: { title: 'Jiseung (Paper Rope) Keyring', description: 'A jiseung (paper rope) keyring made by twisting thousand-year-old paper, hanji', story: "It contains the essence of jiseung craft woven by twisting traditional hanji stitch by stitch." },
    fr: { title: 'Porte-clés Jiseung (Corde en Papier)', description: 'Un porte-clés jiseung (corde en papier) fait en tordant du papier millénaire, hanji', story: "Il contient l'essence de l'artisanat jiseung tissé en tordant le hanji traditionnel point par point." },
    image: '/img/gallery/3_circle.webp',
  },
}

interface ArtworkLang {
  title: string
  description: string
  story: string
}

// 관련 작품 이미지 경로
const relatedImages: Record<string, string> = {
  gallery01: '/img/gallery/01.webp',
  gallery03: '/img/gallery/03.webp',
  gallery09: '/img/gallery/09.webp',
  gallery10: '/img/gallery/10.webp',
  gallery11: '/img/gallery/11.webp',
  gallery12: '/img/gallery/12.webp',
  gallery13: '/img/gallery/13.webp',
  gallery14: '/img/gallery/14.webp',
  gallery15: '/img/gallery/15.webp',
  gallery16: '/img/gallery/16.webp',
  lamp: '/img/02.webp',
  takja: '/img/takja.webp',
}

export default function ArtworkDetailPage() {
  const params = useParams()
  const { t, lang } = useI18n()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const id = typeof params?.id === 'string' ? params.id : ''
  const artwork = artworkData[id]
  const content: ArtworkLang | undefined = artwork ? (artwork[lang as Lang] ?? artwork.ko) : undefined
  const imageUrls = artwork ? (artwork.images ?? (artwork.image ? [artwork.image] : [])) : []

  // 스크롤 리빌 애니메이션
  useEffect(() => {
    // body opacity: 0 → 1 전환 (CSS page-loaded 클래스)
    setTimeout(() => document.body.classList.add('page-loaded'), 100)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    setTimeout(() => {
      document.querySelector('.detail-image, .detail-image-gallery')?.classList.add('img-visible')
      const detailInfo = document.querySelector('.detail-info')
      if (detailInfo) observer.observe(detailInfo)
      document.querySelectorAll('.detail-studio-label, .detail-title-line, .artwork-description, .artwork-story').forEach((el) => {
        el.classList.add('detail-reveal')
        observer.observe(el)
      })
      document.querySelectorAll('.related-item, .section-title').forEach((el) => observer.observe(el))
    }, 80)

    // 스크롤 진행 바
    const bar = document.getElementById('scrollProgress')
    if (bar) {
      window.addEventListener(
        'scroll',
        () => {
          const docH = document.documentElement.scrollHeight - window.innerHeight
          bar.style.width = (window.scrollY / docH) * 100 + '%'
        },
        { passive: true },
      )
    }

    // 스크롤 투 탑
    const scrollTopBtn = document.getElementById('scrollTopBtn')
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 600), { passive: true })
      scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    }

    // 이미지 fade-in
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      if (img.complete && img.naturalWidth > 0) img.classList.add('img-loaded')
      else img.addEventListener('load', () => img.classList.add('img-loaded'))
    })

    return () => observer.disconnect()
  }, [id, lang])

  // 이미지 갤러리 키보드
  useEffect(() => {
    if (imageUrls.length <= 1) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))
      if (e.key === 'ArrowRight') setCurrentImageIndex((i) => (i + 1) % imageUrls.length)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [imageUrls.length])

  // 관련 작품 캐러셀
  const carouselRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const wrapper = carouselRef.current
    if (!wrapper || window.innerWidth <= 768) return
    let pos = 0
    let raf: number
    let paused = false

    const animate = () => {
      if (!paused) {
        pos -= 0.5
        const totalW = wrapper.children.length * 324
        if (Math.abs(pos) >= totalW / 2) pos = 0
        wrapper.style.transform = `translateX(${pos}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    // 아이템 복제
    const originals = Array.from(wrapper.children)
    originals.forEach((el) => wrapper.appendChild(el.cloneNode(true)))
    raf = requestAnimationFrame(animate)

    wrapper.addEventListener('mouseenter', () => { paused = true })
    wrapper.addEventListener('mouseleave', () => { paused = false })

    return () => cancelAnimationFrame(raf)
  }, [lang])

  if (!artwork || !content) {
    return (
      <div className="artwork-detail">
        <div className="container">
          <div className="detail-loading">
            <h2>{t('artworkDetail.notFound.title')}</h2>
            <p>{t('artworkDetail.notFound.description')}</p>
            <Link href="/" className="back-link">{t('artworkDetail.notFound.backLink')}</Link>
          </div>
        </div>
      </div>
    )
  }

  const relatedArtworks = Object.entries(
    (lang === 'ko'
      ? {
          gallery01: { title: '한지 모시 무드등', period: '색상은 전통 오방색을 베이스로 제작됩니다.' },
          gallery03: { title: '한지 조각품 컬렉션', period: '한지의 가능성을 탐구한 현대 조각 작품' },
          gallery09: { title: '오방색과 모란의 조화를 담은 자수함', period: '오방색과 모란의 조화: 오방색 자수함' },
          gallery10: { title: "황후의 시간(The Empress's Time)", period: '왕후의 아침을 여는 고결한 목련의 빛' },
          gallery11: { title: '무드등(염원:기원의 빛)', period: '오방색을 활용한 전통한지 무드등' },
          gallery12: { title: '장무상망', period: '오래도록 서로 잊지말자는 약속을 담은 오브제' },
          gallery13: { title: '마음을 담는 보석함', period: '한국전통 패물함(혼구용품)' },
          lamp: { title: '바람의결 - 모시풍경', period: '색상은 전통 오방색을 베이스로 제작됩니다.' },
          takja: { title: '찻상(명상/우담바라를 기다리며)', period: '명상 - 우담바라를 기다리며' },
        }
      : lang === 'fr'
      ? {
          gallery01: { title: "Lampe d'Ambiance Hanji-Ramie", period: 'Les couleurs sont faites sur la base des couleurs traditionnelles à cinq éléments' },
          gallery03: { title: 'Collection de Sculptures en Hanji', period: 'Sculpture contemporaine explorant les possibilités du hanji' },
          gallery09: { title: 'Boîte à Broderie avec Harmonie des Cinq Couleurs et Pivoines', period: 'Harmonie des cinq couleurs et pivoines' },
          gallery10: { title: "Le Temps de l'Impératrice", period: 'Lumière noble de magnolia ouvrant le matin de la reine' },
          gallery11: { title: "Lampe d'Ambiance (Souhait : Lumière de Prière)", period: "Lampe d'ambiance hanji traditionnelle" },
          gallery12: { title: 'Souvenir Éternel', period: "Objet contenant la promesse de ne pas s'oublier longtemps" },
          gallery13: { title: 'Boîte à Bijoux qui Porte le Cœur', period: 'Boîte accessoires traditionnelle coréenne' },
          lamp: { title: 'Bord du Vent - Paysage de Ramie', period: 'Contemporain, 21e Siècle' },
          takja: { title: 'Armure en Papier Traditionnelle', period: 'Dynastie Joseon, 17e Siècle' },
        }
      : {
          gallery01: { title: 'Hanji Ramie Mood Lamp', period: 'Colors are made based on traditional five-element colors' },
          gallery03: { title: 'Hanji Sculpture Collection', period: 'Contemporary sculpture exploring the possibilities of hanji' },
          gallery09: { title: 'Embroidery Box with Harmony of Five Colors and Peonies', period: 'Five Colors and Peony Harmony' },
          gallery10: { title: "The Empress's Time", period: "Noble magnolia light opening the queen's morning" },
          gallery11: { title: 'Mood Lamp (Wish: Light of Prayer)', period: 'Traditional hanji mood lamp using five colors' },
          gallery12: { title: 'Eternal Remembrance', period: 'Object containing the promise not to forget each other' },
          gallery13: { title: 'Jewelry Box that Holds the Heart', period: 'Traditional Korean accessory box (wedding items)' },
          lamp: { title: "Wind's Edge - Ramie Wind Bell", period: 'Contemporary, 21st Century' },
          takja: { title: 'Traditional Paper Armor', period: 'Joseon Dynasty, 17th Century' },
        }) as Record<string, { title: string; period: string }>,
  )

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Top Navigation */}
      <nav className="top-nav scrolled">
        <div className="nav-container">
          <div className="nav-left-action">
            <Link href="/#gallery" className="back-nav-link">← Collection</Link>
          </div>
          <div className="logo">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>{t('logo.title')}</h1>
              <p>{t('logo.subtitle')}</p>
            </Link>
          </div>
          <div className="nav-actions">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Artwork Detail */}
      <section className="artwork-detail">
        <div className="container">
          <div className="detail-header">
            <Link href="/#gallery" className="back-link">{t('related.backLink')}</Link>
          </div>
          <div className="detail-content" id="artwork-content">
            {/* 이미지 영역 */}
            {imageUrls.length === 1 ? (
              <div className="detail-image single">
                <img src={imageUrls[0]} alt={content.title} loading="lazy" />
              </div>
            ) : (
              <div className="detail-image-gallery">
                <div className="main-image">
                  <img
                    id="mainImage"
                    src={imageUrls[currentImageIndex]}
                    alt={`${content.title} ${currentImageIndex + 1}`}
                    loading="lazy"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCurrentImageIndex((i) => (i + 1) % imageUrls.length)}
                  />
                  <div className="image-nav">
                    <button
                      className="image-nav-btn prev"
                      onClick={() => setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))}
                    >
                      ‹
                    </button>
                    <button
                      className="image-nav-btn next"
                      onClick={() => setCurrentImageIndex((i) => (i + 1) % imageUrls.length)}
                    >
                      ›
                    </button>
                  </div>
                  <div className="image-counter">
                    <span>{String(currentImageIndex + 1).padStart(2, '0')}</span>
                    <span className="counter-sep"> / </span>
                    {String(imageUrls.length).padStart(2, '0')}
                  </div>
                </div>
                <div className="image-thumbnails">
                  {imageUrls.map((url, i) => (
                    <div
                      key={i}
                      className={`thumbnail${i === currentImageIndex ? ' active' : ''}`}
                      onClick={() => setCurrentImageIndex(i)}
                    >
                      <img src={url} alt={`${content.title} ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 텍스트 정보 */}
            <div className="detail-info">
              <span className="detail-studio-label">{t('logo.title')}</span>
              <h1>{content.title}</h1>
              <div className="detail-title-line"></div>
              <div className="artwork-description">
                <p>{content.description}</p>
              </div>
              <div className="artwork-story">
                <h3>{t('artworkDetail.storyTitle')}</h3>
                <p>{content.story}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Artworks */}
      <section className="related-artworks">
        <div className="container">
          <h2 className="section-title">{t('related.title')}</h2>
          <div className="carousel-container">
            <button className="carousel-btn prev" id="prevBtn" aria-label="Previous">‹</button>
            <div className="related-carousel">
              <div className="related-items-wrapper" id="relatedItemsWrapper" ref={carouselRef}>
                {relatedArtworks.map(([artId, art]) => (
                  <div
                    key={artId}
                    className="related-item"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      document.body.classList.remove('page-loaded')
                      setTimeout(() => { window.location.href = `/artwork/${artId}` }, 400)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        document.body.classList.remove('page-loaded')
                        setTimeout(() => { window.location.href = `/artwork/${artId}` }, 400)
                      }
                    }}
                  >
                    <img src={relatedImages[artId] ?? '/img/placeholder.webp'} alt={art.title} loading="lazy" />
                    <div className="related-info">
                      <h3>{art.title}</h3>
                      <p>{art.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-btn next" id="nextBtn" aria-label="Next">›</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer detail-footer">
        <div className="container">
          <div className="detail-footer-content">
            <div className="footer-main">
              <h3>{t('logo.title')}</h3>
              <div className="footer-contact">
                <span>{t('footer.contact.email')}</span>{' '}
                <a href="mailto:hongcraftstudio@gmail.com">{t('footer.contact.emailAddress')}</a>
                <a href="https://www.instagram.com/hhj_hanj1craft">{t('footer.social.instagram')}</a>
              </div>
            </div>
            <div className="footer-nav">
              <Link href="/#gallery" className="footer-back-btn">{t('related.backLink')}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button className="scroll-top-btn" id="scrollTopBtn" aria-label="맨 위로">↑</button>
    </>
  )
}

// 언어 전환기 (상세 페이지용)
function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const langLabels: Record<Lang, string> = { ko: 'KO', en: 'EN', fr: 'FR' }

  return (
    <div className="language-switcher">
      <button className="lang-btn" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}>
        {langLabels[lang]}
      </button>
      <div className={`lang-dropdown${open ? ' show' : ''}`}>
        {(['ko', 'en', 'fr'] as Lang[]).map((l) => (
          <button
            key={l}
            className={`lang-option${lang === l ? ' active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setLang(l); setOpen(false) }}
          >
            {l === 'ko' ? '한국어' : l === 'en' ? 'English' : 'Français'}
          </button>
        ))}
      </div>
    </div>
  )
}

