package com.ironkim.moyeobang.controller;

import com.ironkim.moyeobang.dto.response.AccountLoginResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ironkim.moyeobang.dto.request.AccountJoinRequest;
import com.ironkim.moyeobang.dto.request.AccountLoginRequest;
import com.ironkim.moyeobang.dto.response.AccountJoinResponse;
import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "AuthController", description = "인증 관련 API")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/accountId-check/{accountId}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "계정 ID 중복 체크 성공")
    })
    public Response<Boolean> accountIdCheck(@PathVariable String accountId) {
        return Response.success(authService.accountIdCheck(accountId));
    }

    @GetMapping("/email-check")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 중복 체크 성공")
    })
    public Response<Boolean> emailCheck(@RequestParam String email) {
        return Response.success(authService.emailCheck(email));
    }

    @PostMapping(value = "/account/join", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "요청 유효성 오류", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "409", description = "중복 계정 ID", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<AccountJoinResponse> AccountJoin(@ModelAttribute @Valid AccountJoinRequest joinRequest) {
        return Response.success(authService.AccountJoin(joinRequest));
    }

    @PostMapping("/account/login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호 불일치", content = @Content(schema = @Schema(implementation = Response.class))),
            @ApiResponse(responseCode = "404", description = "계정 없음", content = @Content(schema = @Schema(implementation = Response.class)))
    })
    public Response<AccountLoginResponse> Accountlogin(@RequestBody AccountLoginRequest accountLoginRequest) {
        return Response.success(new AccountLoginResponse(authService.AccountLogin(accountLoginRequest)));
    }
}
