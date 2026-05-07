package com.ironkim.moyeobang.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "PricePolicyRegisterRequest", description = "가격 정책 등록 요청 DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PricePolicyRegisterRequest {

    @Schema(description = "정책명", example = "평일 주간")
    @NotBlank(message = "정책명은 필수입니다.")
    @Size(max = 100, message = "정책명은 100자 이하여야 합니다.")
    private String name;

    @Schema(description = "테마 ID", example = "1")
    private Long themeId;

    @Schema(description = "시작일", example = "2026-05-01")
    private LocalDate startDate;

    @Schema(description = "종료일", example = "2026-12-31")
    private LocalDate endDate;

    @Schema(description = "요일 비트마스크", example = "31")
    private Integer dayOfWeek;

    @Schema(description = "시작시간", example = "10:00:00")
    private LocalTime startTime;

    @Schema(description = "종료시간", example = "18:00:00")
    private LocalTime endTime;

    @Schema(description = "우선순위", example = "1")
    @NotNull(message = "우선순위는 필수입니다.")
    private Integer priority;

    @Schema(description = "활성화 여부", example = "true")
    @NotNull(message = "활성화 여부는 필수입니다.")
    private Boolean active;

    @Valid
    @NotNull(message = "가격 상세 목록은 필수입니다.")
    @Schema(description = "가격 상세 목록")
    private List<PriceDetailRequest> priceDetailList;
}
