package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.StoreContact;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "StoreNumberResponse", description = "매장 전화번호 응답 DTO")
@Getter
@Builder
@AllArgsConstructor
public class StoreNumberResponse {

    @Schema(description = "전화번호 ID", example = "1")
    private Long id;

    @Schema(description = "매장 전화번호", example = "01012345678")
    private String storeNumber;

    public static StoreNumberResponse fromEntity(StoreContact contact) {
        return StoreNumberResponse.builder()
                .id(contact.getId())
                .storeNumber(contact.getStoreNumber())
                .build();
    }
}