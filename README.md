# 한지공예 소개 프로젝트 (Hanji Craft Introduction Project)

전통 한지공예에 대한 소개와 문화적 가치를 알리는 Spring Boot 기반 웹 애플리케이션입니다.

## 🛠 기술 스택

- **Framework**: Spring Boot 4.0.0
- **Java Version**: 21
- **Template Engine**: Thymeleaf
- **Database**: H2 (개발/운영)
- **Build Tool**: Gradle
- **Containerization**: Docker

## 📋 프로젝트 구조

```
hanji-craft/
├── src/
│   ├── main/
│   │   ├── java/com/hanji/hanji_craft/
│   │   │   ├── HanjiCraftApplication.java
│   │   │   ├── infrastructure/config/
│   │   │   └── presentation/controller/
│   │   └── resources/
│   │       ├── application.yaml
│   │       ├── application-production.yml
│   │       ├── static/img/
│   │       └── templates/
│   └── test/
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/deploy.yml
└── README.md
```

## 🚀 GitHub Pages로 배포하기

### 1. GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. `New repository` 클릭
3. Repository name: `hanji-craft`
4. Description: `Korean Traditional Hanji Craft Introduction Project`
5. Public으로 설정 (GitHub Pages 무료 사용을 위해 필수)
6. `Create repository` 클릭

### 2. 로컬 저장소와 연결 및 푸시

```bash
# 원격 저장소 추가 (GitHub username을 본인 것으로 변경)
git remote add origin https://github.com/[YOUR_USERNAME]/hanji-craft.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 설정

1. **Repository Settings 접속**
   - GitHub 저장소 페이지에서 `Settings` 탭 클릭

2. **Pages 설정**
   - 왼쪽 메뉴에서 `Pages` 클릭
   - Source: `GitHub Actions` 선택
   - 저장하면 자동으로 워크플로우가 실행됨

3. **배포 완료 확인**
   - `Actions` 탭에서 배포 상태 확인
   - 성공하면 `https://[YOUR_USERNAME].github.io/hanji-craft`에서 사이트 확인 가능

### 4. 커스텀 도메인 연결 (선택사항)

1. **도메인 설정**
   - Settings > Pages에서 `Custom domain` 입력
   - 예: `hanjicraft.com`
   - `Enforce HTTPS` 체크

2. **DNS 설정** (도메인 제공업체에서)
   ```
   Type: CNAME
   Name: www
   Value: [YOUR_USERNAME].github.io

   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

## 📁 프로젝트 파일 구조 (GitHub Pages)

```
docs/                    # GitHub Pages 정적 파일
├── index.html          # 메인 페이지
├── css/
│   └── style.css       # 커스텀 스타일시트
├── js/
│   └── main.js         # 커스텀 JavaScript
└── img/                # 한지공예 이미지들
    ├── 01.jpeg
    ├── 02.jpeg
    ├── ...
    └── 08.jpg
```

## 🎯 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **스무스 스크롤**: 부드러운 페이지 내 네비게이션
- **갤러리 애니메이션**: 이미지 로딩 시 페이드 인 효과
- **성능 최적화**: CSS/JS 파일 분리, 이미지 최적화
- **SEO 친화적**: 메타 태그 및 시맨틱 HTML 구조

## 🐳 Docker로 로컬 실행

```bash
# Docker 이미지 빌드
docker build -t hanji-craft .

# 컨테이너 실행
docker run -p 8080:8080 hanji-craft

# 또는 docker-compose 사용
docker-compose up --build
```

## 📝 DNS 설정 예시

### A 레코드 설정 (GitHub Pages)
```
Type: A
Name: @
TTL: 3600
Value: 185.199.108.153
```

### CNAME 설정 (기타 서비스)
```
Type: CNAME
Name: www
TTL: 3600
Value: your-app.vercel.app
```

## 🔧 환경별 설정

### 개발 환경
```yaml
# application.yaml
spring:
  profiles:
    active: development
  h2:
    console:
      enabled: true
```

### 운영 환경
```yaml
# application-production.yml
spring:
  profiles:
    active: production
  h2:
    console:
      enabled: false
```

## 📈 모니터링

애플리케이션이 배포된 후 다음 엔드포인트로 상태를 확인할 수 있습니다:

- Health Check: `https://yourdomain.com/actuator/health`
- Application Info: `https://yourdomain.com/actuator/info`

## 🛡 보안 고려사항

1. **환경 변수 사용**: 중요한 설정값은 환경 변수로 관리
2. **HTTPS 강제**: 운영 환경에서는 HTTPS만 사용
3. **데이터베이스**: 운영 환경에서는 실제 데이터베이스 사용 권장

## 📞 지원

문제가 발생하면 다음을 확인해주세요:

1. 애플리케이션 로그 확인
2. DNS 설정 전파 시간 (최대 48시간)
3. 방화벽/포트 설정
4. SSL 인증서 상태

---

**개발자**: Claude & 사용자
**라이선스**: MIT
**마지막 업데이트**: 2024년 12월