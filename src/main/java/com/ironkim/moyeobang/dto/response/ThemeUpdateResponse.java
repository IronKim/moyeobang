package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Theme;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "ThemeUpdateResponse", description = "테마 수정 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class ThemeUpdateResponse {

    @Schema(description = "테마 ID", example = "1")
    private Long themeId;

    public static ThemeUpdateResponse fromEntity(Theme theme) {
        return ThemeUpdateResponse.builder()
                .themeId(theme.getId())
                .build();
    }
}
