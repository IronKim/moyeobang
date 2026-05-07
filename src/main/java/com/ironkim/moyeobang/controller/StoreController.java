package com.ironkim.moyeobang.controller;

import java.util.List;

import com.ironkim.moyeobang.dto.response.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ironkim.moyeobang.dto.AccountPrincipal;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.request.StoreUpdateRequest;
import com.ironkim.moyeobang.service.StoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "StoreController", description = "스토어 관련 API")
@RestController
@RequestMapping("/api/v1/store")
@RequiredArgsConstructor
public class StoreController {

        private final StoreService storeService;

        @GetMapping("/my")
        @Operation(summary = "내 스토어 목록 조회", description = "로그인한 사업주가 등록한 스토어 목록을 반환합니다.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "조회 성공"),
                        @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class)))
        })
        public Response<List<StoreSimpleResponse>> getMyStores(
                        @AuthenticationPrincipal AccountPrincipal principal) {
                return Response.success(storeService.getMyStores(principal.getUsername()));
        }

        @PostMapping
        @Operation(summary = "스토어 등록", description = "인증된 사용자 계정으로 스토어를 등록합니다.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "스토어 등록 성공"),
                        @ApiResponse(responseCode = "400", description = "잘못된 요청 또는 중복 사업자등록번호", content = @Content(schema = @Schema(implementation = Response.class))),
                        @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
                        @ApiResponse(responseCode = "404", description = "계정을 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
        })
        public Response<StoreRegisterResponse> registerStore(
                        @AuthenticationPrincipal AccountPrincipal principal,
                        @RequestBody @Valid StoreRegisterRequest request) {
                return Response.success(storeService.registerStore(principal.getUsername(), request));
        }

        @GetMapping("/{storeId}")
        @Operation(summary = "스토어 상세 조회", description = "스토어 ID로 스토어 상세 정보를 조회합니다.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "조회 성공"),
                        @ApiResponse(responseCode = "404", description = "스토어를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
        })
        public Response<StoreDetailResponse> getStoreDetail(
                        @PathVariable Long storeId) {
                return Response.success(storeService.getStoreDetail(storeId));
        }

        @PutMapping("/{storeId}")
        @Operation(summary = "스토어 정보 수정", description = "인증된 스토어 소유자가 스토어 정보를 수정합니다.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "수정 성공"),
                        @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
                        @ApiResponse(responseCode = "403", description = "수정 권한 없음", content = @Content(schema = @Schema(implementation = Response.class))),
                        @ApiResponse(responseCode = "404", description = "스토어를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
        })
        public Response<StoreUpdateResponse> updateStore(
                        @PathVariable Long storeId,
                        @AuthenticationPrincipal AccountPrincipal principal,
                        @RequestBody @Valid StoreUpdateRequest request) {
                return Response.success(storeService.updateStore(storeId, principal.getUsername(), request));
        }
}
