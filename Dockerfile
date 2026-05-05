# Build stage
FROM gradle:8.5-jdk17-alpine AS build
WORKDIR /app

# Node.js 설치
RUN apk add --no-cache nodejs npm

# ── Gradle 의존성 캐시 레이어 ──────────────────────────────
# build.gradle이 바뀌지 않으면 이 레이어는 캐시에서 재사용됨
COPY build.gradle settings.gradle ./
COPY gradle gradle
RUN gradle dependencies --no-daemon 2>/dev/null || true

# ── npm 의존성 캐시 레이어 ─────────────────────────────────
# package.json이 바뀌지 않으면 node_modules 재설치 생략
COPY front-end/package.json front-end/package-lock.json* ./front-end/
RUN cd front-end && npm install --force

# ── 소스 전체 복사 후 빌드 ────────────────────────────────
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew build -x test --no-daemon

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/build/libs/app.jar ./app.jar
ENV TZ=Asia/Seoul
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]