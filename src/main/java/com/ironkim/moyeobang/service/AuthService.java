package com.ironkim.moyeobang.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ironkim.moyeobang.dto.request.AccountJoinRequest;
import com.ironkim.moyeobang.dto.request.AccountLoginRequest;
import com.ironkim.moyeobang.dto.response.AccountJoinResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.AccountRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;

    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.expired-time-ms}")
    private long expiredTimeMs;

    public boolean accountIdCheck(String accountId) {
        return accountRepository.findByAccountId(accountId).isPresent();
    }

    public AccountJoinResponse AccountJoin(AccountJoinRequest accountJoinRequest) {
        if (accountIdCheck(accountJoinRequest.getAccountId())) {
            throw new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID, String.format("%s is duplicated", accountJoinRequest.getAccountId()));
        }

//        Account account = AccountRepository.save(Account.builder()
//                                            .accountId(userJoinRequest.getAccountId())
//                                            .password(encoder.encode(userJoinRequest.getPassword()))
//                                            .roleType(RoleType.USER)
//                                            .name(userJoinRequest.getName())
//                                            .phoneNumber(userJoinRequest.getPhoneNumber())
//                                            .email(userJoinRequest.getEmail())
//                                            .profileImage(userJoinRequest.getProfileImage())
//                                            .profileName(StringUtils.isBlank(userJoinRequest.getProfileName()) ? userJoinRequest.getName() : userJoinRequest.getProfileName()) // 프로필 이름이 없으면 이름으로 대체
//                                            .profileText(userJoinRequest.getProfileText())
//                                            .gender(userJoinRequest.getGender())
//                                            .birthday(userJoinRequest.getBirthday())
//                                            .preferenceTypes(userJoinRequest.getPreferenceTypes())
//                                            .build());
//
//        return UserAccountDto.fromUserAccount(userAccount);
    	
    	return null;
    }

    public String AccountLogin(AccountLoginRequest accountLoginRequest) {
//        UserAccount userAccount = userAccountRepository.findByAccountId(userLoginRequest.getAccountId())
//                .orElseThrow(() -> new MoyeobangApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s is not founded", userLoginRequest.getAccountId())));
//
//        if (!encoder.matches(userLoginRequest.getPassword(), userAccount.getPassword())) {
//            throw new MoyeobangApplicationException(ErrorCode.INVALID_PASSWORD, "Password is invalid");
//        }
//
//        return JwtTokenUtils.generateToken(userAccount.getAccountId(), RoleType.USER, userAccount.getProfileImage(), userAccount.getProfileName(), secretKey, expiredTimeMs);
        return null;
    }
}
