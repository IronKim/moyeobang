package com.ironkim.moyeobang.config;

import com.ironkim.moyeobang.domain.constant.RoleType;
import com.ironkim.moyeobang.dto.AccountDto;
import com.ironkim.moyeobang.service.AuthService;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.event.annotation.BeforeTestMethod;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@Import(SecurityConfig.class)
@TestConfiguration
public class TestSecurityConfig {

    @MockBean
    private AuthService authService;

    @BeforeTestMethod
    public void securitySetUp() {
        given(authService.loadAccountByAccountId(anyString()))
                .willReturn(createAccountDto());
    }

    private AccountDto createAccountDto() {
        return new AccountDto(
                1L,
                "testId",
                "testPassw1",
                "testName",
                "01012345678",
                "test@naver.com",
                RoleType.USER,
                LocalDateTime.now(),
                "ADMIN",
                LocalDateTime.now(),
                "ADMIN",
                null
        );
    }
}
