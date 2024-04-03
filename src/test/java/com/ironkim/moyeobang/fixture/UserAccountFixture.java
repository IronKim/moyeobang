package com.ironkim.moyeobang.fixture;

import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.domain.constant.RoleType;

import java.time.LocalDate;
import java.util.Set;

public class UserAccountFixture {

    public static UserAccount get() {
        return UserAccount.builder()
                .accountId("test")
                .password("encodedPassword")
                .name("test")
                .birthday(LocalDate.of(2000, 1, 1))
                .phoneNumber("01012345678")
                .email("test@naver.com")
                .roleType(RoleType.USER)
                .gender("M")
                .nickname("testname")
                .profileImage("test.jpg")
                .profileText("test text")
                .preferenceTypes(Set.of(PreferenceType.ADVENTURE))
                .build();
    }
}
