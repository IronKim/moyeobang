package com.ironkim.moyeobang.service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.AccountRole;
import com.ironkim.moyeobang.domain.Role;
import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.constant.AuthStatus;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.response.StoreRegisterResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.AccountRoleRepository;
import com.ironkim.moyeobang.repository.AccountRepository;
import com.ironkim.moyeobang.repository.RoleRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.util.JwtTokenUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StoreService {

    private static final String OWNER_ROLE_NAME = "OWNER";

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final AccountRoleRepository accountRoleRepository;
    private final StoreRepository storeRepository;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expired-time-ms}")
    private long expiredTimeMs;

    public StoreRegisterResponse registerStore(String accountId, StoreRegisterRequest request) {
        Account account = accountRepository.findByAccountId(accountId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.ACCOUNT_NOT_FOUND,
                        String.format("%s 계정을 찾을 수 없습니다.", accountId)));

        boolean duplicatedStore = storeRepository.existsByBusinessNumber(request.getBusinessNumber());

        if (duplicatedStore) {
            throw new MoyeobangApplicationException(
                    ErrorCode.BAD_REQUEST,
                    "이미 등록된 사업자등록번호입니다.");
        }

        boolean ownerRoleGranted = grantOwnerRoleIfNeeded(account);

        Store store = storeRepository.save(Store.builder()
                .account(account)
                .businessName(request.getBusinessName())
                .businessNumber(request.getBusinessNumber())
                .branchName(request.getBranchName())
                .address(request.getAddress())
                .addressDetail(request.getAddressDetail())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .authStatus(AuthStatus.PENDING)
                .build());

        String newToken = ownerRoleGranted
                ? JwtTokenUtils.generateToken(
                        account.getAccountId(),
                        collectRoles(account),
                        account.getProfileImage(),
                        account.getProfileName(),
                        secretKey,
                        expiredTimeMs)
                : null;

        return StoreRegisterResponse.fromEntity(store, newToken);
    }

    private boolean grantOwnerRoleIfNeeded(Account account) {
        boolean hasOwnerRole = account.getAccountRoleList().stream()
                .anyMatch(accountRole -> OWNER_ROLE_NAME.equals(accountRole.getRole().getName()));

        if (hasOwnerRole) {
            return false;
        }

        Role ownerRole = roleRepository.findByName(OWNER_ROLE_NAME)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.INTERNAL_SERVER_ERROR,
                        "OWNER 역할이 존재하지 않습니다. 관리자에게 문의하세요."));

        accountRoleRepository.save(AccountRole.of(account, ownerRole));
        return true;
    }

    private List<String> collectRoles(Account account) {
        Set<String> roleSet = account.getAccountRoleList().stream()
                .map(accountRole -> accountRole.getRole().getName())
                .collect(Collectors.toCollection(LinkedHashSet::new));

        roleSet.add(OWNER_ROLE_NAME);

        return new ArrayList<>(roleSet);
    }
}
