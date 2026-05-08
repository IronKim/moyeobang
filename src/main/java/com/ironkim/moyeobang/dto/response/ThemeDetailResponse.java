package com.ironkim.moyeobang.dto.response;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.ironkim.moyeobang.domain.Theme;

import com.ironkim.moyeobang.domain.constant.Genre;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "ThemeDetailResponse", description = "테마 상세 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class ThemeDetailResponse {

    @Schema(description = "테마 ID", example = "1")
    private Long themeId;

    @Schema(description = "스토어 ID", example = "1")
    private Long storeId;

    @Schema(description = "테마명", example = "심연의 저택")
    private String title;

    @Schema(description = "테마 설명", example = "폐저택에 숨겨진 진실을 추적하는 공포 추리 테마입니다.")
    private String description;

    @Schema(description = "최소 인원", example = "2")
    private Integer minHeadcount;

    @Schema(description = "최대 인원", example = "6")
    private Integer maxHeadcount;

    @Schema(description = "플레이 시간(분)", example = "75")
    private Integer playTime;

    @Schema(description = "난이도", example = "4")
    private Integer difficultyLevel;

    @Schema(description = "공포도", example = "5")
    private Integer fearLevel;

    @Schema(description = "활동성", example = "3")
    private Integer activityLevel;

    @Schema(description = "장르 목록", example = "[\"HORROR\", \"MYSTERY\"]")
    private Set<Genre> genres;

    public static ThemeDetailResponse fromEntity(Theme theme) {
        return ThemeDetailResponse.builder()
                .themeId(theme.getId())
                .storeId(theme.getStore().getId())
                .title(theme.getTitle())
                .description(theme.getDescription())
                .minHeadcount(theme.getMinHeadcount())
                .maxHeadcount(theme.getMaxHeadcount())
                .playTime(theme.getPlayTime())
                .difficultyLevel(theme.getDifficultyLevel())
                .fearLevel(theme.getFearLevel())
                .activityLevel(theme.getActivityLevel())
                .genres(theme.getThemeGenreList().stream()
                        .map(themeGenre -> themeGenre.getGenre().getName())
                        .collect(Collectors.toCollection(LinkedHashSet::new)))
                .build();
    }
}
