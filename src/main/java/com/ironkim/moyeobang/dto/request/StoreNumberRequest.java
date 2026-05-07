package com.ironkim.moyeobang.dto.request;

import com.ironkim.moyeobang.validator.DigitsOnly;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "StoreNumberRequest", description = "스토어 전화번호 요청 DTO")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreNumberRequest {

    @Schema(description = "기존 전화번호 ID. 신규 등록이면 null", example = "1")
    private Long id;

    @Schema(description = "매장 전화번호", example = "01012345678")
    @DigitsOnly(nullable = false, message = "매장 전화번호는 숫자만 입력 가능합니다.")
    @Size(max = 20, message = "매장 전화번호는 20자 이하여야 합니다.")
    @NotBlank
    private String storeNumber;
}