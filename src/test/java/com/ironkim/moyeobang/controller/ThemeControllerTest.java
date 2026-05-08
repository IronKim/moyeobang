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

import java.util.List;
import java.util.Set;

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
import com.ironkim.moyeobang.dto.request.ThemeRegisterRequest;
import com.ironkim.moyeobang.dto.request.ThemeUpdateRequest;
import com.ironkim.moyeobang.dto.response.ThemeDetailResponse;
import com.ironkim.moyeobang.dto.response.ThemeRegisterResponse;
import com.ironkim.moyeobang.dto.response.ThemeSimpleResponse;
import com.ironkim.moyeobang.dto.response.ThemeUpdateResponse;
import com.ironkim.moyeobang.service.AuthService;
import com.ironkim.moyeobang.service.ThemeService;

@Import(SecurityConfig.class)
@WebMvcTest(value = ThemeController.class)
class ThemeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ThemeService themeService;

    @MockBean
    private AuthService authService;

    @Test
    void 테마_등록_성공() throws Exception {
        Long storeId = 1L;
        ThemeRegisterRequest request = ThemeRegisterRequest.builder()
                .title("심연의 저택")
                .description("공포 추리 테마")
                .minHeadcount(2)
                .maxHeadcount(6)
                .playTime(75)
                .difficultyLevel(4)
                .fearLevel(5)
                .activityLevel(3)
                .genres(Set.of(com.ironkim.moyeobang.domain.constant.Genre.HORROR,
                        com.ironkim.moyeobang.domain.constant.Genre.MYSTERY))
                .build();

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());

        when(themeService.registerTheme(eq(storeId), eq("owner_escape"), any(ThemeRegisterRequest.class)))
                .thenReturn(ThemeRegisterResponse.builder().themeId(10L).build());

        mockMvc.perform(post("/api/v1/store/" + storeId + "/theme")
                .with(authentication(token))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.themeId").value(10L));
    }

    @Test
    void 테마_목록_조회_성공() throws Exception {
        Long storeId = 1L;
        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());

        when(themeService.getThemes(storeId, "owner_escape")).thenReturn(List.of(
                new ThemeSimpleResponse(10L, "심연의 저택")));

        mockMvc.perform(get("/api/v1/store/" + storeId + "/theme")
                .with(authentication(token)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result", Matchers.hasSize(1)))
                .andExpect(jsonPath("$.result[0].themeId").value(10L));
    }

    @Test
    void 테마_상세_조회_성공() throws Exception {
        Long storeId = 1L;
        Long themeId = 10L;
        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());

        when(themeService.getThemeDetail(storeId, themeId, "owner_escape")).thenReturn(
                ThemeDetailResponse.builder()
                        .themeId(themeId)
                        .storeId(storeId)
                        .title("심연의 저택")
                        .description("공포 추리 테마")
                        .minHeadcount(2)
                        .maxHeadcount(6)
                        .playTime(75)
                        .difficultyLevel(4)
                        .fearLevel(5)
                        .activityLevel(3)
                        .genres(Set.of(com.ironkim.moyeobang.domain.constant.Genre.HORROR,
                                com.ironkim.moyeobang.domain.constant.Genre.MYSTERY))
                        .build());

        mockMvc.perform(get("/api/v1/store/" + storeId + "/theme/" + themeId)
                .with(authentication(token)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.themeId").value(themeId))
                .andExpect(jsonPath("$.result.title").value("심연의 저택"));
    }

    @Test
    void 테마_수정_성공() throws Exception {
        Long storeId = 1L;
        Long themeId = 10L;

        ThemeUpdateRequest request = ThemeUpdateRequest.builder()
                .title("심연의 저택 리뉴얼")
                .description("리뉴얼된 공포 추리 테마")
                .minHeadcount(2)
                .maxHeadcount(6)
                .playTime(80)
                .difficultyLevel(5)
                .fearLevel(5)
                .activityLevel(4)
                .genres(Set.of(com.ironkim.moyeobang.domain.constant.Genre.HORROR,
                        com.ironkim.moyeobang.domain.constant.Genre.THRILLER))
                .build();

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());

        when(themeService.updateTheme(eq(storeId), eq(themeId), eq("owner_escape"), any(ThemeUpdateRequest.class)))
                .thenReturn(ThemeUpdateResponse.builder().themeId(themeId).build());

        mockMvc.perform(put("/api/v1/store/" + storeId + "/theme/" + themeId)
                .with(authentication(token))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"))
                .andExpect(jsonPath("$.result.themeId").value(themeId));
    }

    @Test
    void 테마_삭제_성공() throws Exception {
        Long storeId = 1L;
        Long themeId = 10L;

        AccountPrincipal principal = new AccountPrincipal("owner_escape", List.of("OWNER"));
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());

        doNothing().when(themeService).deleteTheme(storeId, themeId, "owner_escape");

        mockMvc.perform(delete("/api/v1/store/" + storeId + "/theme/" + themeId)
                .with(authentication(token)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("SUCCESS"));
    }

    @Test
    void 인증없이_테마_조회시_401반환() throws Exception {
        mockMvc.perform(get("/api/v1/store/1/theme"))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }
}
