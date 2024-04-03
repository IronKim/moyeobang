package com.ironkim.moyeobang.fixture;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.constant.RoleType;

import java.time.LocalDate;

public class SellerAccountFixture {

    public static SellerAccount get() {
        return SellerAccount.builder()
                .accountId("test")
                .password("encodedPassword")
                .name("test")
                .birthday(LocalDate.of(2000, 1, 1))
                .phoneNumber("01012345678")
                .email("test@naver.com")
                .roleType(RoleType.ADMIN)
                .businessName("businessName")
                .businessNumber("1231212345")
                .authStatus("N")
                .build();
    }
}
