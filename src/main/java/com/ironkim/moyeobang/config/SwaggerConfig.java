package com.ironkim.moyeobang.config;

import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi authGroupedOpenApi() {
        return GroupedOpenApi
                .builder()
                .group("auth") // group 설정 (API들을 그룹화시켜 그룹에 속한 API들만 확인할 수 있도록 도와줌)
                .pathsToMatch("api/v1/auth/**") // group에 포함될 API endpoint 경로
                .addOpenApiCustomizer(
                        openApi ->
                                openApi
                                        .setInfo(
                                                new Info()
                                                        .title("auth api") // API 제목
                                                        .description("auth api 명세서") // API 설명
                                                        .version("1.0.0") // API 버전
                                        )
                )
                .build();
    }
}
