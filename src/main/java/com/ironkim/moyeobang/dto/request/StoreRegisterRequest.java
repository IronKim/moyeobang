package com.ironkim.moyeobang.dto.request;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "StoreRegisterRequest", description = "스토어 등록 요청 DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreRegisterRequest {

    @Schema(description = "상호명", example = "미로연구소")
    @NotBlank(message = "상호명을 입력해주세요.")
    @Size(max = 50, message = "상호명은 50자 이하여야 합니다.")
    private String businessName;

    @Schema(description = "사업자등록번호(숫자 10자리)", example = "1234567890")
    @NotBlank(message = "사업자번호를 입력해주세요.")
    @Size(max = 10, message = "사업자번호는 10자 이하여야 합니다.")
    private String businessNumber;

    @Schema(description = "지점명", example = "홍대점")
    @Size(max = 20, message = "지점명은 20자 이하여야 합니다.")
    private String branchName;

    @Schema(description = "도로명 주소", example = "서울특별시 마포구 와우산로 123")
    @NotBlank(message = "주소를 입력해주세요.")
    @Size(max = 255, message = "주소는 255자 이하여야 합니다.")
    private String address;

    @Schema(description = "상세 주소", example = "2층")
    @Size(max = 50, message = "상세주소는 50자 이하여야 합니다.")
    private String addressDetail;

    @Valid
    @Schema(description = "매장 전화번호 목록")
    private List<StoreNumberRequest> storeNumberList;

    @Schema(description = "위도", example = "37.5569930")
    @NotNull(message = "위도 값을 입력해주세요.")
    @DecimalMin(value = "-90.0", message = "위도는 -90 이상이어야 합니다.")
    @DecimalMax(value = "90.0", message = "위도는 90 이하여야 합니다.")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "126.9226790")
    @NotNull(message = "경도 값을 입력해주세요.")
    @DecimalMin(value = "-180.0", message = "경도는 -180 이상이어야 합니다.")
    @DecimalMax(value = "180.0", message = "경도는 180 이하여야 합니다.")
    private BigDecimal longitude;
}
