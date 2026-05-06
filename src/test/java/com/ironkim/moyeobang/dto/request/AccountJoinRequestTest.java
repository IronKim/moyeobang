package com.ironkim.moyeobang.dto.request;

import com.ironkim.moyeobang.domain.constant.Genre;
import com.ironkim.moyeobang.domain.constant.Gender;
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

class AccountJoinRequestTest {

        private Validator validator;

        @BeforeEach
        void setUp() {
                validator = Validation.buildDefaultValidatorFactory().getValidator();
        }

        @DisplayName("아이디, 비밀번호, 이름, 전화번호, 이메일 중 하나라도 null이면 실패한다.")
        @MethodSource
        @ParameterizedTest
        void accountJoinRequest_nullTest(AccountJoinRequest accountJoinRequestNull) {

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequestNull);

                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("아이디는 6~20자 여야한다")
        @Test
        void accountId_lengthTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "test",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("아이디는 영문과 숫자만 입력해야한다.")
        @Test
        void accountId_patternTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId!",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("비밀번호는 영문, 숫자 조합 8~20자여야한다")
        @Test
        void password_patternTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("이름은 2~20자여야한다")
        @Test
        void name_lengthTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "t",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("전화번호는 01(?:0|1|[6-9])(?:d{3}|d{4})d{4} 형식이어야한다")
        @Test
        void phoneNumber_patternTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "010123456",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("이메일 형식이어야한다")
        @Test
        void email_patternTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "testnaver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("성별은 M, F 또는 null이어야한다")
        @Test
        void gender_patternTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.F);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(0);

                accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                null);

                violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(0);
        }

        @DisplayName("닉네임은 20자 이하여야한다")
        @Test
        void profileName_lengthTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilenametestProfilenametestProfilenametestProfilename",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("소개글은 100자 이하여야한다")
        @Test
        void profileText_lengthTest() {
                AccountJoinRequest accountJoinRequest = createRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "a".repeat(101),
                                LocalDate.of(1990, 1, 1),
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                violations.forEach(i -> System.out.println(i.getMessage()));
                assertThat(violations.size()).isEqualTo(1);
        }

        @DisplayName("생일은 14세 이상이거나 null이어야한다")
        @Test
        void birthday_patternTest() {
                AccountJoinRequest accountJoinRequest = createRequest( // 14세 미만
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "testProfileText",
                                LocalDate.now().minusYears(14),
                                Gender.M);

                AccountJoinRequest accountJoinRequest2 = createRequest( // 14세 이상
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "testProfileText",
                                LocalDate.now().minusYears(14).minusDays(1),
                                Gender.M);

                AccountJoinRequest accountJoinRequest3 = createRequest( // null
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfilename",
                                "testProfileText",
                                null,
                                Gender.M);

                Set<ConstraintViolation<AccountJoinRequest>> violations = validator.validate(accountJoinRequest);
                Set<ConstraintViolation<AccountJoinRequest>> violations2 = validator.validate(accountJoinRequest2);
                Set<ConstraintViolation<AccountJoinRequest>> violations3 = validator.validate(accountJoinRequest3);

                violations.forEach(i -> System.out.println(i.getMessage()));
                violations2.forEach(i -> System.out.println(i.getMessage()));
                violations3.forEach(i -> System.out.println(i.getMessage()));

                assertThat(violations.size()).isEqualTo(1);
                assertThat(violations2.size()).isEqualTo(0);
                assertThat(violations3.size()).isEqualTo(0);
        }

        static Stream<AccountJoinRequest> accountJoinRequest_nullTest() {
                return Stream.of(
                                createRequest(
                                                null,
                                                "testPassw1!",
                                                "testName",
                                                "01012345678",
                                                "test@naver.com",
                                                "testProfileImage",
                                                "testProfilename",
                                                "testProfileText",
                                                LocalDate.of(1990, 1, 1),
                                                Gender.M),
                                createRequest(
                                                "testId",
                                                null,
                                                "testName",
                                                "01012345678",
                                                "test@naver.com",
                                                "testProfileImage",
                                                "testProfilename",
                                                "testProfileText",
                                                LocalDate.of(1990, 1, 1),
                                                Gender.M),
                                createRequest(
                                                "testId",
                                                "testPassw1!",
                                                null,
                                                "01012345678",
                                                "test@naver.com",
                                                "testProfileImage",
                                                "testProfilename",
                                                "testProfileText",
                                                LocalDate.of(1990, 1, 1),
                                                Gender.M),
                                createRequest(
                                                "testId",
                                                "testPassw1!",
                                                "testName",
                                                null,
                                                "test@naver.com",
                                                "testProfileImage",
                                                "testProfilename",
                                                "testProfileText",
                                                LocalDate.of(1990, 1, 1),
                                                Gender.M),
                                createRequest(
                                                "testId",
                                                "testPassw1!",
                                                "testName",
                                                "01012345678",
                                                null,
                                                "testProfileImage",
                                                "testProfilename",
                                                "testProfileText",
                                                LocalDate.of(1990, 1, 1),
                                                Gender.M));
        }

        private static AccountJoinRequest createRequest(String accountId,
                        String password,
                        String name,
                        String phoneNumber,
                        String email,
                        String profileImage,
                        String profileName,
                        String profileText,
                        LocalDate birthday,
                        Gender gender) {
                return new AccountJoinRequest(
                                accountId,
                                password,
                                name,
                                phoneNumber,
                                email,
                                profileName,
                                profileImage,
                                profileText,
                                birthday,
                                gender,
                                Set.of(Genre.ADVENTURE, Genre.CRIME));
        }
}