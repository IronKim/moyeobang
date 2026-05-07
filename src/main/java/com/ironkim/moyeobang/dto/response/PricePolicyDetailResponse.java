package com.ironkim.moyeobang.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import com.ironkim.moyeobang.domain.PricePolicy;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "PricePolicyDetailResponse", description = "가격 정책 상세 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class PricePolicyDetailResponse {

    @Schema(description = "가격 정책 ID", example = "1")
    private Long policyId;

    @Schema(description = "스토어 ID", example = "1")
    private Long storeId;

    @Schema(description = "테마 ID", example = "1")
    private Long themeId;

    @Schema(description = "정책명", example = "평일 주간")
    private String name;

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
    private Integer priority;

    @Schema(description = "활성화 여부", example = "true")
    private Boolean active;

    @Schema(description = "가격 상세 목록")
    private List<PriceDetailResponse> priceDetailList;

    public static PricePolicyDetailResponse fromEntity(PricePolicy pricePolicy) {
        return PricePolicyDetailResponse.builder()
                .policyId(pricePolicy.getId())
                .storeId(pricePolicy.getStore().getId())
                .themeId(pricePolicy.getTheme() != null ? pricePolicy.getTheme().getId() : null)
                .name(pricePolicy.getName())
                .startDate(pricePolicy.getStartDate())
                .endDate(pricePolicy.getEndDate())
                .dayOfWeek(pricePolicy.getDayOfWeek())
                .startTime(pricePolicy.getStartTime())
                .endTime(pricePolicy.getEndTime())
                .priority(pricePolicy.getPriority())
                .active(pricePolicy.getActive())
                .priceDetailList(pricePolicy.getPriceDetailList().stream()
                        .map(PriceDetailResponse::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
