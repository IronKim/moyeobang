# Build stage
FROM gradle:8.5-jdk17-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew clean build -x test

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/build/libs/app.jar ./app.jar
ENV TZ=Asia/Seoul
ENTRYPOINT ["java", "-jar", "/app.jar"]
