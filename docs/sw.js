// Service Worker for Image Caching - Hanji Craft
// 이미지 캐싱을 통한 성능 최적화

const CACHE_NAME = 'hanji-craft-images-v1';
const IMAGE_CACHE_NAME = 'hanji-craft-images';

// 캐시할 이미지 목록
const imagesToCache = [
    './img/01.webp',
    './img/02.webp',
    './img/03.webp',
    './img/04.webp',
    './img/03.webp',
    './img/06.webp',
    './img/07.webp',
    './img/08.webp'
];

// Service Worker 설치 시 중요 이미지들을 미리 캐시
self.addEventListener('install', event => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(IMAGE_CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching important images...');
                // 첫 3개 이미지만 즉시 캐시 (중요한 이미지들)
                return cache.addAll(imagesToCache.slice(0, 3));
            })
            .then(() => self.skipWaiting())
    );
});

// Service Worker 활성화
self.addEventListener('activate', event => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 오래된 캐시 삭제
                    if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // 이미지 요청인지 확인
    if (request.destination === 'image' ||
        url.pathname.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i)) {

        event.respondWith(handleImageRequest(request));
    }
});

// 이미지 요청 처리 - Cache First 전략
async function handleImageRequest(request) {
    try {
        // 1. 캐시에서 먼저 확인
        const cache = await caches.open(IMAGE_CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            console.log('[SW] Serving from cache:', request.url);
            return cachedResponse;
        }

        // 2. 캐시에 없으면 네트워크에서 가져와서 캐시에 저장
        console.log('[SW] Fetching from network:', request.url);
        const networkResponse = await fetch(request);

        // 성공적인 응답이면 캐시에 저장
        if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            await cache.put(request, responseToCache);
            console.log('[SW] Cached new image:', request.url);
        }

        return networkResponse;

    } catch (error) {
        console.error('[SW] Error handling image request:', error);

        // 오프라인 상황이나 에러 시 대체 이미지 반환 (선택사항)
        return new Response('', {
            status: 404,
            statusText: 'Image not found'
        });
    }
}

// 백그라운드에서 나머지 이미지들 캐시
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_REMAINING_IMAGES') {
        event.waitUntil(cacheRemainingImages());
    }
});

// 나머지 이미지들을 백그라운드에서 캐시
async function cacheRemainingImages() {
    try {
        const cache = await caches.open(IMAGE_CACHE_NAME);
        const remainingImages = imagesToCache.slice(3); // 4번째부터 마지막까지

        console.log('[SW] Caching remaining images in background...');

        // 각 이미지를 개별적으로 캐시 (실패해도 다른 이미지에 영향 없음)
        for (const imageUrl of remainingImages) {
            try {
                const response = await fetch(imageUrl);
                if (response.ok) {
                    await cache.put(imageUrl, response);
                    console.log('[SW] Background cached:', imageUrl);
                }
            } catch (error) {
                console.warn('[SW] Failed to cache:', imageUrl, error);
            }

            // 각 이미지 캐시 후 잠시 대기 (부하 분산)
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log('[SW] Background caching completed');

    } catch (error) {
        console.error('[SW] Error in background caching:', error);
    }
}

// 캐시 정리 함수
async function cleanOldCache() {
    try {
        const cache = await caches.open(IMAGE_CACHE_NAME);
        const keys = await cache.keys();

        // 7일 이상 된 캐시 항목 삭제
        const now = Date.now();
        const weekAgo = now - (7 * 24 * 60 * 60 * 1000);

        for (const request of keys) {
            const response = await cache.match(request);
            if (response) {
                const dateHeader = response.headers.get('date');
                if (dateHeader) {
                    const cacheDate = new Date(dateHeader).getTime();
                    if (cacheDate < weekAgo) {
                        await cache.delete(request);
                        console.log('[SW] Cleaned old cache:', request.url);
                    }
                }
            }
        }
    } catch (error) {
        console.error('[SW] Error cleaning cache:', error);
    }
}

// 주기적으로 캐시 정리
setInterval(cleanOldCache, 24 * 60 * 60 * 1000); // 24시간마다