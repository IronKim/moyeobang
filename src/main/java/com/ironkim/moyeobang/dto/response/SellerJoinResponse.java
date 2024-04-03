package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.dto.SellerAccountDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SellerJoinResponse {

    private String accountId;
    private String name;

    public static SellerJoinResponse fromSellerAccountDto(SellerAccountDto sellerAccountDto) {
        return new SellerJoinResponse(
                sellerAccountDto.getAccountId(),
                sellerAccountDto.getName()
        );
    }
}
