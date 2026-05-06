package com.ironkim.moyeobang.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ironkim.moyeobang.dto.AccountPrincipal;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.dto.response.StoreRegisterResponse;
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
}
