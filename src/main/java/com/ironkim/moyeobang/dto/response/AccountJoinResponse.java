package com.ironkim.moyeobang.dto.response;

import com.ironkim.moyeobang.domain.Account;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Tag(name = "AccountJoinResponse", description = "회원 가입 응답 DTO")
@Getter
@AllArgsConstructor
public class AccountJoinResponse {

    @Schema(description = "계정 ID", example = "test123")
    private String accountId;

    @Schema(description = "이름", example = "홍길동")
    private String name;

    public static AccountJoinResponse fromEntity(Account account) {
        return new AccountJoinResponse(
                account.getAccountId(),
                account.getName());
    }
}
