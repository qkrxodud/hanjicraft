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

## 🚀 GitHub에 업로드하기

### 1. GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. `New repository` 클릭
3. Repository name: `hanji-craft`
4. Description: `Korean Traditional Hanji Craft Introduction Project`
5. Public으로 설정
6. `Create repository` 클릭

### 2. 로컬 저장소와 연결

```bash
# 원격 저장소 추가 (GitHub username을 본인 것으로 변경)
git remote add origin https://github.com/[YOUR_USERNAME]/hanji-craft.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 🌐 도메인 연결 가이드

### 방법 1: GitHub Pages (무료)

1. **GitHub Repository 설정**
   ```bash
   # 정적 파일 생성용 브랜치 생성
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Repository Settings > Pages**
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`

3. **커스텀 도메인 설정**
   - `Custom domain`에 도메인 입력 (예: `hanjicraft.com`)
   - CNAME 파일이 자동 생성됨

4. **DNS 설정** (도메인 제공업체에서)
   ```
   Type: CNAME
   Name: www
   Value: [username].github.io

   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

### 방법 2: Vercel (추천)

1. **Vercel 계정 생성**: [vercel.com](https://vercel.com)

2. **GitHub 연동**
   - `New Project` 클릭
   - GitHub 저장소 `hanji-craft` 선택
   - Import

3. **빌드 설정**
   ```
   Framework Preset: Other
   Build Command: ./gradlew build
   Output Directory: build/libs
   Install Command: (비워두기)
   ```

4. **도메인 연결**
   - Project Settings > Domains
   - 커스텀 도메인 추가
   - DNS 설정 안내에 따라 도메인 제공업체에서 설정

### 방법 3: Railway

1. **Railway 계정 생성**: [railway.app](https://railway.app)

2. **GitHub 연동 배포**
   - `New Project` > `Deploy from GitHub repo`
   - `hanji-craft` 저장소 선택

3. **환경 변수 설정**
   ```
   PORT=8080
   SPRING_PROFILES_ACTIVE=production
   ```

4. **도메인 설정**
   - Settings > Domains
   - Custom Domain 추가

### 방법 4: Heroku

1. **Heroku CLI 설치 및 로그인**
   ```bash
   heroku login
   ```

2. **Heroku 앱 생성**
   ```bash
   heroku create hanji-craft-app
   ```

3. **Java Buildpack 설정**
   ```bash
   heroku buildpacks:set heroku/gradle
   ```

4. **환경 변수 설정**
   ```bash
   heroku config:set SPRING_PROFILES_ACTIVE=production
   ```

5. **배포**
   ```bash
   git push heroku main
   ```

6. **도메인 연결**
   ```bash
   heroku domains:add hanjicraft.com
   # DNS 설정 안내 출력됨
   ```

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