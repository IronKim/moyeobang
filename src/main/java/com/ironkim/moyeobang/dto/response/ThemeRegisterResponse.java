package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Theme;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "ThemeRegisterResponse", description = "테마 등록 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class ThemeRegisterResponse {

    @Schema(description = "테마 ID", example = "1")
    private Long themeId;

    public static ThemeRegisterResponse fromEntity(Theme theme) {
        return ThemeRegisterResponse.builder()
                .themeId(theme.getId())
                .build();
    }
}
