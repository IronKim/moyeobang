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
import com.ironkim.moyeobang.domain.StoreContact;
import com.ironkim.moyeobang.domain.constant.AuthStatus;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.request.StoreNumberRequest;
import com.ironkim.moyeobang.dto.request.StoreUpdateRequest;
import com.ironkim.moyeobang.dto.response.StoreDetailResponse;
import com.ironkim.moyeobang.dto.response.StoreRegisterResponse;
import com.ironkim.moyeobang.dto.response.StoreSimpleResponse;
import com.ironkim.moyeobang.dto.response.StoreUpdateResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.AccountRoleRepository;
import com.ironkim.moyeobang.repository.AccountRepository;
import com.ironkim.moyeobang.repository.RoleRepository;
import com.ironkim.moyeobang.repository.StoreContactRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.util.JwtTokenUtils;
import com.ironkim.moyeobang.validator.StorePermissionValidator;

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
        private final StoreContactRepository storeContactRepository;
        private final StorePermissionValidator storePermissionValidator;

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
                                .description(request.getDescription())
                                .latitude(request.getLatitude())
                                .longitude(request.getLongitude())
                                .authStatus(AuthStatus.PENDING)
                                .build());

                for (StoreNumberRequest storeNumberRequest : request.getStoreNumberList()) {
                        storeContactRepository.save(StoreContact.builder()
                                        .store(store)
                                        .storeNumber(storeNumberRequest.getStoreNumber().trim())
                                        .build());
                }

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

        public List<StoreSimpleResponse> getMyStores(String accountId) {
                return storeRepository.findAllByAccount_AccountId(accountId).stream()
                                .map(StoreSimpleResponse::fromEntity)
                                .collect(Collectors.toList());
        }

        public StoreDetailResponse getStoreDetail(Long storeId) {
                Store store = storeRepository.findById(storeId)
                                .orElseThrow(() -> new MoyeobangApplicationException(
                                                ErrorCode.POST_NOT_FOUND,
                                                String.format("%d 스토어를 찾을 수 없습니다.", storeId)));
                return StoreDetailResponse.fromEntity(store);
        }

        public StoreUpdateResponse updateStore(Long storeId, String accountId, StoreUpdateRequest request) {
                Store store = storeRepository.findById(storeId)
                                .orElseThrow(() -> new MoyeobangApplicationException(
                                                ErrorCode.POST_NOT_FOUND,
                                                String.format("%d 스토어를 찾을 수 없습니다.", storeId)));

                storePermissionValidator.validateOwner(store, accountId);

                store = Store.builder()
                                .id(store.getId())
                                .account(store.getAccount())
                                .businessName(request.getBusinessName())
                                .businessNumber(store.getBusinessNumber())
                                .branchName(request.getBranchName())
                                .address(request.getAddress())
                                .addressDetail(request.getAddressDetail())
                                .description(request.getDescription())
                                .latitude(request.getLatitude())
                                .longitude(request.getLongitude())
                                .build();

                for (StoreNumberRequest storeNumberRequest : request.getStoreNumberList()) {
                        storeContactRepository.save(StoreContact.builder()
                                        .id(storeNumberRequest.getId())
                                        .store(store)
                                        .storeNumber(storeNumberRequest.getStoreNumber().trim())
                                        .build());
                }

                return StoreUpdateResponse.fromEntity(store);
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
