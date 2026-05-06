package com.ironkim.moyeobang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironkim.moyeobang.config.SecurityConfig;
import com.ironkim.moyeobang.domain.constant.Genre;
import com.ironkim.moyeobang.dto.request.AccountJoinRequest;
import com.ironkim.moyeobang.dto.request.AccountLoginRequest;
import com.ironkim.moyeobang.dto.response.AccountJoinResponse;
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

import static com.ironkim.moyeobang.domain.constant.Gender.M;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import(SecurityConfig.class)
@WebMvcTest(value = AuthController.class)
public class AuthControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @MockBean
        private AuthService authService;

        @Test
        void 계정회원가입() throws Exception {
                AccountJoinRequest accountJoinRequest = new AccountJoinRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                M,
                                Set.of(Genre.ADVENTURE, Genre.CRIME));
                when(authService.AccountJoin(any(AccountJoinRequest.class)))
                                .thenReturn(new AccountJoinResponse("testId", "testName"));

                mockMvc.perform(post("/api/v1/auth/account/join")
                                .content(objectMapper.writeValueAsBytes(accountJoinRequest))
                                .contentType(MediaType.APPLICATION_JSON) // 요청 헤더에 application/json을 담아서 보내는 것을 의미
                ).andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.result.accountId").value("testId"))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.result.name").value("testName"))
                                .andExpect(status().isOk());
        }

        @Test
        void 이미_회원가입된_아이디로_계정회원가입하는경우_에러반환() throws Exception {
                AccountJoinRequest accountJoinRequest = new AccountJoinRequest(
                                "testId",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                M,
                                Set.of(Genre.ADVENTURE, Genre.CRIME));
                when(authService.AccountJoin(any(AccountJoinRequest.class)))
                                .thenThrow(new MoyeobangApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID));

                mockMvc.perform(post("/api/v1/auth/account/join")
                                .content(objectMapper.writeValueAsBytes(accountJoinRequest))
                                .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode")
                                                .value(ErrorCode.DUPLICATED_ACCOUNT_ID.name()))
                                .andExpect(status().isConflict());
        }

        @Test
        void 요청이_유효하지_않은_경우_계정회원가입_에러반환() throws Exception {
                AccountJoinRequest accountJoinRequest = new AccountJoinRequest(
                                "test",
                                "testPassw1!",
                                "testName",
                                "01012345678",
                                "test@naver.com",
                                "testProfileImage",
                                "testProfileName",
                                "testProfileText",
                                LocalDate.of(1990, 1, 1),
                                M,
                                Set.of(Genre.ADVENTURE, Genre.CRIME));

                mockMvc.perform(post("/api/v1/auth/account/join")
                                .content(objectMapper.writeValueAsBytes(accountJoinRequest))
                                .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                                .andExpect(status().isBadRequest());
        }

        @Test
        void 계정로그인() throws Exception {
                AccountLoginRequest accountLoginRequest = new AccountLoginRequest("testId", "testPassw1!");
                when(authService.AccountLogin(any(AccountLoginRequest.class))).thenReturn("testToken");

                mockMvc.perform(post("/api/v1/auth/account/login")
                                .content(objectMapper.writeValueAsBytes(accountLoginRequest))
                                .contentType(MediaType.APPLICATION_JSON) // 요청 헤더에 application/json을 담아서 보내는 것을 의미
                ).andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.result.token").value("testToken"))
                                .andExpect(status().isOk());
        }

        @Test
        void 계정로그인시_회원가입이_안된_아이디로_로그인하는경우_에러반환() throws Exception {
                AccountLoginRequest accountLoginRequest = new AccountLoginRequest("testId", "testPassw1!");
                when(authService.AccountLogin(any(AccountLoginRequest.class)))
                                .thenThrow(new MoyeobangApplicationException(ErrorCode.ACCOUNT_NOT_FOUND));

                mockMvc.perform(post("/api/v1/auth/account/login")
                                .content(objectMapper.writeValueAsBytes(accountLoginRequest))
                                .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode")
                                                .value(ErrorCode.ACCOUNT_NOT_FOUND.name()))
                                .andExpect(status().isNotFound());
        }

        @Test
        void 계정로그인시_비밀번호가_틀린경우_에러반환() throws Exception {
                AccountLoginRequest accountLoginRequest = new AccountLoginRequest("testId", "testPassw1!");
                when(authService.AccountLogin(any(AccountLoginRequest.class)))
                                .thenThrow(new MoyeobangApplicationException(ErrorCode.INVALID_PASSWORD));

                mockMvc.perform(post("/api/v1/auth/account/login")
                                .content(objectMapper.writeValueAsBytes(accountLoginRequest))
                                .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode")
                                                .value(ErrorCode.INVALID_PASSWORD.name()))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        void 계정아이디중복체크() throws Exception {
                when(authService.accountIdCheck(eq("testId"))).thenReturn(true);

                mockMvc.perform(get("/api/v1/auth/accountId-check/testId"))
                                .andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.result").value(true))
                                .andExpect(status().isOk());
        }

        @Test
        void 계정아이디중복체크시_사용가능한_아이디인경우_false반환() throws Exception {
                when(authService.accountIdCheck(eq("newId"))).thenReturn(false);

                mockMvc.perform(get("/api/v1/auth/accountId-check/newId"))
                                .andDo(print())
                                .andExpect(MockMvcResultMatchers.jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(MockMvcResultMatchers.jsonPath("$.result").value(false))
                                .andExpect(status().isOk());
        }
}