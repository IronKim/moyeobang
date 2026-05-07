package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Store;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Tag(name = "StoreUpdateResponse", description = "스토어 수정 응답DTO")
@Getter
@Builder
@AllArgsConstructor
public class StoreUpdateResponse {

    @Schema(description = "스토어 ID", example = "1")
    private Long storeId;

    public static StoreUpdateResponse fromEntity(Store store) {
        return StoreUpdateResponse.builder()
                .storeId(store.getId())
                .build();
    }
}
