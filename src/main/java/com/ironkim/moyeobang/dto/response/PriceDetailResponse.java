package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.PriceDetail;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "PriceDetailResponse", description = "가격 상세 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class PriceDetailResponse {

    @Schema(description = "가격 상세 ID", example = "1")
    private Long id;

    @Schema(description = "인원", example = "2")
    private Integer headcount;

    @Schema(description = "가격", example = "25000")
    private Integer price;

    public static PriceDetailResponse fromEntity(PriceDetail priceDetail) {
        return PriceDetailResponse.builder()
                .id(priceDetail.getId())
                .headcount(priceDetail.getHeadcount())
                .price(priceDetail.getPrice())
                .build();
    }
}
