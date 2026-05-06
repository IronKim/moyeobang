package com.ironkim.moyeobang.dto.response;

import java.math.BigDecimal;

import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.constant.AuthStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "스토어 등록 응답")
public class StoreRegisterResponse {

    @Schema(description = "스토어 ID", example = "1")
    private Long storeId;
    @Schema(description = "등록 계정 ID", example = "owner_escape")
    private String accountId;
    @Schema(description = "상호명", example = "미로연구소")
    private String businessName;
    @Schema(description = "사업자등록번호", example = "1234567890")
    private String businessNumber;
    @Schema(description = "지점명", example = "홍대점")
    private String branchName;
    @Schema(description = "주소", example = "서울특별시 마포구 와우산로 123")
    private String address;
    @Schema(description = "상세주소", example = "2층")
    private String addressDetail;
    @Schema(description = "위도", example = "37.556993")
    private BigDecimal latitude;
    @Schema(description = "경도", example = "126.922679")
    private BigDecimal longitude;
    @Schema(description = "스토어 등록 후 재발급된 JWT", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;
    @Schema(description = "인증 상태", example = "PENDING")
    private AuthStatus authStatus;

    public static StoreRegisterResponse fromEntity(Store store, String token) {
        return StoreRegisterResponse.builder()
                .storeId(store.getId())
                .accountId(store.getAccount().getAccountId())
                .businessName(store.getBusinessName())
                .businessNumber(store.getBusinessNumber())
                .branchName(store.getBranchName())
                .address(store.getAddress())
                .addressDetail(store.getAddressDetail())
                .latitude(store.getLatitude())
                .longitude(store.getLongitude())
                .token(token)
                .authStatus(store.getAuthStatus())
                .build();
    }
}
