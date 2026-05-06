package com.ironkim.moyeobang.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.AccountRole;
import com.ironkim.moyeobang.domain.Role;
import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.constant.AuthStatus;
import com.ironkim.moyeobang.domain.constant.Gender;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.response.StoreRegisterResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.AccountRoleRepository;
import com.ironkim.moyeobang.repository.AccountRepository;
import com.ironkim.moyeobang.repository.RoleRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.util.JwtTokenUtils;

@ExtendWith(MockitoExtension.class)
class StoreServiceTest {

    private static final String TEST_JWT_SECRET_KEY = "test-jwt-secret-key-for-unit-tests-only-2026";

    @InjectMocks
    private StoreService sut;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private AccountRoleRepository accountRoleRepository;

    @Mock
    private StoreRepository storeRepository;

    @BeforeEach
    void setUp() {
        setField(sut, "secretKey", TEST_JWT_SECRET_KEY);
        setField(sut, "expiredTimeMs", 1000L * 60 * 60 * 24);
    }

    @Test
    void 스토어등록이_정상동작한다() {
        String accountId = "owner_escape";
        Account account = createAccount(accountId);
        StoreRegisterRequest request = createRequest("1234567890");
        Role ownerRole = createRole("OWNER");
        Store savedStore = Store.builder()
                .id(1L)
                .account(account)
                .businessName(request.getBusinessName())
                .businessNumber(request.getBusinessNumber())
                .branchName(request.getBranchName())
                .address(request.getAddress())
                .addressDetail(request.getAddressDetail())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .authStatus(AuthStatus.PENDING)
                .build();

        when(accountRepository.findByAccountId(accountId)).thenReturn(Optional.of(account));
        when(roleRepository.findByName("OWNER")).thenReturn(Optional.of(ownerRole));
        when(storeRepository.existsByBusinessNumber(request.getBusinessNumber())).thenReturn(false);
        when(storeRepository.save(any(Store.class))).thenReturn(savedStore);

        StoreRegisterResponse response = sut.registerStore(accountId, request);

        assertThat(response.getStoreId()).isEqualTo(1L);
        assertThat(response.getAccountId()).isEqualTo(accountId);
        assertThat(response.getBusinessNumber()).isEqualTo("1234567890");
        assertThat(response.getLatitude()).isEqualByComparingTo(new BigDecimal("37.556993"));
        assertThat(response.getLongitude()).isEqualByComparingTo(new BigDecimal("126.922679"));
        assertThat(response.getToken()).isNotBlank();
        assertThat(JwtTokenUtils.getRoles(response.getToken(), TEST_JWT_SECRET_KEY))
                .contains("OWNER");
        assertThat(response.getAuthStatus()).isEqualTo(AuthStatus.PENDING);
        org.mockito.Mockito.verify(accountRoleRepository, times(1)).save(any(AccountRole.class));
    }

