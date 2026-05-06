package com.ironkim.moyeobang.config;

import com.ironkim.moyeobang.service.AuthService;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

@Import(SecurityConfig.class)
@TestConfiguration
public class TestSecurityConfig {

    @MockBean
    private AuthService authService;
}
