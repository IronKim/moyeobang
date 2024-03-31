package com.ironkim.moyeobang.domain.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PreferenceType {

    HORROR("공포"),
    ROMANCE("로맨스"),
    ACTION("액션"),
    COMEDY("코미디"),
    DRAMA("드라마"),
    FANTASY("판타지"),
    THRILLER("스릴러"),
    MYSTERY("미스터리"),
    CRIME("범죄"),
    ADVENTURE("모험"),
    SCIENCE_FICTION("SF"),
    ETC("기타")
    ;

    private final String name;
}
