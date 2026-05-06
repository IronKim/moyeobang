package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.constant.AuthStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StoreSimpleResponse {

    @Schema(description = "스토어 ID", example = "1")
    private Long storeId;

    @Schema(description = "기업명", example = "미로연구소")
    private String businessName;

    @Schema(description = "지점명", example = "홍대점")
    private String branchName;

    @Schema(description = "인증 상태", example = "PENDING")
    private AuthStatus authStatus;

    public static StoreSimpleResponse fromEntity(Store store) {
        return new StoreSimpleResponse(
                store.getId(),
                store.getBusinessName(),
                store.getBranchName(),
                store.getAuthStatus());
    }
}
