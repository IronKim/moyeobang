package com.ironkim.moyeobang.controller;

import com.ironkim.moyeobang.dto.SellerAccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.SellerJoinRequest;
import com.ironkim.moyeobang.dto.request.SellerLoginRequest;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.dto.request.UserLoginRequest;
import com.ironkim.moyeobang.dto.response.*;
import com.ironkim.moyeobang.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/accountId-check/{accountId}")
    public Response<Boolean> accountIdCheck(@PathVariable("accountId") String accountId) {
        System.out.println("accountIdCheck" + accountId);
        return Response.success(authService.accountIdCheck(accountId));
    }

    @PostMapping("/user-join")
    public Response<UserJoinResponse> userJoin(@RequestBody @Valid UserJoinRequest userJoinRequest) {
        UserAccountDto userAccountDto = authService.userJoin(userJoinRequest);
        return Response.success(UserJoinResponse.fromUserAccountDto(userAccountDto));
    }

    @PostMapping("/seller-join")
    public Response<SellerJoinResponse> sellerJoin(@RequestBody @Valid SellerJoinRequest sellerJoinRequest) {
        SellerAccountDto sellerAccountDto = authService.sellerJoin(sellerJoinRequest);
        return Response.success(SellerJoinResponse.fromSellerAccountDto(sellerAccountDto));
    }

    @PostMapping("/user-login")
    public Response<UserLoginResponse> userlogin(@RequestBody UserLoginRequest userLoginRequest) {
        String token = authService.userLogin(userLoginRequest);
        return Response.success(new UserLoginResponse(token));
    }

    @PostMapping("/seller-login")
    public Response<SellerLoginResponse> sellerlogin(@RequestBody SellerLoginRequest sellerLoginRequest) {
        String token = authService.sellerLogin(sellerLoginRequest);
        return Response.success(new SellerLoginResponse(token));
    }
}
