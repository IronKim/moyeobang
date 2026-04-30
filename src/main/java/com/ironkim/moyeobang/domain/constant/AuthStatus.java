package com.ironkim.moyeobang.domain.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AuthStatus {
	
    PENDING("PENDING", "인증 대기"),
    APPROVED("APPROVED", "인증 승인"),
    REJECTED("REJECTED", "인증 거절")
    ;

    private final String name;
    private final String description;
}
