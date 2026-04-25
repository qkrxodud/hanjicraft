# 한지공예 프로젝트 하네스

**목표:** hanji-craft(홍현정한지공예 연구소) 사이트의 프론트엔드·i18n 작업을 전담 에이전트 팀이 조율하여 일관성 있게 개발한다.

**트리거:** hanji-craft 관련 작업(HTML 수정, 갤러리, i18n 번역, 배포 등)이 있으면 `hanji` 스킬을 사용하라. 단순 질문은 직접 응답 가능.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-04-14 | 초기 구성 | 전체 | hanji-craft 프로젝트 하네스 신규 구축 |
| 2026-04-14 | 신세계 백화점 럭셔리 리디자인 | docs/css/style.css, docs/index.html, docs/js/i18n.js | 럭셔리 크림/골드 팔레트, 한자 심볼, 입점 문의 섹션 추가 |
| 2026-04-14 | 동적 인터랙션 및 구조 개편 | style.css, artwork-detail.css, main.js, index.html, artwork-detail.html, i18n.js | 스크롤 진행바, 히어로 패럴랙스, 마키 스트립, 숫자 카운트업, 커스텀 커서, 라이트박스, 페이지 입장 애니메이션 추가 |
| 2026-04-15 | 상세 페이지 럭셔리 애니메이션 | artwork-detail.css, artwork-detail.js | 스크롤 리빌(clip-path/translateY), 스태거 meta, 검정 story 블록, related 카드 언더라인 호버, 이미지 슬라이드인 |
| 2026-04-15 | 전체 컬러 팔레트 완성 | style.css, artwork-detail.css | 크림/골드/차콜 팔레트 전면 적용: 진행바→골드(#B8975A), 썸네일 활성 테두리→골드, 관련작품 카드 bg→크림, 타이포 #000→#1C1C1C, 연한 텍스트→rgba(28,28,28,0.4) |
| 2026-04-18 | 모바일 전면 최적화 | style.css, artwork-detail.css | 480px 로고 폰트 역전 수정, slide-content h2/section-title/editorial-text h3/brand-subtitle 크기 조정, hero-stats 2×2 그리드, inquiry-lead 패딩 수정 |
| 2026-04-18 | 상세 페이지 모바일 최적화 | artwork-detail.css, artwork-detail.js | 언어버튼 이중 이벤트 제거, 관련작품 스와이프 캐러셀, story 풀블리드, 이미지 카운터 오버레이, luxury studio-label/title-line 추가 |
| 2026-04-18 | UX hover/active 일관성 | style.css, artwork-detail.css | brand-card/hero-btn/inquiry-btn/related-item/carousel-btn hover·active 상태 추가, carousel-btn 골드 호버 |
| 2026-04-18 | CSS 중복 제거 및 팔레트 정리 | style.css | .reveal 클래스 이중 정의 제거, cursor-ring.hovering 골드 직접 지정, hero-stat-label 대비 개선 |
| 2026-04-18 | i18n philosophy.label 추가 | i18n.js, index.html | 철학 섹션 紙 라벨 KO/EN/FR 번역 키 등록 |
| 2026-04-18 | 관련작품 카드 여백 수정 | artwork-detail.css | .related-info padding 0→1.4rem 1.6rem으로 개선 |
| 2026-04-18 | 히어로 슬라이드 3개 추가 | index.html, i18n.js, main.js, style.css | slide2/slide3 추가, 인디케이터 UI, 슬라이드 전환 시 animation reset, contextmenu 버그 제거 |
| 2026-04-18 | 상세 페이지 QA 및 마무리 | artwork-detail.html, artwork-detail.js, artwork-detail.css, i18n.js | gallery03 i18n 누락 수정, 푸터 백버튼 i18n 적용, related-item transition 충돌 수정, #E4DDD3→#EDE7DC 팔레트 정렬, role=button 접근성 추가 |
| 2026-04-18 | 메인 페이지 접근성·버그 마무리 | index.html, main.js, style.css | masterpiece-item role=button+키보드 이벤트, brand-card transition 누락(transform/box-shadow) 수정 |
| 2026-04-18 | UX 전면 향상 | main.js, artwork-detail.js, style.css, index.html, artwork-detail.html | 히어로 스와이프+화살표키, 활성 nav 하이라이트, 스크롤탑 버튼, 이미지 fade-in, 마키 호버 pause, 포커스 링 골드, 페이지 fade-out 전환, bottom-nav 스크롤 숨김 |
| 2026-04-18 | 접근성·디테일 완성 | style.css, artwork-detail.css, main.js | prefers-reduced-motion, 언어전환 fade, 앵커 스크롤 nav 오프셋, 히어로 scroll-hint, zoom-in/out 커서, masterpiece 골드 언더라인, 이미지 에러 처리 |
| 2026-04-18 | 히어로 모바일 검은공간 수정 | style.css, main.js, index.html | hero padding-top:60px 제거(검은 공간 원인), nav 투명→scrolled 시 크림 전환, hero 100dvh 적용, LCP 이미지 eager/fetchpriority 추가 |