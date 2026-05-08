package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Theme;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Tag(name = "ThemeSimpleResponse", description = "테마 목록 응답 DTO")
@Getter
@AllArgsConstructor
public class ThemeSimpleResponse {

    @Schema(description = "테마 ID", example = "1")
    private Long themeId;

    @Schema(description = "테마명", example = "심연의 저택")
    private String title;

    public static ThemeSimpleResponse fromEntity(Theme theme) {
        return new ThemeSimpleResponse(
                theme.getId(),
                theme.getTitle());
    }
}
