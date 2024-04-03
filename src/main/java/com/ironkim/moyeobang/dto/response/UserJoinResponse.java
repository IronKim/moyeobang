package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.dto.UserAccountDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserJoinResponse {

    private String accountId;
    private String name;

    public static UserJoinResponse fromUserAccountDto(UserAccountDto userAccountDto) {
        return new UserJoinResponse(
                userAccountDto.getAccountId(),
                userAccountDto.getName()
        );
    }
}
