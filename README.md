# 홍현정한지공예 연구소 (Hong Hyun-jeong Hanji Craft Studio)

전통 한지공예의 아름다움과 문화적 가치를 소개하는 정적 웹사이트입니다.

## 기술 스택

- HTML / CSS / JavaScript
- GitHub Pages (배포)

## 프로젝트 구조

```
hanji-craft/
├── docs/                     # GitHub Pages 정적 파일
│   ├── index.html            # 메인 페이지
│   ├── artwork-detail.html   # 작품 상세 페이지
│   ├── css/
│   │   ├── style.css
│   │   └── artwork-detail.css
│   ├── js/
│   │   ├── main.js
│   │   ├── artwork-detail.js
│   │   └── i18n.js           # KO / EN / FR 다국어
│   └── img/                  # 한지공예 이미지 (webp)
└── .claude/                  # Claude Code 하네스 설정
    ├── agents/               # hanji-frontend, hanji-i18n
    └── skills/hanji/         # 오케스트레이터 스킬
```

## 주요 기능

- KO / EN / FR 3개 언어 지원
- 반응형 디자인 (480px / 768px / 1024px)
- 럭셔리 크림·골드·차콜 팔레트
- 히어로 슬라이더, 스크롤 리빌, 커스텀 커서
- 작품 상세 페이지 (갤러리, 관련작품 캐러셀)

## 배포 (GitHub Pages)

```bash
git push origin main
```

Settings → Pages → Source: `docs/` 폴더로 설정.

## 문의

- 이메일: hongcraftstudio@gmail.com
- 인스타그램: [@hhj_hanj1craft](https://www.instagram.com/hhj_hanj1craft)
