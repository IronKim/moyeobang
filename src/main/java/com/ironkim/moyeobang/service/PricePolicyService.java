package com.ironkim.moyeobang.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ironkim.moyeobang.domain.PriceDetail;
import com.ironkim.moyeobang.domain.PricePolicy;
import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.Theme;
import com.ironkim.moyeobang.dto.request.PriceDetailRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyRegisterRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyUpdateRequest;
import com.ironkim.moyeobang.dto.response.PricePolicyDetailResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyRegisterResponse;
import com.ironkim.moyeobang.dto.response.PricePolicySimpleResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyUpdateResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.PriceDetailRepository;
import com.ironkim.moyeobang.repository.PricePolicyRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.repository.ThemeRepository;
import com.ironkim.moyeobang.validator.StorePermissionValidator;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PricePolicyService {

    private final StoreRepository storeRepository;
    private final PricePolicyRepository pricePolicyRepository;
    private final PriceDetailRepository priceDetailRepository;
    private final ThemeRepository themeRepository;
    private final StorePermissionValidator storePermissionValidator;

    public PricePolicyRegisterResponse registerPricePolicy(Long storeId, String accountId,
            PricePolicyRegisterRequest request) {
        Store store = getOwnedStore(storeId, accountId);

        PricePolicy pricePolicy = pricePolicyRepository.save(PricePolicy.builder()
                .store(store)
                .theme(getThemeOrNull(request.getThemeId()))
                .name(request.getName())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .dayOfWeek(request.getDayOfWeek())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .priority(request.getPriority())
                .active(request.getActive())
                .build());

        savePriceDetails(pricePolicy, request.getPriceDetailList());

        return PricePolicyRegisterResponse.fromEntity(pricePolicy);
    }

    @Transactional(readOnly = true)
    public List<PricePolicySimpleResponse> getPricePolicies(Long storeId, String accountId) {
        getOwnedStore(storeId, accountId);

        return pricePolicyRepository.findAllByStore_Id(storeId).stream()
                .map(PricePolicySimpleResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PricePolicyDetailResponse getPricePolicyDetail(Long storeId, Long policyId, String accountId) {
        getOwnedStore(storeId, accountId);

        PricePolicy pricePolicy = pricePolicyRepository.findByIdAndStore_Id(policyId, storeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 가격 정책을 찾을 수 없습니다.", policyId)));

        return PricePolicyDetailResponse.fromEntity(pricePolicy);
    }

    public PricePolicyUpdateResponse updatePricePolicy(Long storeId, Long policyId, String accountId,
            PricePolicyUpdateRequest request) {
        getOwnedStore(storeId, accountId);

        PricePolicy pricePolicy = pricePolicyRepository.findByIdAndStore_Id(policyId, storeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 가격 정책을 찾을 수 없습니다.", policyId)));

        pricePolicy.setTheme(getThemeOrNull(request.getThemeId()));
        pricePolicy.setName(request.getName());
        pricePolicy.setStartDate(request.getStartDate());
        pricePolicy.setEndDate(request.getEndDate());
        pricePolicy.setDayOfWeek(request.getDayOfWeek());
        pricePolicy.setStartTime(request.getStartTime());
        pricePolicy.setEndTime(request.getEndTime());
        pricePolicy.setPriority(request.getPriority());
        pricePolicy.setActive(request.getActive());

        priceDetailRepository.deleteAllByPricePolicy_Id(pricePolicy.getId());
        savePriceDetails(pricePolicy, request.getPriceDetailList());

        return PricePolicyUpdateResponse.fromEntity(pricePolicy);
    }

    public void deletePricePolicy(Long storeId, Long policyId, String accountId) {
        getOwnedStore(storeId, accountId);

        PricePolicy pricePolicy = pricePolicyRepository.findByIdAndStore_Id(policyId, storeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 가격 정책을 찾을 수 없습니다.", policyId)));

        priceDetailRepository.deleteAllByPricePolicy_Id(pricePolicy.getId());
        pricePolicyRepository.delete(pricePolicy);
    }

    private Store getOwnedStore(Long storeId, String accountId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 스토어를 찾을 수 없습니다.", storeId)));

        storePermissionValidator.validateOwner(store, accountId);

        return store;
    }

    private Theme getThemeOrNull(Long themeId) {
        if (themeId == null) {
            return null;
        }

        return themeRepository.findById(themeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 테마를 찾을 수 없습니다.", themeId)));
    }

    private void savePriceDetails(PricePolicy pricePolicy, List<PriceDetailRequest> priceDetailRequests) {
        for (PriceDetailRequest priceDetailRequest : priceDetailRequests) {
            priceDetailRepository.save(PriceDetail.builder()
                    .pricePolicy(pricePolicy)
                    .headcount(priceDetailRequest.getHeadcount())
                    .price(priceDetailRequest.getPrice())
                    .build());
        }
    }
}
