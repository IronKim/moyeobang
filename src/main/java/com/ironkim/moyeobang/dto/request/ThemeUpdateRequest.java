package com.ironkim.moyeobang.dto.request;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "ThemeUpdateRequest", description = "테마 수정 요청 DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThemeUpdateRequest {

    @Schema(description = "테마명", example = "심연의 저택 리뉴얼")
    @NotBlank(message = "테마명은 필수입니다.")
    @Size(max = 50, message = "테마명은 50자 이하여야 합니다.")
    private String title;

    @Schema(description = "테마 설명", example = "리뉴얼된 퍼즐과 스토리가 적용된 공포 추리 테마입니다.")
    @NotBlank(message = "테마 설명은 필수입니다.")
    private String description;

    @Schema(description = "최소 인원", example = "2")
    @NotNull(message = "최소 인원은 필수입니다.")
    @Min(value = 1, message = "최소 인원은 1 이상이어야 합니다.")
    private Integer minHeadcount;

    @Schema(description = "최대 인원", example = "6")
    @NotNull(message = "최대 인원은 필수입니다.")
    @Min(value = 1, message = "최대 인원은 1 이상이어야 합니다.")
    private Integer maxHeadcount;

    @Schema(description = "플레이 시간(분)", example = "75")
    @NotNull(message = "플레이 시간은 필수입니다.")
    @Min(value = 1, message = "플레이 시간은 1 이상이어야 합니다.")
    private Integer playTime;

    @Schema(description = "난이도 (1-10)", example = "4")
    @NotNull(message = "난이도는 필수입니다.")
    @Min(value = 1, message = "난이도는 1 이상이어야 합니다.")
    @Max(value = 10, message = "난이도는 10 이하여야 합니다.")
    private Integer difficultyLevel;

    @Schema(description = "공포도 (1-10)", example = "5")
    @Min(value = 1, message = "공포도는 1 이상이어야 합니다.")
    @Max(value = 10, message = "공포도는 10 이하여야 합니다.")
    private Integer fearLevel;

    @Schema(description = "활동성 (1-10)", example = "3")
    @Min(value = 1, message = "활동성은 1 이상이어야 합니다.")
    @Max(value = 10, message = "활동성은 10 이하여야 합니다.")
    private Integer activityLevel;

    @Schema(description = "테마 장르 목록", example = "[\"HORROR\", \"MYSTERY\"]")
    @NotEmpty(message = "장르 목록은 최소 1개 이상이어야 합니다.")
    private Set<com.ironkim.moyeobang.domain.constant.Genre> genres;
}
