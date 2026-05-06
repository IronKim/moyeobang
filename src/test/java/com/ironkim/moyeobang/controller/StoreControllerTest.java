package com.ironkim.moyeobang.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironkim.moyeobang.config.SecurityConfig;
import com.ironkim.moyeobang.dto.AccountPrincipal;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.response.StoreRegisterResponse;
import com.ironkim.moyeobang.service.AuthService;
import com.ironkim.moyeobang.service.StoreService;

@Import(SecurityConfig.class)
@WebMvcTest(value = StoreController.class)
class StoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private StoreService storeService;

    @MockBean
    private AuthService authService;

    @Test
    void 스토어등록_성공() throws Exception {
        StoreRegisterRequest request = StoreRegisterRequest.builder()
                .businessName("미로연구소")
                .businessNumber("1234567890")
                .branchName("홍대점")
                .address("서울특별시 마포구 와우산로 123")
                .addressDetail("2층")
                .latitude(new BigDecimal("37.556993"))
                .longitude(new BigDecimal("126.922679"))
                .build();

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        StoreRegisterResponse response = StoreRegisterResponse.builder()
                .storeId(1L)
                .accountId("owner_escape")
                .businessName("미로연구소")
                .businessNumber("1234567890")
                .branchName("홍대점")
                .address("서울특별시 마포구 와우산로 123")
                .addressDetail("2층")
                .latitude(new BigDecimal("37.556993"))
                .longitude(new BigDecimal("126.922679"))
                .token("newToken")
                .build();

        when(storeService.registerStore(eq("owner_escape"), any(StoreRegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/store")
                .with(authentication(authenticationToken))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.storeId").value(1L))
                .andExpect(jsonPath("$.result.accountId").value("owner_escape"))
                .andExpect(jsonPath("$.result.businessNumber").value("1234567890"))
                .andExpect(jsonPath("$.result.token").value("newToken"));
    }

    @Test
    void 인증없이_스토어등록시_401반환() throws Exception {
        StoreRegisterRequest request = StoreRegisterRequest.builder()
                .businessName("미로연구소")
                .businessNumber("1234567890")
                .branchName("홍대점")
                .address("서울특별시 마포구 와우산로 123")
                .addressDetail("2층")
                .latitude(new BigDecimal("37.556993"))
                .longitude(new BigDecimal("126.922679"))
                .build();

        mockMvc.perform(post("/api/v1/store")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }
}
