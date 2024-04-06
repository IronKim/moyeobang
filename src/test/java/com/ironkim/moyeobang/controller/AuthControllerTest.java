package com.ironkim.moyeobang.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironkim.moyeobang.config.SecurityConfig;
import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.dto.SellerAccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.SellerJoinRequest;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import(SecurityConfig.class)
@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @Test
    void 유저회원가입() throws Exception {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );
        UserAccountDto userAccountDto = new UserAccountDto();
        userAccountDto.setAccountId("testId");
        userAccountDto.setName("testName");
        when(authService.userJoin(any(UserJoinRequest.class))).thenReturn(userAccountDto);

        mockMvc.perform(post("/api/v1/auth/user-join")
                        .content(objectMapper.writeValueAsBytes(userJoinRequest)) // 요청 본문에 userJoinRequest를 JSON 형태로 변환해서 담아서 보내는 것을 의미
                        .contentType(MediaType.APPLICATION_JSON) // 요청 헤더에 application/json을 담아서 보내는 것을 의미
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.accountId").value("testId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.name").value("testName"))
                .andExpect(status().isOk());
    }

    @Test
    void 이미_회원가입된_아이디로_유저회원가입하는경우_에러반환() throws Exception {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );
        when(authService.userJoin(any(UserJoinRequest.class))).thenThrow(new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID));

        mockMvc.perform(post("/api/v1/auth/user-join")
                        .content(objectMapper.writeValueAsBytes(userJoinRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value(ErrorCode.DUPLICATED_ACCOUNT_ID.name()))
                .andExpect(status().isConflict());
    }

    @Test
    void 요청이_유효하지_않은_경우_유저회원가입_에러반환() throws Exception {
        UserJoinRequest userJoinRequest = new UserJoinRequest(
                "null",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileImage",
                "testProfileName",
                "testProfileText",
                "M",
                LocalDate.of(1990, 1, 1),
                Set.of(PreferenceType.ADVENTURE, PreferenceType.CRIME)
        );
        when(authService.userJoin(any(UserJoinRequest.class))).thenThrow(new MoyeobangApplicationException(ErrorCode.BAD_REQUEST));

        mockMvc.perform(post("/api/v1/auth/user-join")
                        .content(objectMapper.writeValueAsBytes(userJoinRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value(ErrorCode.BAD_REQUEST.name()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void 판매자회원가입() throws Exception {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "businessName",
                "1231212345"
        );
        SellerAccountDto sellerAccountDto = new SellerAccountDto();
        sellerAccountDto.setAccountId("testId");
        sellerAccountDto.setName("testName");
        when(authService.sellerJoin(any(SellerJoinRequest.class))).thenReturn(sellerAccountDto);

        mockMvc.perform(post("/api/v1/auth/seller-join")
                        .content(objectMapper.writeValueAsBytes(sellerJoinRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.accountId").value("testId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.name").value("testName"))
                .andExpect(status().isOk());
    }

    @Test
    void 이미_회원가입된_아이디로_판매자회원가입하는경우_에러반환() throws Exception {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "businessName",
                "1231212345"
        );
        when(authService.sellerJoin(any(SellerJoinRequest.class))).thenThrow(new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID));

        mockMvc.perform(post("/api/v1/auth/seller-join")
                        .content(objectMapper.writeValueAsBytes(sellerJoinRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value(ErrorCode.DUPLICATED_ACCOUNT_ID.name()))
                .andExpect(status().isConflict());
    }

    @Test
    void 요청이_유효하지_않은_경우_판매자회원가입_에러반환() throws Exception {
        SellerJoinRequest sellerJoinRequest = new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "businessName",
                "1231212345"
        );
        when(authService.sellerJoin(any(SellerJoinRequest.class))).thenThrow(new MoyeobangApplicationException(ErrorCode.BAD_REQUEST));


        mockMvc.perform(post("/api/v1/auth/seller-join")
                        .content(objectMapper.writeValueAsBytes(sellerJoinRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value(ErrorCode.BAD_REQUEST.name()))
                .andExpect(status().isBadRequest());
    }
}