package com.ironkim.moyeobang.fixture;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.constant.RoleType;

public class SellerAccountFixture {

    public static SellerAccount get() {
        return SellerAccount.builder()
                .accountId("test")
                .password("encodedPassword")
                .name("test")
                .phoneNumber("01012345678")
                .email("test@naver.com")
                .roleType(RoleType.ADMIN)
                .businessName("businessName")
                .businessNumber("1231212345")
                .authStatus("N")
                .build();
    }
}
