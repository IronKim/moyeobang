package com.ironkim.moyeobang.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ironkim.moyeobang.dto.AccountPrincipal;
import com.ironkim.moyeobang.dto.request.PricePolicyRegisterRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyUpdateRequest;
import com.ironkim.moyeobang.dto.response.PricePolicyDetailResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyRegisterResponse;
import com.ironkim.moyeobang.dto.response.PricePolicySimpleResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyUpdateResponse;
import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.service.PricePolicyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "PricePolicyController", description = "가격 정책 관리 API")
@RestController
@RequestMapping("/api/v1/store/{storeId}/price-policy")
@RequiredArgsConstructor
public class PricePolicyController {

    private final PricePolicyService pricePolicyService;

    @PostMapping
    @Operation(summary = "가격 정책 등록", description = "스토어 소유자가 가격 정책과 가격 상세 목록을 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "등록 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 테마를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<PricePolicyRegisterResponse> registerPricePolicy(
            @PathVariable Long storeId,
            @AuthenticationPrincipal AccountPrincipal principal,
            @RequestBody @Valid PricePolicyRegisterRequest request) {
        return Response.success(pricePolicyService.registerPricePolicy(storeId, principal.getUsername(), request));
    }

    @GetMapping
    @Operation(summary = "가격 정책 목록 조회", description = "스토어의 가격 정책 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<List<PricePolicySimpleResponse>> getPricePolicies(
            @PathVariable Long storeId,
            @AuthenticationPrincipal AccountPrincipal principal) {
        return Response.success(pricePolicyService.getPricePolicies(storeId, principal.getUsername()));
    }

    @GetMapping("/{policyId}")
    @Operation(summary = "가격 정책 상세 조회", description = "스토어의 특정 가격 정책 상세를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 가격 정책을 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<PricePolicyDetailResponse> getPricePolicyDetail(
            @PathVariable Long storeId,
            @PathVariable Long policyId,
            @AuthenticationPrincipal AccountPrincipal principal) {
        return Response.success(pricePolicyService.getPricePolicyDetail(storeId, policyId, principal.getUsername()));
    }

    @PutMapping("/{policyId}")
    @Operation(summary = "가격 정책 수정", description = "스토어 소유자가 가격 정책과 가격 상세 목록을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수정 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 가격 정책 또는 테마를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<PricePolicyUpdateResponse> updatePricePolicy(
            @PathVariable Long storeId,
            @PathVariable Long policyId,
            @AuthenticationPrincipal AccountPrincipal principal,
            @RequestBody @Valid PricePolicyUpdateRequest request) {
        return Response.success(
                pricePolicyService.updatePricePolicy(storeId, policyId, principal.getUsername(), request));
    }

    @DeleteMapping("/{policyId}")
    @Operation(summary = "가격 정책 삭제", description = "스토어 소유자가 가격 정책을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "삭제 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 가격 정책을 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<Void> deletePricePolicy(
            @PathVariable Long storeId,
            @PathVariable Long policyId,
            @AuthenticationPrincipal AccountPrincipal principal) {
        pricePolicyService.deletePricePolicy(storeId, policyId, principal.getUsername());
        return Response.success();
    }
}
