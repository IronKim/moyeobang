package com.ironkim.moyeobang.domain.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleType {
    ADMIN("ROLE_ADMIN", "관리자"),
    SELLER("ROLE_SELLER", "판매자"),
    USER("ROLE_USER", "사용자")
    ;

    private final String name;
    private final String description;
}
