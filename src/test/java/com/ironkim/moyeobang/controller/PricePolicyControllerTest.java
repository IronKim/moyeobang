package com.ironkim.moyeobang.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.LocalTime;
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
import com.ironkim.moyeobang.dto.request.PriceDetailRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyRegisterRequest;
import com.ironkim.moyeobang.dto.request.PricePolicyUpdateRequest;
import com.ironkim.moyeobang.dto.response.PriceDetailResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyDetailResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyRegisterResponse;
import com.ironkim.moyeobang.dto.response.PricePolicySimpleResponse;
import com.ironkim.moyeobang.dto.response.PricePolicyUpdateResponse;
import com.ironkim.moyeobang.service.AuthService;
import com.ironkim.moyeobang.service.PricePolicyService;

@Import(SecurityConfig.class)
@WebMvcTest(value = PricePolicyController.class)
class PricePolicyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PricePolicyService pricePolicyService;

    @MockBean
    private AuthService authService;

    @Test
    void 가격정책_등록_성공() throws Exception {
        Long storeId = 1L;

        PricePolicyRegisterRequest request = PricePolicyRegisterRequest.builder()
                .name("평일 주간")
                .themeId(10L)
                .startDate(LocalDate.of(2026, 1, 1))
                .endDate(null)
                .dayOfWeek(31)
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(18, 0))
                .priority(1)
                .active(true)
                .priceDetailList(List.of(
                        PriceDetailRequest.builder().headcount(2).price(50000).build(),
                        PriceDetailRequest.builder().headcount(4).price(90000).build()))
                .build();

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        PricePolicyRegisterResponse response = PricePolicyRegisterResponse.builder()
                .policyId(100L)
                .build();

        when(pricePolicyService.registerPricePolicy(eq(storeId), eq("owner_escape"),
                any(PricePolicyRegisterRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/store/" + storeId + "/price-policy")
                .with(authentication(token))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.policyId").value(100L));
    }

    @Test
    void 가격정책_목록_조회_성공() throws Exception {
        Long storeId = 1L;

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        List<PricePolicySimpleResponse> response = List.of(
                new PricePolicySimpleResponse(100L, "평일 주간", true, 1),
                new PricePolicySimpleResponse(101L, "주말 야간", false, 2));

        when(pricePolicyService.getPricePolicies(storeId, "owner_escape")).thenReturn(response);

        mockMvc.perform(get("/api/v1/store/" + storeId + "/price-policy")
                .with(authentication(token)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result", Matchers.hasSize(2)))
                .andExpect(jsonPath("$.result[0].policyId").value(100L))
                .andExpect(jsonPath("$.result[0].name").value("평일 주간"));
    }

    @Test
    void 가격정책_상세_조회_성공() throws Exception {
        Long storeId = 1L;
        Long policyId = 100L;

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        PricePolicyDetailResponse response = PricePolicyDetailResponse.builder()
                .policyId(policyId)
                .storeId(storeId)
                .themeId(10L)
                .name("평일 주간")
                .startDate(LocalDate.of(2026, 1, 1))
                .endDate(null)
                .dayOfWeek(31)
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(18, 0))
                .priority(1)
                .active(true)
                .priceDetailList(List.of(
                        PriceDetailResponse.builder().id(1L).headcount(2).price(50000).build()))
                .build();

        when(pricePolicyService.getPricePolicyDetail(storeId, policyId, "owner_escape")).thenReturn(response);

        mockMvc.perform(get("/api/v1/store/" + storeId + "/price-policy/" + policyId)
                .with(authentication(token)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.policyId").value(policyId))
                .andExpect(jsonPath("$.result.priceDetailList[0].headcount").value(2))
                .andExpect(jsonPath("$.result.priceDetailList[0].price").value(50000));
    }

    @Test
    void 가격정책_수정_성공() throws Exception {
        Long storeId = 1L;
        Long policyId = 100L;

        PricePolicyUpdateRequest request = PricePolicyUpdateRequest.builder()
                .name("주말 심야")
                .themeId(10L)
                .startDate(LocalDate.of(2026, 1, 1))
                .endDate(LocalDate.of(2026, 12, 31))
                .dayOfWeek(96)
                .startTime(LocalTime.of(20, 0))
                .endTime(LocalTime.of(23, 59, 59))
                .priority(2)
                .active(true)
                .priceDetailList(List.of(
                        PriceDetailRequest.builder().headcount(2).price(60000).build(),
                        PriceDetailRequest.builder().headcount(5).price(120000).build()))
                .build();

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        PricePolicyUpdateResponse response = PricePolicyUpdateResponse.builder()
                .policyId(policyId)
                .build();

        when(pricePolicyService.updatePricePolicy(eq(storeId), eq(policyId), eq("owner_escape"),
                any(PricePolicyUpdateRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/v1/store/" + storeId + "/price-policy/" + policyId)
                .with(authentication(token))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.policyId").value(policyId));
    }

    @Test
    void 가격정책_삭제_성공() throws Exception {
        Long storeId = 1L;
        Long policyId = 100L;

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        doNothing().when(pricePolicyService).deletePricePolicy(storeId, policyId, "owner_escape");

        mockMvc.perform(delete("/api/v1/store/" + storeId + "/price-policy/" + policyId)
                .with(authentication(token)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"));
    }

    @Test
    void 인증없이_가격정책_등록시_401반환() throws Exception {
        Long storeId = 1L;

        PricePolicyRegisterRequest request = PricePolicyRegisterRequest.builder()
                .name("평일 주간")
                .priority(1)
                .active(true)
                .priceDetailList(List.of(
                        PriceDetailRequest.builder().headcount(2).price(50000).build()))
                .build();

        mockMvc.perform(post("/api/v1/store/" + storeId + "/price-policy")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }
}
