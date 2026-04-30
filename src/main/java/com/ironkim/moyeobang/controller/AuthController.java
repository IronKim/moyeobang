package com.ironkim.moyeobang.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ironkim.moyeobang.dto.request.AccountJoinRequest;
import com.ironkim.moyeobang.dto.request.AccountLoginRequest;
import com.ironkim.moyeobang.dto.response.AccountJoinResponse;
import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.dto.response.UserLoginResponse;
import com.ironkim.moyeobang.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/accountId-check/{accountId}")
    public Response<Boolean> accountIdCheck(@PathVariable("accountId") String accountId) {
        return Response.success(authService.accountIdCheck(accountId));
    }

    @PostMapping("account/join")
    public Response<AccountJoinResponse> AccountJoin(@RequestBody @Valid AccountJoinRequest joinRequest) {
        return Response.success(authService.AccountJoin(joinRequest));
    }

    @PostMapping("account/login")
    public Response<UserLoginResponse> Accountlogin(@RequestBody AccountLoginRequest userLoginRequest) {
        return Response.success(new UserLoginResponse(authService.AccountLogin(userLoginRequest)));
    }
}
