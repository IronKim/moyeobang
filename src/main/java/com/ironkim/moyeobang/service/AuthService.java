package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.domain.constant.RoleType;
import com.ironkim.moyeobang.dto.AccountDto;
import com.ironkim.moyeobang.dto.SellerAccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.SellerJoinRequest;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.SellerAccountRepository;
import com.ironkim.moyeobang.repository.UserAccountRepository;
import io.micrometer.common.util.StringUtils;
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

    public boolean accountIdCheck(String accountId) {
        return userAccountRepository.findByAccountId(accountId).isPresent() || sellerAccountRepository.findByAccountId(accountId).isPresent();
    }

    public UserAccountDto userJoin(UserJoinRequest userJoinRequest) {
        if (accountIdCheck(userJoinRequest.getAccountId())) {
            throw new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID, String.format("%s is duplicated", userJoinRequest.getAccountId()));
        }

        sellerAccountRepository.findByAccountId(userJoinRequest.getAccountId()).ifPresent(it -> {
            throw new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID, String.format("%s is duplicated", userJoinRequest.getAccountId()));
        });

        UserAccount userAccount = userAccountRepository.save(UserAccount.builder()
                                                        .accountId(userJoinRequest.getAccountId())
                                                        .password(encoder.encode(userJoinRequest.getPassword()))
                                                        .roleType(RoleType.USER)
                                                        .name(userJoinRequest.getName())
                                                        .birthday(userJoinRequest.getBirthday())
                                                        .phoneNumber(userJoinRequest.getPhoneNumber())
                                                        .email(userJoinRequest.getEmail())
                                                        .gender(userJoinRequest.getGender())
                                                        .nickname(StringUtils.isBlank(userJoinRequest.getNickname()) ? userJoinRequest.getAccountId() : userJoinRequest.getNickname()) // 닉네임이 없으면 아이디로 설정
                                                        .profileImage(userJoinRequest.getProfileImage())
                                                        .profileName(StringUtils.isBlank(userJoinRequest.getProfileName()) ? userJoinRequest.getName() : userJoinRequest.getProfileName()) // 프로필 이름이 없으면 이름으로 대체
                                                        .profileText(userJoinRequest.getProfileText())
                                                        .gender(userJoinRequest.getGender())
                                                        .birthday(userJoinRequest.getBirthday())
                                                        .preferenceTypes(userJoinRequest.getPreferenceTypes())
                                                        .build());

        return UserAccountDto.fromUserAccount(userAccount);
    }

    public SellerAccountDto sellerJoin(SellerJoinRequest sellerJoinRequest) {
        if (accountIdCheck(sellerJoinRequest.getAccountId())) {
            throw new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID, String.format("%s is duplicated", sellerJoinRequest.getAccountId()));
        }

        sellerAccountRepository.findByAccountId(sellerJoinRequest.getAccountId()).ifPresent(it -> {
            throw new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID, String.format("%s is duplicated", sellerJoinRequest.getAccountId()));
        });

        SellerAccount sellerAccount = sellerAccountRepository.save(SellerAccount.builder()
                                                        .accountId(sellerJoinRequest.getAccountId())
                                                        .password(encoder.encode(sellerJoinRequest.getPassword()))
                                                        .roleType(RoleType.SELLER)
                                                        .name(sellerJoinRequest.getName())
                                                        .birthday(sellerJoinRequest.getBirthday())
                                                        .phoneNumber(sellerJoinRequest.getPhoneNumber())
                                                        .email(sellerJoinRequest.getEmail())
                                                        .businessName(sellerJoinRequest.getBusinessName())
                                                        .businessNumber(sellerJoinRequest.getBusinessNumber())
                                                        .authStatus("N")
                                                        .build());

        return SellerAccountDto.fromSellerAccount(sellerAccount);
    }
}
