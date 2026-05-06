package com.ironkim.moyeobang.domain.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleType {

    ADMIN("ROLE_ADMIN", "관리자"),
    USER("ROLE_USER", "사용자"),
    OWNER("ROLE_OWNER", "점주"),
    STAFF("ROLE_STAFF", "직원");

    private final String name;
    private final String description;
}
