package com.ironkim.moyeobang.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "PriceDetailRequest", description = "가격 상세 요청 DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceDetailRequest {

    @Schema(description = "인원", example = "2")
    @NotNull(message = "인원은 필수입니다.")
    @Min(value = 1, message = "최소 인원은 1 이상이어야 합니다.")
    private Integer headcount;

    @Schema(description = "가격", example = "25000")
    @NotNull(message = "가격은 필수입니다.")
    @Min(value = 0, message = "가격은 0 이상이어야 합니다.")
    private Integer price;
}
