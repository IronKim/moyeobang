package com.ironkim.moyeobang.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import org.hamcrest.Matchers;
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
import com.ironkim.moyeobang.dto.response.StoreSimpleResponse;
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

    @Test
    void 내_스토어_목록_조회_성공() throws Exception {
        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        List<StoreSimpleResponse> responseList = List.of(
                new StoreSimpleResponse(1L, "미로연구소", "홍대점", com.ironkim.moyeobang.domain.constant.AuthStatus.PENDING),
                new StoreSimpleResponse(2L, "미로연구소", "강남점", com.ironkim.moyeobang.domain.constant.AuthStatus.APPROVED)
        );

        when(storeService.getMyStores("owner_escape")).thenReturn(responseList);

        mockMvc.perform(get("/api/v1/store/my")
                .with(authentication(authenticationToken)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result", Matchers.hasSize(2)))
                .andExpect(jsonPath("$.result[0].storeId").value(1L))
                .andExpect(jsonPath("$.result[0].businessName").value("미로연구소"))
                .andExpect(jsonPath("$.result[0].branchName").value("홍대점"))
                .andExpect(jsonPath("$.result[1].storeId").value(2L))
                .andExpect(jsonPath("$.result[1].branchName").value("강남점"));
    }

    @Test
    void 인증없이_스토어목록조회시_401반환() throws Exception {
        mockMvc.perform(get("/api/v1/store/my"))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }
}
