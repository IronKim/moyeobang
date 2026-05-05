package com.ironkim.moyeobang.dto.request;

import java.time.LocalDate;

import com.ironkim.moyeobang.domain.constant.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.hibernate.validator.constraints.Length;

import com.ironkim.moyeobang.validator.FourteenYearsOrOlder;
import com.ironkim.moyeobang.validator.GenderCheck;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Tag(name = "AccountJoinRequest", description = "회원가입 요청 DTO")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountJoinRequest {

    @Schema(description = "계정 ID", example = "user123")
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]){6,20}$") // 영문, 숫자만 6~20자 조합
    private String accountId;

    @Schema(description = "비밀번호", example = "password123")
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$") // 영문, 숫자 조합 8~20자
    private String password;

    @Schema(description = "이름", example = "홍길동")
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z가-힣]{2,20}$") // 2~20자 한글 영어만
    private String name;

    @Schema(description = "핸드폰전화번호", example = "01012345678")
    @NotBlank
    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$") // 01012345678
    private String phoneNumber;

    @Schema(description = "이메일", example = "test@naver.com")
    @NotBlank
    @Email
    private String email;

    @Schema(description = "프로필 이름", example = "홍길동")
    @Length(max = 20)
    private String profileName;

    @Schema(description = "프로필 이미지 URL", example = "https://example.com/profile.jpg")
    private String profileImage;

    @Schema(description = "프로필 소개글", example = "안녕하세요! 반갑습니다.")
    @Length(max = 100)
    private String profileText;

    @Schema(description = "생년월일", example = "2000-01-01")
    @FourteenYearsOrOlder(nullable = true)
    private LocalDate birthday;

    @Schema(description = "성별", example = "M 또는 F")
    @GenderCheck
    private Gender gender;
}
