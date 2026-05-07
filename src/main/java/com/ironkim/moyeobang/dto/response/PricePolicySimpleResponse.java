package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.PricePolicy;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Tag(name = "PricePolicySimpleResponse", description = "가격 정책 목록 응답 DTO")
@Getter
@AllArgsConstructor
public class PricePolicySimpleResponse {

    @Schema(description = "가격 정책 ID", example = "1")
    private Long policyId;

    @Schema(description = "정책명", example = "평일 주간")
    private String name;

    @Schema(description = "활성화 여부", example = "true")
    private Boolean active;

    @Schema(description = "우선순위", example = "1")
    private Integer priority;

    public static PricePolicySimpleResponse fromEntity(PricePolicy pricePolicy) {
        return new PricePolicySimpleResponse(
                pricePolicy.getId(),
                pricePolicy.getName(),
                pricePolicy.getActive(),
                pricePolicy.getPriority());
    }
}
