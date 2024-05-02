package com.ironkim.moyeobang.dto.request;

import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.validator.FourteenYearsOrOlder;
import com.ironkim.moyeobang.validator.GenderCheck;
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
    private String profileImage;
    @Length(max = 20)
    private String profileName;
    @Length(max = 100)
    private String profileText;
    @GenderCheck
    private String gender;
    @FourteenYearsOrOlder(nullable = true)
    private LocalDate birthday;
    private Set<PreferenceType> preferenceTypes;
}
