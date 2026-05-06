package com.ironkim.moyeobang.fixture;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.constant.Gender;

import java.time.LocalDate;
import java.util.ArrayList;

public class AccountFixture {

    public static Account get() {
        return Account.builder()
                .accountId("testId")
                .password("encodedPassword")
                .name("test")
                .phoneNumber("01012345678")
                .email("test@naver.com")
                .profileName("testname")
                .profileImage("testImage")
                .profileText("test text")
                .gender(Gender.M)
                .birthday(LocalDate.of(2000, 1, 1))
                .accountRoleList(new ArrayList<>())
                .preferenceGenreList(new ArrayList<>())
                .build();
    }
}
