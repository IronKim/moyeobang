package com.ironkim.moyeobang.controller;

import com.ironkim.moyeobang.dto.SellerAccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.SellerJoinRequest;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.dto.response.Response;
import com.ironkim.moyeobang.dto.response.SellerJoinResponse;
import com.ironkim.moyeobang.dto.response.UserJoinResponse;
import com.ironkim.moyeobang.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

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
}
