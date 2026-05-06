package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.AccountRole;
import com.ironkim.moyeobang.domain.PreferenceGenre;
import com.ironkim.moyeobang.domain.Role;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ironkim.moyeobang.dto.request.AccountJoinRequest;
import com.ironkim.moyeobang.dto.request.AccountLoginRequest;
import com.ironkim.moyeobang.dto.response.AccountJoinResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.AccountRoleRepository;
import com.ironkim.moyeobang.repository.AccountRepository;
import com.ironkim.moyeobang.repository.GenreRepository;
import com.ironkim.moyeobang.repository.PreferenceGenreRepository;
import com.ironkim.moyeobang.repository.RoleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private static final String DEFAULT_USER_ROLE_NAME = "USER";

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final AccountRoleRepository accountRoleRepository;
    private final GenreRepository genreRepository;
    private final PreferenceGenreRepository preferenceGenreRepository;

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
            throw new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID,
                    String.format("%s 는 이미 존재하는 계정 ID입니다.", accountJoinRequest.getAccountId()));
        }

        Account account = accountRepository.save(Account.builder()
                .accountId(accountJoinRequest.getAccountId())
                .password(encoder.encode(accountJoinRequest.getPassword()))
                .name(accountJoinRequest.getName())
                .phoneNumber(accountJoinRequest.getPhoneNumber())
                .email(accountJoinRequest.getEmail())
                .profileName(StringUtils.isBlank(accountJoinRequest.getProfileName()) ? accountJoinRequest.getName()
                        : accountJoinRequest.getProfileName()) // 프로필 이름이 없으면 이름으로 대체
                .profileImage(accountJoinRequest.getProfileImage())
                .profileText(accountJoinRequest.getProfileText())
                .gender(accountJoinRequest.getGender())
                .birthday(accountJoinRequest.getBirthday())
                .build());

        Role userRole = roleRepository.findByName(DEFAULT_USER_ROLE_NAME)
                .orElseThrow(() -> new MoyeobangApplicationException(ErrorCode.INTERNAL_SERVER_ERROR,
                        "USER 역할이 존재하지 않습니다. 관리자에게 문의하세요."));

        accountRoleRepository.save(AccountRole.of(account, userRole));

        savePreferenceGenres(account, accountJoinRequest.getPreferenceGenres());

        return AccountJoinResponse.fromEntity(account);
    }

    private void savePreferenceGenres(Account account,
            Set<com.ironkim.moyeobang.domain.constant.Genre> requestPreferenceGenres) {
        if (requestPreferenceGenres == null || requestPreferenceGenres.isEmpty()) {
            return;
        }

        List<com.ironkim.moyeobang.domain.Genre> genres = genreRepository.findAllByNameIn(requestPreferenceGenres);
        if (genres.size() != requestPreferenceGenres.size()) {
            throw new MoyeobangApplicationException(ErrorCode.BAD_REQUEST,
                    "하나 이상의 선호 장르가 유효하지 않습니다.");
        }

        List<PreferenceGenre> preferenceGenres = genres.stream()
                .map(genre -> PreferenceGenre.of(account, genre))
                .toList();

        preferenceGenreRepository.saveAll(preferenceGenres);
    }

    public String AccountLogin(AccountLoginRequest accountLoginRequest) {
        // UserAccount userAccount =
        // userAccountRepository.findByAccountId(userLoginRequest.getAccountId())
        // .orElseThrow(() -> new
        // MoyeobangApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s
        // is not founded", userLoginRequest.getAccountId())));
        //
        // if (!encoder.matches(userLoginRequest.getPassword(),
        // userAccount.getPassword())) {
        // throw new MoyeobangApplicationException(ErrorCode.INVALID_PASSWORD, "Password
        // is invalid");
        // }
        //
        // return JwtTokenUtils.generateToken(userAccount.getAccountId(), RoleType.USER,
        // userAccount.getProfileImage(), userAccount.getProfileName(), secretKey,
        // expiredTimeMs);
        return null;
    }
}
