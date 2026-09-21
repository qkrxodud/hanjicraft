export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// 노출 토글 — 공개 시점이 확정되면 해당 값만 true로 바꾸면 그대로 복구된다.
// (마크업·스타일·번역은 모두 남겨두고 렌더만 막는다)
// 네이버 팝업스토어 모달: 행사 기간(2026.6.20~7.5) 종료로 잠시 내림
export const SHOW_NAVER_POPUP = false
// 루이비통 추석 협업 소식 섹션: 공개 일정 조율 중이라 잠시 내림
export const SHOW_COLLABORATION = false
