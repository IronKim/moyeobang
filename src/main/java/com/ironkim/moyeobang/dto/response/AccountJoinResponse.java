package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Account;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountJoinResponse {

    private String accountId;
    private String name;

    public static AccountJoinResponse fromEntity(Account account) {
        return new AccountJoinResponse(
        		account.getAccountId(),
        		account.getName()
        );
    }
}
