package com.ironkim.moyeobang.dto.request;

import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.validator.FourteenYearsOrOlder;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserJoinRequest {
    @NotBlank
    @Length(min = 6, max = 20) // 6~20자
    private String accountId;
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$") // 영문, 숫자 조합 8~20자
    private String password;
    @NotBlank
    @Length(min = 2, max = 20) // 2~20자
    private String name;
    @FourteenYearsOrOlder //14세 이상만 가입 가능
    private LocalDate birthday;
    @NotBlank
    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$") // 01012345678
    private String phoneNumber;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Pattern(regexp = "^[MF]$") // M or F
    private String gender;
    private String nickname;
    private String profileImage;
    private String profileText;
    private Set<PreferenceType> preferenceTypes;
}
