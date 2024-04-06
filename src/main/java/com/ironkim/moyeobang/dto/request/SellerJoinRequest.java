package com.ironkim.moyeobang.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SellerJoinRequest {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]){6,20}$") // 영문, 숫자만 6~20자 조합
    private String accountId;
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$") // 영문, 숫자 조합 8~20자
    private String password;
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z가-힣]{2,20}$") // 2~20자 한글 영어만
    private String name;
    @NotBlank
    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$") // 01012345678
    private String phoneNumber;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String businessName;
    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$")
    private String businessNumber;
}
