package com.ironkim.moyeobang.dto.request;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Set;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

class SellerJoinRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @DisplayName("아이디, 비밀번호, 이름, 전화번호, 이메일, 상호명, 사업자번호 중 하나라도 null이면 실패한다.")
    @MethodSource
    @ParameterizedTest
    void sellerJoinRequest_nullTest(SellerJoinRequest sellerJoinRequestNull) {

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequestNull);

        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("아이디는 6~20자 여야한다")
    @Test
    void accountId_lengthTest() {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "test",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testbusinessName",
                "1231212345"
        );

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("비밀번호는 영문, 숫자 조합 8~20자여야한다")
    @Test
    void password_patternTest() {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw",
                "testName",
                "01012345678",
                "test@naver.com",
                "testbusinessName",
                "1231212345"
        );

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("이름은 2~20자여야한다")
    @Test
    void name_lengthTest() {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "t",
                "01012345678",
                "test@naver.com",
                "testbusinessName",
                "1231212345"
        );

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("전화번호는 01(?:0|1|[6-9])(?:d{3}|d{4})d{4} 형식이어야한다")
    @Test
    void phoneNumber_patternTest() {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "010123456",
                "test@naver.com",
                "testbusinessName",
                "1231212345"
        );

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("이메일 형식이어야한다")
    @Test
    void email_patternTest() {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "testnaver.com",
                "testbusinessName",
                "1231212345"
        );

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    @DisplayName("사업자 번호는 10자리 숫자여야한다")
    @Test
    void gender_patternTest() {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testbusinessName",
                "123121234"
        );

        Set<ConstraintViolation<SellerJoinRequest>> violations = validator.validate(sellerJoinRequest);
        violations.forEach(i -> System.out.println(i.getMessage()));
        assertThat(violations.size()).isEqualTo(1);
    }

    static Stream<SellerJoinRequest> sellerJoinRequest_nullTest() {
        return Stream.of(
                new SellerJoinRequest(
                        null,
                        "testPassw1!",
                        "testName",
                        "01012345678",
                        "test@naver.com",
                        "testbusinessName",
                        "1231212345"
                ),
                new SellerJoinRequest(
                        "testId",
                        null,
                        "testName",
                        "01012345678",
                        "test@naver.com",
                        "testbusinessName",
                        "1231212345"
                ),
                new SellerJoinRequest(
                        "testId",
                        "testPassw1!",
                        null,
                        "01012345678",
                        "test@naver.com",
                        "testbusinessName",
                        "1231212345"
                ),
                new SellerJoinRequest(
                        "testId",
                        "testPassw1!",
                        "testName",
                        null,
                        "test@naver.com",
                        "testbusinessName",
                        "1231212345"
                ),
                new SellerJoinRequest(
                        "testId",
                        "testPassw1!",
                        "testName",
                        "01012345678",
                        null,
                        "testbusinessName",
                        "1231212345"
                ),
                new SellerJoinRequest(
                        "testId",
                        "testPassw1!",
                        "testName",
                        "01012345678",
                        "test@naver.com",
                        null,
                        "1231212345"
                ),
                new SellerJoinRequest(
                        "testId",
                        "testPassw1!",
                        "testName",
                        "01012345678",
                        "test@naver.com",
                        "testbusinessName",
                        null
                )
        );
    }

}