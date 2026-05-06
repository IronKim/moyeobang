package com.ironkim.moyeobang.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "AccountLoginRequest", description = "계정 로그인 요청 DTO")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountLoginRequest {

    @Schema(description = "계정 ID", example = "user123")
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]){6,20}$") // 영문, 숫자만 6~20자 조합
    private String accountId;

    @Schema(description = "계정 비밀번호", example = "password123!")
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$") // 영문, 숫자 조합 8~20자
    private String password;
}
