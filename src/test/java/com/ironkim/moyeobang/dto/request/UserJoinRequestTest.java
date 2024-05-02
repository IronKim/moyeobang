package com.ironkim.moyeobang.dto.request;

import com.ironkim.moyeobang.domain.constant.PreferenceType;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

class UserJoinRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @DisplayName("아이디, 비밀번호, 이름, 전화번호, 이메일 중 하나라도 null이면 실패한다.")
    @MethodSource
    @ParameterizedTest
    void userJoinRequest_nullTest(UserJoinRequest userJoinRequestNull) {

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequestNull);

        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("아이디는 6~20자 여야한다")
    @Test
    void accountId_lengthTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "test",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("아이디는 영문과 숫자만 입력해야한다.")
    @Test
    void accountId_patternTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId!",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );
    }

    @DisplayName("비밀번호는 영문, 숫자 조합 8~20자여야한다")
    @Test
    void password_patternTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("이름은 2~20자여야한다")
    @Test
    void name_lengthTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "t",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("전화번호는 01(?:0|1|[6-9])(?:d{3}|d{4})d{4} 형식이어야한다")
    @Test
    void phoneNumber_patternTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "010123456",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("이메일 형식이어야한다")
    @Test
    void email_patternTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "testnaver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("성별은 M, F 또는 null이어야한다")
    @Test
    void gender_patternTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "A",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);

        userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                null,
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(0);
    }

    @DisplayName("닉네임은 20자 이하여야한다")
    @Test
    void profileName_lengthTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilenametestProfilenametestProfilenametestProfilename",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("소개글은 100자 이하여야한다")
    @Test
    void profileText_lengthTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "a".repeat(101),
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("생일은 14세 이상이거나 null이어야한다")
    @Test
    void birthday_patternTest() {
        UserJoinRequest userJoinRequest = new UserJoinRequest( // 14세 미만
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "testProfileText",
                "M",
                LocalDate.now().minusYears(14),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        UserJoinRequest userJoinRequest2 = new UserJoinRequest( // 14세 이상
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "testProfileText",
                "M",
                LocalDate.now().minusYears(14).minusDays(1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        UserJoinRequest userJoinRequest3 = new UserJoinRequest( // null
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfilename",
                "testProfileText",
                "M",
                null,
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );

        Set<ConstraintViolation<UserJoinRequest>> violations = validator.validate(userJoinRequest);
        Set<ConstraintViolation<UserJoinRequest>> violations2 = validator.validate(userJoinRequest2);
        Set<ConstraintViolation<UserJoinRequest>> violations3 = validator.validate(userJoinRequest3);

        violations.forEach(i -> System.out.println(i.getMessage()));
        violations2.forEach(i -> System.out.println(i.getMessage()));
        violations3.forEach(i -> System.out.println(i.getMessage()));

        assertThat(violations.size()).isEqualTo(1);
        assertThat(violations2.size()).isEqualTo(0);
        assertThat(violations3.size()).isEqualTo(0);
    }


    static Stream<UserJoinRequest> userJoinRequest_nullTest() {
        return Stream.of(
                new UserJoinRequest(
                        null,
                        "testPassw1!",
                        "testName",
                        "01012345678",
                        "test@naver.com",
                        "testProfileImage",
                        "testProfilename",
                        "testProfileText",
                        "M",
                        LocalDate.of(1990, 1, 1),
                        Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
                ),
                new UserJoinRequest(
                        "testId",
                        null,
                        "testName",
                        "01012345678",
                        "test@naver.com",
                        "testProfileImage",
                        "testProfilename",
                        "testProfileText",
                        "M",
                        LocalDate.of(1990, 1, 1),
                        Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
                ),
                new UserJoinRequest(
                        "testId",
                        "testPassw1!",
                        null,
                        "01012345678",
                        "test@naver.com",
                        "testProfileImage",
                        "testProfilename",
                        "testProfileText",
                        "M",
                        LocalDate.of(1990, 1, 1),
                        Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
                ),
                new UserJoinRequest(
                        "testId",
                        "testPassw1!",
                        "testName",
                        null,
                        "test@naver.com",
                        "testProfileImage",
                        "testProfilename",
                        "testProfileText",
                        "M",
                        LocalDate.of(1990, 1, 1),
                        Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
                ),
                new UserJoinRequest(
                        "testId",
                        "testPassw1!",
                        "testName",
                        "01012345678",
                        null,
                        "testProfileImage",
                        "testProfilename",
                        "testProfileText",
                        "M",
                        LocalDate.of(1990, 1, 1),
                        Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
                )
        );
    }
}