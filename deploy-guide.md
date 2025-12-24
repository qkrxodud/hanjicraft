# 🚀 한지공예 사이트 배포 완료 가이드

## 📋 현재 상태
- ✅ 정적 HTML 사이트 준비 완료
- ✅ GitHub Pages 워크플로우 설정 완료
- ✅ CNAME 파일 생성 완료 (hanjicraft.com)
- ✅ 모든 파일 커밋 완료

## 🎯 즉시 배포 단계

### 1단계: GitHub 저장소 생성 및 연결

```bash
# GitHub에서 새 저장소 생성 (이미 완료했다면 건너뛰기)
# 저장소명: hanji-craft
# Public으로 설정

# 로컬 저장소와 GitHub 연결
git remote add origin https://github.com/[YOUR_USERNAME]/hanji-craft.git

# 최종 푸시
git push -u origin main
```

### 2단계: GitHub Pages 활성화

1. **GitHub 저장소 접속**
   - https://github.com/[YOUR_USERNAME]/hanji-craft

2. **Settings → Pages**
   - Source: "GitHub Actions" 선택
   - 자동으로 배포 시작됨

3. **배포 확인**
   - Actions 탭에서 배포 진행상황 확인
   - 성공 시 녹색 체크마크 표시

### 3단계: 도메인 접근 확인

**임시 GitHub 도메인:**
- https://[YOUR_USERNAME].github.io/hanji-craft

**커스텀 도메인 (DNS 설정 후):**
- https://hanjicraft.com
- https://www.hanjicraft.com

## 🌐 DNS 설정 (도메인 연결)

### 도메인 등록업체에서 설정

```dns
# A 레코드 (Apex 도메인용)
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

# CNAME 레코드 (www 서브도메인용)
Type: CNAME
Name: www
Value: [YOUR_USERNAME].github.io
```

### DNS 전파 확인

```bash
# DNS 전파 확인
nslookup hanjicraft.com
dig hanjicraft.com

# 또는 온라인 도구 사용
# https://www.whatsmydns.net/#A/hanjicraft.com
```

## ⚡ 배포 완료 체크리스트

- [ ] GitHub 저장소 생성
- [ ] `git push -u origin main` 실행
- [ ] GitHub Pages 활성화 (Settings > Pages)
- [ ] 배포 워크플로우 성공 확인
- [ ] 임시 도메인 접근 테스트
- [ ] DNS 레코드 설정
- [ ] 커스텀 도메인 접근 테스트

## 🔧 문제 해결

### 1. GitHub Pages가 활성화되지 않는 경우
- Repository가 Public인지 확인
- Settings > Pages에서 Source를 "GitHub Actions"로 설정

### 2. 배포가 실패하는 경우
- Actions 탭에서 오류 로그 확인
- docs/ 폴더에 index.html이 있는지 확인

### 3. 커스텀 도메인이 작동하지 않는 경우
- DNS 설정 재확인 (전파 시간 최대 48시간)
- CNAME 파일 내용 확인: `hanjicraft.com`
- Settings > Pages에서 "Enforce HTTPS" 체크

### 4. SSL 인증서 오류
- GitHub Pages는 자동으로 Let's Encrypt SSL 제공
- DNS 설정 후 최대 24시간 소요

## 📱 최종 결과

성공적으로 배포되면 다음 URL에서 접근 가능:

1. **임시 도메인** (즉시 사용 가능)
   - https://[YOUR_USERNAME].github.io/hanji-craft

2. **커스텀 도메인** (DNS 설정 후)
   - https://hanjicraft.com
   - https://www.hanjicraft.com

## 🎨 사이트 특징

- 📱 완전 반응형 디자인
- 🎭 한국 전통 한지공예 소개
- 🖼️ 8개 제품 갤러리
- ⚡ 빠른 로딩 속도
- 🔒 HTTPS 보안 연결
- 📊 SEO 최적화

---

**배포 완료 후 즉시 전세계 어디서나 접근 가능한 한지공예 소개 웹사이트가 됩니다!**