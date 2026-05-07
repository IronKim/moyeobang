package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.PricePolicy;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "PricePolicyUpdateResponse", description = "가격 정책 수정 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class PricePolicyUpdateResponse {

    @Schema(description = "가격 정책 ID", example = "1")
    private Long policyId;

    public static PricePolicyUpdateResponse fromEntity(PricePolicy pricePolicy) {
        return PricePolicyUpdateResponse.builder()
                .policyId(pricePolicy.getId())
                .build();
    }
}
