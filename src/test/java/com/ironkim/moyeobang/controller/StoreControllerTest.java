package com.ironkim.moyeobang.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import com.ironkim.moyeobang.domain.constant.AuthStatus;
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
import com.ironkim.moyeobang.dto.request.StoreNumberRequest;
import com.ironkim.moyeobang.dto.request.StoreRegisterRequest;
import com.ironkim.moyeobang.dto.request.StoreUpdateRequest;
import com.ironkim.moyeobang.dto.response.StoreDetailResponse;
import com.ironkim.moyeobang.dto.response.StoreNumberResponse;
import com.ironkim.moyeobang.dto.response.StoreRegisterResponse;
import com.ironkim.moyeobang.dto.response.StoreSimpleResponse;
import com.ironkim.moyeobang.dto.response.StoreUpdateResponse;
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
                                .storeNumberList(List.of(
                                                StoreNumberRequest.builder()
                                                                .storeNumber("01012345678")
                                                                .build()))
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
                                .token("newToken")
                                .build();

                when(storeService.registerStore(eq("owner_escape"), any(StoreRegisterRequest.class)))
                                .thenReturn(response);

                mockMvc.perform(post("/api/v1/store")
                                .with(authentication(authenticationToken))
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsBytes(request)))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(jsonPath("$.result.storeId").value(1L))
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
                                .storeNumberList(List.of(
                                                StoreNumberRequest.builder()
                                                                .storeNumber("01012345678")
                                                                .build()))
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
                                new StoreSimpleResponse(1L, "미로연구소", "홍대점",
                                                AuthStatus.PENDING),
                                new StoreSimpleResponse(2L, "미로연구소", "강남점",
                                                AuthStatus.APPROVED));

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

        @Test
        void 스토어_상세조회_성공() throws Exception {
                AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        principal,
                        null,
                        principal.getAuthorities());

                Long storeId = 1L;
                StoreDetailResponse detailResponse = StoreDetailResponse.builder()
                                .storeId(storeId)
                                .accountId("owner_escape")
                                .businessName("미로연구소")
                                .businessNumber("1234567890")
                                .branchName("홍대점")
                                .address("서울특별시 마포구 와우산로 123")
                                .addressDetail("2층")
                                .latitude(new BigDecimal("37.556993"))
                                .longitude(new BigDecimal("126.922679"))
                                .authStatus(AuthStatus.PENDING)
                                .storeNumberList(List.of(
                                                StoreNumberResponse.builder()
                                                                .id(10L)
                                                                .storeNumber("01012345678")
                                                                .build()))
                                .build();

                when(storeService.getStoreDetail(storeId)).thenReturn(detailResponse);

                mockMvc.perform(get("/api/v1/store/" + storeId)
                                .with(authentication(authenticationToken)))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(jsonPath("$.result.storeId").value(storeId))
                                .andExpect(jsonPath("$.result.businessName").value("미로연구소"))
                                .andExpect(jsonPath("$.result.businessNumber").value("1234567890"))
                                .andExpect(jsonPath("$.result.storeNumberList[0].id").value(10L))
                                .andExpect(jsonPath("$.result.storeNumberList[0].storeNumber").value("01012345678"));
        }

        @Test
        void 스토어_수정_성공() throws Exception {
                Long storeId = 1L;
                AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                principal,
                                null,
                                principal.getAuthorities());

                StoreUpdateRequest updateRequest = StoreUpdateRequest.builder()
                                .businessName("미로연구소 업그레이드")
                                .branchName("강남점")
                                .address("서울특별시 강남구 테헤란로 456")
                                .addressDetail("3층")
                                .storeNumberList(List.of(
                                                StoreNumberRequest.builder()
                                                                .id(10L)
                                                                .storeNumber("01099998888")
                                                                .build(),
                                                StoreNumberRequest.builder()
                                                                .storeNumber("021112222")
                                                                .build()))
                                .latitude(new BigDecimal("37.501274"))
                                .longitude(new BigDecimal("127.039585"))
                                .build();

                StoreUpdateResponse updateResponse = StoreUpdateResponse.builder()
                                .storeId(storeId)
                                .build();

                when(storeService.updateStore(eq(storeId), eq("owner_escape"), any(StoreUpdateRequest.class)))
                                .thenReturn(updateResponse);

                mockMvc.perform(put("/api/v1/store/" + storeId)
                                .with(authentication(authenticationToken))
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsBytes(updateRequest)))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                                .andExpect(jsonPath("$.result.storeId").value(1L));
        }

        @Test
        void 인증없이_스토어수정시_401반환() throws Exception {
                Long storeId = 1L;
                StoreUpdateRequest updateRequest = StoreUpdateRequest.builder()
                                .businessName("변경")
                                .branchName("변경점")
                                .address("변경주소")
                                .storeNumberList(List.of(
                                                StoreNumberRequest.builder()
                                                                .storeNumber("01000000000")
                                                                .build()))
                                .latitude(new BigDecimal("37.5"))
                                .longitude(new BigDecimal("127.0"))
                                .build();

                mockMvc.perform(put("/api/v1/store/" + storeId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsBytes(updateRequest)))
                                .andDo(print())
                                .andExpect(status().isUnauthorized());
        }

}