    @Test
    void 계정이_없으면_예외가_발생한다() {
        String accountId = "owner_escape";
        StoreRegisterRequest request = createRequest("1234567890");
        when(accountRepository.findByAccountId(accountId)).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.registerStore(accountId, request));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    @Test
    void 사업자번호가_중복이면_예외가_발생한다() {
        String accountId = "owner_escape";
        Account account = createAccount(accountId);
        StoreRegisterRequest request = createRequest("1234567890");

        when(accountRepository.findByAccountId(accountId)).thenReturn(Optional.of(account));
        when(storeRepository.existsByBusinessNumber(request.getBusinessNumber())).thenReturn(true);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.registerStore(accountId, request));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.BAD_REQUEST);
        assertThat(e.getMessage()).contains("이미 등록된 사업자등록번호입니다.");
        org.mockito.Mockito.verify(storeRepository, never()).save(any(Store.class));
        org.mockito.Mockito.verify(accountRoleRepository, never()).save(any(AccountRole.class));
    }

    @Test
    void 이미_OWNER권한이_있으면_중복저장하지_않는다() {
        String accountId = "owner_escape";
        Account account = createAccount(accountId);
        account.getAccountRoleList().add(AccountRole.of(account, createRole("OWNER")));
        StoreRegisterRequest request = createRequest("1234567899");
        Store savedStore = Store.builder()
                .id(2L)
                .account(account)
                .businessName(request.getBusinessName())
                .businessNumber(request.getBusinessNumber())
                .branchName(request.getBranchName())
                .address(request.getAddress())
                .addressDetail(request.getAddressDetail())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .authStatus(AuthStatus.PENDING)
                .build();

        when(accountRepository.findByAccountId(accountId)).thenReturn(Optional.of(account));
        when(storeRepository.existsByBusinessNumber(request.getBusinessNumber())).thenReturn(false);
        when(storeRepository.save(any(Store.class))).thenReturn(savedStore);

        StoreRegisterResponse response = sut.registerStore(accountId, request);

        assertThat(response.getStoreId()).isEqualTo(2L);
        assertThat(response.getToken()).isNull();
        org.mockito.Mockito.verify(roleRepository, never()).findByName("OWNER");
        org.mockito.Mockito.verify(accountRoleRepository, never()).save(any(AccountRole.class));
    }

    @Test
    void OWNER역할이_없으면_예외가_발생한다() {
        String accountId = "owner_escape";
        Account account = createAccount(accountId);
        StoreRegisterRequest request = createRequest("1234567890");

        when(accountRepository.findByAccountId(accountId)).thenReturn(Optional.of(account));
        when(storeRepository.existsByBusinessNumber(request.getBusinessNumber())).thenReturn(false);
        when(roleRepository.findByName("OWNER")).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.registerStore(accountId, request));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INTERNAL_SERVER_ERROR);
        org.mockito.Mockito.verify(storeRepository, never()).save(any(Store.class));
    }

    @Test
    void 내_스토어_목록을_조회한다() {
        String accountId = "owner_escape";
        Store store1 = Store.builder()
                .id(1L)
                .businessName("미로연구소")
                .branchName("홍대점")
                .authStatus(AuthStatus.PENDING)
                .build();
        Store store2 = Store.builder()
                .id(2L)
                .businessName("미로연구소")
                .branchName("강남점")
                .authStatus(AuthStatus.APPROVED)
                .build();

        when(storeRepository.findAllByAccount_AccountId(accountId))
                .thenReturn(java.util.Arrays.asList(store1, store2));

        var response = sut.getMyStores(accountId);

        assertThat(response).hasSize(2);
        assertThat(response.get(0).getStoreId()).isEqualTo(1L);
        assertThat(response.get(0).getBusinessName()).isEqualTo("미로연구소");
        assertThat(response.get(0).getBranchName()).isEqualTo("홍대점");
        assertThat(response.get(1).getStoreId()).isEqualTo(2L);
        assertThat(response.get(1).getBranchName()).isEqualTo("강남점");
    }

    @Test
    void 등록된_스토어가_없으면_빈_리스트를_반환한다() {
        String accountId = "owner_escape";

        when(storeRepository.findAllByAccount_AccountId(accountId))
                .thenReturn(new ArrayList<>());

        var response = sut.getMyStores(accountId);

        assertThat(response).isEmpty();
    }

    private StoreRegisterRequest createRequest(String businessNumber) {
        return StoreRegisterRequest.builder()
                .businessName("미로연구소")
                .businessNumber(businessNumber)
                .branchName("홍대점")
                .address("서울특별시 마포구 와우산로 123")
                .addressDetail("2층")
                .latitude(new BigDecimal("37.556993"))
                .longitude(new BigDecimal("126.922679"))
                .build();
    }

    private Account createAccount(String accountId) {
        return Account.builder()
                .accountId(accountId)
                .password("encodedPassword")
                .name("점장")
                .phoneNumber("01012341234")
                .email("owner@moyeobang.com")
                .profileName("미로연구소")
                .profileImage(null)
                .profileText("운영자")
                .birthday(LocalDate.of(1990, 1, 1))
                .gender(Gender.M)
                .accountRoleList(new ArrayList<>())
                .preferenceGenreList(new ArrayList<>())
                .build();
    }

    private Role createRole(String name) {
        Role role = new Role();
        setField(role, "name", name);
        return role;
    }

    private void setField(Object target, String fieldName, Object value) {
        try {
            Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }
}
