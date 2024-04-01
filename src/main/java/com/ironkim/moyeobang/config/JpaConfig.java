package com.ironkim.moyeobang.config;

import com.ironkim.moyeobang.domain.constant.RoleType;
import com.ironkim.moyeobang.dto.AccountDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@EnableJpaAuditing
@Configuration
public class JpaConfig {

    @Bean
    public AuditorAware<String> auditorAware() {

        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return Optional.of(RoleType.ADMIN.name());
            } else {
                return Optional.of(((AccountDto) authentication.getPrincipal()).getUsername());
            }
        };

    }
}
