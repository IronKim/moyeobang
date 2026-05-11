package com.ironkim.moyeobang.dto.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.constant.AuthStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "StoreDetailResponse", description = "스토어 상세 정보 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class StoreDetailResponse {

    @Schema(description = "스토어 ID", example = "1")
    private Long storeId;

    @Schema(description = "계정 ID", example = "owner_escape")
    private String accountId;

    @Schema(description = "기업명", example = "미로연구소")
    private String businessName;

    @Schema(description = "사업자등록번호", example = "1234567890")
    private String businessNumber;

    @Schema(description = "지점명", example = "홍대점")
    private String branchName;

    @Schema(description = "주소", example = "서울특별시 마포구 와우산로 123")
    private String address;

    @Schema(description = "상세주소", example = "2층")
    private String addressDetail;

    @Schema(description = "업체 소개", example = "홍대 앞에서 운영 중인 몰입형 방탈출 카페입니다.")
    private String storeDescription;

    @Schema(description = "위도", example = "37.556993")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "126.922679")
    private BigDecimal longitude;

    @Schema(description = "인증 상태", example = "PENDING")
    private AuthStatus authStatus;

    @Schema(description = "매장 전화번호 목록")
    private List<StoreNumberResponse> storeNumberList;

    public static StoreDetailResponse fromEntity(Store store) {
        return StoreDetailResponse.builder()
                .storeId(store.getId())
                .accountId(store.getAccount().getAccountId())
                .businessName(store.getBusinessName())
                .businessNumber(store.getBusinessNumber())
                .branchName(store.getBranchName())
                .address(store.getAddress())
                .addressDetail(store.getAddressDetail())
                .storeDescription(store.getDescription())
                .latitude(store.getLatitude())
                .longitude(store.getLongitude())
                .authStatus(store.getAuthStatus())
                .storeNumberList(store.getContactList().stream()
                        .map(StoreNumberResponse::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
