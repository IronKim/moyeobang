package com.ironkim.moyeobang.dto.request;

import java.math.BigDecimal;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "StoreUpdateRequest", description = "스토어 정보 수정 요청 DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreUpdateRequest {

    @Schema(description = "기업명", example = "미로연구소")
    @NotBlank(message = "기업명은 필수입니다.")
    private String businessName;

    @Schema(description = "지점명", example = "홍대점")
    private String branchName;

    @Schema(description = "주소", example = "서울특별시 마포구 와우산로 123")
    @NotBlank(message = "주소는 필수입니다.")
    private String address;

    @Schema(description = "상세주소", example = "2층")
    private String addressDetail;

    @Schema(description = "업체 소개", example = "홍대 앞에서 운영 중인 몰입형 방탈출 카페입니다.")
    @Size(max = 500, message = "업체 소개는 500자 이하여야 합니다.")
    private String description;

    @Valid
    @Schema(description = "매장 전화번호 목록")
    private List<StoreNumberRequest> storeNumberList;

    @Schema(description = "위도", example = "37.556993")
    @NotNull(message = "위도는 필수입니다.")
    @DecimalMin(value = "-90.0000000", message = "위도는 -90~90 범위여야 합니다.")
    @DecimalMax(value = "90.0000000", message = "위도는 -90~90 범위여야 합니다.")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "126.922679")
    @NotNull(message = "경도는 필수입니다.")
    @DecimalMin(value = "-180.0000000", message = "경도는 -180~180 범위여야 합니다.")
    @DecimalMax(value = "180.0000000", message = "경도는 -180~180 범위여야 합니다.")
    private BigDecimal longitude;
}
