package com.ironkim.moyeobang.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.PricePolicy;
import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.Theme;
import com.ironkim.moyeobang.domain.constant.AuthStatus;
import com.ironkim.moyeobang.domain.constant.Gender;
import com.ironkim.moyeobang.dto.request.PriceDetailRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyRegisterRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyUpdateRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.PriceDetailRepository;
import com.ironkim.moyeobang.repository.PricePolicyRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.repository.ThemeRepository;
import com.ironkim.moyeobang.validator.StorePermissionValidator;

@ExtendWith(MockitoExtension.class)
class PricePolicyServiceTest {

    @InjectMocks
    private PricePolicyService sut;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private PricePolicyRepository pricePolicyRepository;

    @Mock
    private PriceDetailRepository priceDetailRepository;

    @Mock
    private ThemeRepository themeRepository;

    @Mock
    private StorePermissionValidator storePermissionValidator;

    @Test
    void 가격정책_등록_성공() {
        Long storeId = 1L;
        Long themeId = 10L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
        Theme theme = createTheme(themeId, store);

        PricePolicyRegisterRequest request = PricePolicyRegisterRequest.builder()
                .name("평일 주간")
                .themeId(themeId)
                .startDate(LocalDate.of(2026, 1, 1))
                .endDate(null)
                .dayOfWeek(31)
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(18, 0))
                .priority(1)
                .active(true)
                .priceDetailList(List.of(
                        PriceDetailRequest.builder().headcount(2).price(50000).build(),
                        PriceDetailRequest.builder().headcount(4).price(90000).build()))
                .build();

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.findById(themeId)).thenReturn(Optional.of(theme));
        when(pricePolicyRepository.save(any(PricePolicy.class))).thenAnswer(inv -> {
            PricePolicy policy = inv.getArgument(0);
            setField(policy, "id", 100L);
            return policy;
        });

        var response = sut.registerPricePolicy(storeId, accountId, request);

        assertThat(response.getPolicyId()).isEqualTo(100L);
        verify(storePermissionValidator, times(1)).validateOwner(store, accountId);
        verify(priceDetailRepository, times(2)).save(any());
    }

    @Test
    void 가격정책_등록_시_테마가_없으면_예외() {
        Long storeId = 1L;
        String accountId = "owner_escape";
        Long missingThemeId = 999L;

        Store store = createStore(storeId, accountId);
        PricePolicyRegisterRequest request = PricePolicyRegisterRequest.builder()
                .name("평일 주간")
                .themeId(missingThemeId)
                .priority(1)
                .active(true)
                .priceDetailList(List.of(PriceDetailRequest.builder().headcount(2).price(50000).build()))
                .build();

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.findById(missingThemeId)).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.registerPricePolicy(storeId, accountId, request));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.POST_NOT_FOUND);
    }

    @Test
    void 가격정책_목록_조회_성공() {
        Long storeId = 1L;
        String accountId = "owner_escape";
        Store store = createStore(storeId, accountId);

        PricePolicy p1 = PricePolicy.builder().id(11L).store(store).name("평일").priority(1).active(true).build();
        PricePolicy p2 = PricePolicy.builder().id(12L).store(store).name("주말").priority(2).active(false).build();

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(pricePolicyRepository.findAllByStore_Id(storeId)).thenReturn(List.of(p1, p2));

        var response = sut.getPricePolicies(storeId, accountId);

        assertThat(response).hasSize(2);
        assertThat(response.get(0).getPolicyId()).isEqualTo(11L);
        assertThat(response.get(0).getName()).isEqualTo("평일");
        assertThat(response.get(1).getPolicyId()).isEqualTo(12L);
    }

    @Test
    void 가격정책_상세_조회_시_없으면_예외() {
        Long storeId = 1L;
        Long policyId = 99L;
        String accountId = "owner_escape";
        Store store = createStore(storeId, accountId);

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(pricePolicyRepository.findByIdAndStore_Id(policyId, storeId)).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.getPricePolicyDetail(storeId, policyId, accountId));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.POST_NOT_FOUND);
    }

    @Test
    void 가격정책_수정_성공() {
        Long storeId = 1L;
        Long policyId = 100L;
        Long themeId = 10L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
        Theme theme = createTheme(themeId, store);
        PricePolicy pricePolicy = PricePolicy.builder()
                .id(policyId)
                .store(store)
                .name("기존 정책")
                .priority(9)
                .active(false)
                .priceDetailList(new ArrayList<>())
                .build();

        PricePolicyUpdateRequest request = PricePolicyUpdateRequest.builder()
                .name("변경 정책")
                .themeId(themeId)
                .startDate(LocalDate.of(2026, 2, 1))
                .endDate(LocalDate.of(2026, 12, 31))
                .dayOfWeek(96)
                .startTime(LocalTime.of(20, 0))
                .endTime(LocalTime.of(23, 0))
                .priority(1)
                .active(true)
                .priceDetailList(List.of(
                        PriceDetailRequest.builder().headcount(2).price(60000).build(),
                        PriceDetailRequest.builder().headcount(5).price(120000).build()))
                .build();

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(pricePolicyRepository.findByIdAndStore_Id(policyId, storeId)).thenReturn(Optional.of(pricePolicy));
        when(themeRepository.findById(themeId)).thenReturn(Optional.of(theme));

        var response = sut.updatePricePolicy(storeId, policyId, accountId, request);

        assertThat(response.getPolicyId()).isEqualTo(policyId);
        assertThat(pricePolicy.getName()).isEqualTo("변경 정책");
        verify(priceDetailRepository, times(1)).deleteAllByPricePolicy_Id(policyId);
        verify(priceDetailRepository, times(2)).save(any());
    }

    @Test
    void 가격정책_삭제_성공() {
        Long storeId = 1L;
        Long policyId = 100L;
        String accountId = "owner_escape";
        Store store = createStore(storeId, accountId);
        PricePolicy pricePolicy = PricePolicy.builder().id(policyId).store(store).name("정책").priority(1).active(true)
                .build();

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(pricePolicyRepository.findByIdAndStore_Id(policyId, storeId)).thenReturn(Optional.of(pricePolicy));

        sut.deletePricePolicy(storeId, policyId, accountId);

        verify(priceDetailRepository, times(1)).deleteAllByPricePolicy_Id(policyId);
        verify(pricePolicyRepository, times(1)).delete(pricePolicy);
    }

    @Test
    void 가격정책_목록_조회_시_권한없음_예외() {
        Long storeId = 1L;
        String accountId = "staff_a";
        Store store = createStore(storeId, "owner_escape");

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        doThrow(new MoyeobangApplicationException(ErrorCode.INVALID_PERMISSION, "권한 없음"))
                .when(storePermissionValidator).validateOwner(store, accountId);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.getPricePolicies(storeId, accountId));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INVALID_PERMISSION);
    }

    private Store createStore(Long storeId, String accountId) {
        return Store.builder()
                .id(storeId)
                .account(createAccount(accountId))
                .businessName("미로연구소")
                .businessNumber("1234567890")
                .branchName("홍대점")
                .address("서울특별시 마포구 와우산로 123")
                .addressDetail("2층")
                .latitude(new java.math.BigDecimal("37.556993"))
                .longitude(new java.math.BigDecimal("126.922679"))
                .authStatus(AuthStatus.APPROVED)
                .themeList(new ArrayList<>())
                .contactList(new ArrayList<>())
                .build();
    }

    private Theme createTheme(Long themeId, Store store) {
        Theme theme = Theme.builder()
                .id(themeId)
                .store(store)
                .title("심연의 저택")
                .description("공포 테마")
                .minHeadcount(2)
                .maxHeadcount(6)
                .playTime(75)
                .difficultyLevel(4)
                .fearLevel(5)
                .activityLevel(3)
                .build();
        return theme;
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
