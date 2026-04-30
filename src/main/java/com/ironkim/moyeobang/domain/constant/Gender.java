package com.ironkim.moyeobang.domain.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Gender {
	
    M("M", "남성"),
    F("F", "여성")
    ;
	
    private final String name;
    private final String description;
}
