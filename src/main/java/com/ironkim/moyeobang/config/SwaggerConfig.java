package com.ironkim.moyeobang.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

        @Bean
        public OpenAPI customOpenAPI() {
                SecurityScheme securityScheme = new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("JWT 토큰을 입력해주세요");

                SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

                return new OpenAPI()
                                .components(new Components().addSecuritySchemes("bearerAuth", securityScheme))
                                .addSecurityItem(securityRequirement);
        }

        @Bean
        public GroupedOpenApi authGroupedOpenApi() {
                return GroupedOpenApi
                                .builder()
                                .group("auth") // group 설정 (API들을 그룹화시켜 그룹에 속한 API들만 확인할 수 있도록 도와줌)
                                .pathsToMatch("/api/v1/auth/**") // group에 포함될 API endpoint 경로
                                .addOpenApiCustomizer(
                                                openApi -> openApi
                                                                .setInfo(
                                                                                new Info()
                                                                                                .title("auth api") // API
                                                                                                                   // 제목
                                                                                                .description("auth api 명세서") // API
                                                                                                                             // 설명
                                                                                                .version("1.0.0") // API
                                                                                                                  // 버전
                                                                ))
                                .build();
        }

        @Bean
        public GroupedOpenApi storeGroupedOpenApi() {
                return GroupedOpenApi
                                .builder()
                                .group("store")
                                .pathsToMatch("/api/v1/store/**")
                                .addOpenApiCustomizer(
                                                openApi -> openApi
                                                                .setInfo(
                                                                                new Info()
                                                                                                .title("store api")
                                                                                                .description("store api 명세서")
                                                                                                .version("1.0.0")))
                                .build();
        }
}
