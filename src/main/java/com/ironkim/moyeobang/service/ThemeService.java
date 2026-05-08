package com.ironkim.moyeobang.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ironkim.moyeobang.domain.Genre;
import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.Theme;
import com.ironkim.moyeobang.domain.ThemeGenre;
import com.ironkim.moyeobang.dto.request.ThemeRegisterRequest;
import com.ironkim.moyeobang.dto.request.ThemeUpdateRequest;
import com.ironkim.moyeobang.dto.response.ThemeDetailResponse;
import com.ironkim.moyeobang.dto.response.ThemeRegisterResponse;
import com.ironkim.moyeobang.dto.response.ThemeSimpleResponse;
import com.ironkim.moyeobang.dto.response.ThemeUpdateResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.GenreRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.repository.ThemeGenreRepository;
import com.ironkim.moyeobang.repository.ThemeRepository;
import com.ironkim.moyeobang.validator.StorePermissionValidator;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ThemeService {

    private final StoreRepository storeRepository;
    private final ThemeRepository themeRepository;
    private final ThemeGenreRepository themeGenreRepository;
    private final GenreRepository genreRepository;
    private final StorePermissionValidator storePermissionValidator;

    public ThemeRegisterResponse registerTheme(Long storeId, String accountId, ThemeRegisterRequest request) {
        Store store = getOwnedStore(storeId, accountId);

        Theme theme = themeRepository.save(Theme.builder()
                .store(store)
                .title(request.getTitle())
                .description(request.getDescription())
                .minHeadcount(request.getMinHeadcount())
                .maxHeadcount(request.getMaxHeadcount())
                .playTime(request.getPlayTime())
                .difficultyLevel(request.getDifficultyLevel())
                .fearLevel(request.getFearLevel())
                .activityLevel(request.getActivityLevel())
                .build());

        saveThemeGenres(theme, request.getGenres());

        return ThemeRegisterResponse.fromEntity(theme);
    }

    @Transactional(readOnly = true)
    public List<ThemeSimpleResponse> getThemes(Long storeId, String accountId) {
        getOwnedStore(storeId, accountId);

        return themeRepository.findAllByStore_Id(storeId).stream()
                .map(ThemeSimpleResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ThemeDetailResponse getThemeDetail(Long storeId, Long themeId, String accountId) {
        getOwnedStore(storeId, accountId);

        Theme theme = getThemeByStore(storeId, themeId);
        return ThemeDetailResponse.fromEntity(theme);
    }

    public ThemeUpdateResponse updateTheme(Long storeId, Long themeId, String accountId, ThemeUpdateRequest request) {
        getOwnedStore(storeId, accountId);

        Theme theme = getThemeByStore(storeId, themeId);
        theme.setTitle(request.getTitle());
        theme.setDescription(request.getDescription());
        theme.setMinHeadcount(request.getMinHeadcount());
        theme.setMaxHeadcount(request.getMaxHeadcount());
        theme.setPlayTime(request.getPlayTime());
        theme.setDifficultyLevel(request.getDifficultyLevel());
        theme.setFearLevel(request.getFearLevel());
        theme.setActivityLevel(request.getActivityLevel());

        themeGenreRepository.deleteAllByTheme_Id(themeId);
        saveThemeGenres(theme, request.getGenres());

        return ThemeUpdateResponse.fromEntity(theme);
    }

    public void deleteTheme(Long storeId, Long themeId, String accountId) {
        getOwnedStore(storeId, accountId);

        Theme theme = getThemeByStore(storeId, themeId);
        themeGenreRepository.deleteAllByTheme_Id(themeId);
        themeRepository.delete(theme);
    }

    private Store getOwnedStore(Long storeId, String accountId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 스토어를 찾을 수 없습니다.", storeId)));

        storePermissionValidator.validateOwner(store, accountId);

        return store;
    }

    private Theme getThemeByStore(Long storeId, Long themeId) {
        return themeRepository.findByIdAndStore_Id(themeId, storeId)
                .orElseThrow(() -> new MoyeobangApplicationException(
                        ErrorCode.POST_NOT_FOUND,
                        String.format("%d 테마를 찾을 수 없습니다.", themeId)));
    }

    private void saveThemeGenres(Theme theme, Set<com.ironkim.moyeobang.domain.constant.Genre> genreNames) {
        List<Genre> genres = genreRepository.findAllByNameIn(genreNames);

        if (genres.size() != genreNames.size()) {
            throw new MoyeobangApplicationException(
                    ErrorCode.BAD_REQUEST,
                    "유효하지 않은 장르가 포함되어 있습니다.");
        }

        for (Genre genre : genres) {
            themeGenreRepository.save(ThemeGenre.builder()
                    .theme(theme)
                    .genre(genre)
                    .build());
        }
    }
}
