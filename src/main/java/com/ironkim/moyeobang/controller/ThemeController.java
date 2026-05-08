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
import com.ironkim.moyeobang.dto.request.ThemeRegisterRequest;
import com.ironkim.moyeobang.dto.request.ThemeUpdateRequest;
import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.dto.response.ThemeDetailResponse;
import com.ironkim.moyeobang.dto.response.ThemeRegisterResponse;
import com.ironkim.moyeobang.dto.response.ThemeSimpleResponse;
import com.ironkim.moyeobang.dto.response.ThemeUpdateResponse;
import com.ironkim.moyeobang.service.ThemeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "ThemeController", description = "테마 관리 API")
@RestController
@RequestMapping("/api/v1/store/{storeId}/theme")
@RequiredArgsConstructor
public class ThemeController {

    private final ThemeService themeService;

    @PostMapping
    @Operation(summary = "테마 등록", description = "스토어 소유자가 테마를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "등록 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<ThemeRegisterResponse> registerTheme(
            @PathVariable Long storeId,
            @AuthenticationPrincipal AccountPrincipal principal,
            @RequestBody @Valid ThemeRegisterRequest request) {
        return Response.success(themeService.registerTheme(storeId, principal.getUsername(), request));
    }

    @GetMapping
    @Operation(summary = "테마 목록 조회", description = "스토어 소유자가 테마 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<List<ThemeSimpleResponse>> getThemes(
            @PathVariable Long storeId,
            @AuthenticationPrincipal AccountPrincipal principal) {
        return Response.success(themeService.getThemes(storeId, principal.getUsername()));
    }

    @GetMapping("/{themeId}")
    @Operation(summary = "테마 상세 조회", description = "스토어 소유자가 테마 상세를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 테마를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<ThemeDetailResponse> getThemeDetail(
            @PathVariable Long storeId,
            @PathVariable Long themeId,
            @AuthenticationPrincipal AccountPrincipal principal) {
        return Response.success(themeService.getThemeDetail(storeId, themeId, principal.getUsername()));
    }

    @PutMapping("/{themeId}")
    @Operation(summary = "테마 수정", description = "스토어 소유자가 테마를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수정 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 테마를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<ThemeUpdateResponse> updateTheme(
            @PathVariable Long storeId,
            @PathVariable Long themeId,
            @AuthenticationPrincipal AccountPrincipal principal,
            @RequestBody @Valid ThemeUpdateRequest request) {
        return Response.success(themeService.updateTheme(storeId, themeId, principal.getUsername(), request));
    }

    @DeleteMapping("/{themeId}")
    @Operation(summary = "테마 삭제", description = "스토어 소유자가 테마를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "삭제 성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "스토어 또는 테마를 찾을 수 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<Void> deleteTheme(
            @PathVariable Long storeId,
            @PathVariable Long themeId,
            @AuthenticationPrincipal AccountPrincipal principal) {
        themeService.deleteTheme(storeId, themeId, principal.getUsername());
        return Response.success();
    }
}
