package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.domain.constant.RoleType;
import com.ironkim.moyeobang.dto.AccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.dto.request.UserLoginRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.SellerAccountRepository;
import com.ironkim.moyeobang.repository.UserAccountRepository;
import com.ironkim.moyeobang.util.JwtTokenUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final SellerAccountRepository sellerAccountRepository;

    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.expired-time-ms}")
    private long expiredTimeMs;

    public AccountDto loadAccountByAccountId(String accountId) {
        return userAccountRepository.findByAccountId(accountId).map(AccountDto::fromAccount)
                .orElseGet(() -> sellerAccountRepository.findByAccountId(accountId).map(AccountDto::fromAccount)
                        .orElseThrow(() -> new MoyeobangApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s is not founded", accountId))));
    }
    
}
