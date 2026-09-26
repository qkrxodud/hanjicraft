/* 정적 자산 캐시 서비스 워커
 *
 * GitHub Pages는 Cache-Control: max-age=600(10분)만 내려주므로 재방문마다
 * 이미지 32MB를 다시 검증/다운로드하게 된다. 작품 이미지는 거의 바뀌지 않으므로
 * cache-first로 저장해 재방문을 즉시 렌더로 만든다.
 *
 * 캐시 대상은 안전한 것만:
 *  - 이미지(/img/…): 바뀔 일이 드물고, 바뀌면 아래 VERSION을 올려 전체 무효화
 *  - /_next/static/…: 파일명에 콘텐츠 해시가 박혀 있어 영구 캐시가 항상 안전
 * HTML은 캐시하지 않는다 — 배포 즉시 새 마크업이 보여야 하므로.
 */
const VERSION = 'hanji-v1'

self.addEventListener('install', () => {
  // 대기 없이 즉시 활성화 — 첫 방문부터 이미지 캐시 적재 시작
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 이전 버전 캐시 정리(VERSION 올렸을 때)
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  // 같은 오리진의 이미지·해시 자산만 다룬다(폰트 CDN 등 외부는 브라우저 캐시에 맡김)
  if (url.origin !== self.location.origin) return

  const isImage = req.destination === 'image' || /\.(webp|jpe?g|png|gif|svg|ico)$/.test(url.pathname)
  const isHashedAsset = url.pathname.includes('/_next/static/')
  if (!isImage && !isHashedAsset) return

  event.respondWith(
    (async () => {
      const cache = await caches.open(VERSION)
      const hit = await cache.match(req)
      if (hit) return hit
      const res = await fetch(req)
      // 정상 응답만 저장(오류·부분 응답 캐시 방지)
      if (res.ok && res.status === 200) cache.put(req, res.clone())
      return res
    })(),
  )
})
