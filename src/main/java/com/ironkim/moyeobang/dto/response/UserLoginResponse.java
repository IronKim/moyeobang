package com.ironkim.moyeobang.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Tag(name = "UserLoginResponse", description = "사용자 로그인 응답 DTO")
@Getter
@AllArgsConstructor
public class UserLoginResponse {

    @Schema(description = "JWT 토큰", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;
}
