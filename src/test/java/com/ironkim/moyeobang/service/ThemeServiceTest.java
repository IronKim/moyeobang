package com.ironkim.moyeobang.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.Genre;
import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.domain.Theme;
import com.ironkim.moyeobang.domain.ThemeGenre;
import com.ironkim.moyeobang.domain.constant.AuthStatus;
import com.ironkim.moyeobang.dto.request.ThemeRegisterRequest;
import com.ironkim.moyeobang.dto.request.ThemeUpdateRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.GenreRepository;
import com.ironkim.moyeobang.repository.StoreRepository;
import com.ironkim.moyeobang.repository.ThemeGenreRepository;
import com.ironkim.moyeobang.repository.ThemeRepository;
import com.ironkim.moyeobang.validator.StorePermissionValidator;

@ExtendWith(MockitoExtension.class)
class ThemeServiceTest {

    @InjectMocks
    private ThemeService sut;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private ThemeRepository themeRepository;

    @Mock
    private ThemeGenreRepository themeGenreRepository;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private StorePermissionValidator storePermissionValidator;

    @Test
    void 테마_등록_성공() {
        Long storeId = 1L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
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

        Genre horror = createGenre(1L, com.ironkim.moyeobang.domain.constant.Genre.HORROR);
        Genre mystery = createGenre(2L, com.ironkim.moyeobang.domain.constant.Genre.MYSTERY);

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.save(any(Theme.class))).thenAnswer(inv -> {
            Theme theme = inv.getArgument(0);
            setField(theme, "id", 10L);
            return theme;
        });
        when(genreRepository.findAllByNameIn(request.getGenres())).thenReturn(List.of(horror, mystery));

        var response = sut.registerTheme(storeId, accountId, request);

        assertThat(response.getThemeId()).isEqualTo(10L);
        verify(storePermissionValidator, times(1)).validateOwner(store, accountId);
        verify(themeGenreRepository, times(2)).save(any(ThemeGenre.class));
    }

    @Test
    void 테마_등록_시_장르가_유효하지_않으면_예외() {
        Long storeId = 1L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
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

        Genre horror = createGenre(1L, com.ironkim.moyeobang.domain.constant.Genre.HORROR);

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.save(any(Theme.class))).thenAnswer(inv -> inv.getArgument(0));
        when(genreRepository.findAllByNameIn(request.getGenres())).thenReturn(List.of(horror));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.registerTheme(storeId, accountId, request));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.BAD_REQUEST);
    }

    @Test
    void 테마_목록_조회_성공() {
        Long storeId = 1L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
        Theme theme = createTheme(10L, store);
        theme.getThemeGenreList().add(ThemeGenre.builder()
                .id(1L)
                .theme(theme)
                .genre(createGenre(1L, com.ironkim.moyeobang.domain.constant.Genre.HORROR))
                .build());

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.findAllByStore_Id(storeId)).thenReturn(List.of(theme));

        var response = sut.getThemes(storeId, accountId);

        assertThat(response).hasSize(1);
        assertThat(response.get(0).getThemeId()).isEqualTo(10L);
    }

    @Test
    void 테마_상세_조회_시_없으면_예외() {
        Long storeId = 1L;
        Long themeId = 99L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.findByIdAndStore_Id(themeId, storeId)).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.getThemeDetail(storeId, themeId, accountId));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.POST_NOT_FOUND);
    }

    @Test
    void 테마_수정_성공() {
        Long storeId = 1L;
        Long themeId = 10L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
        Theme theme = createTheme(themeId, store);

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

        Genre horror = createGenre(1L, com.ironkim.moyeobang.domain.constant.Genre.HORROR);
        Genre thriller = createGenre(2L, com.ironkim.moyeobang.domain.constant.Genre.THRILLER);

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.findByIdAndStore_Id(themeId, storeId)).thenReturn(Optional.of(theme));
        when(genreRepository.findAllByNameIn(request.getGenres())).thenReturn(List.of(horror, thriller));

        var response = sut.updateTheme(storeId, themeId, accountId, request);

        assertThat(response.getThemeId()).isEqualTo(themeId);
        assertThat(theme.getTitle()).isEqualTo("심연의 저택 리뉴얼");
        verify(themeGenreRepository, times(1)).deleteAllByTheme_Id(themeId);
        verify(themeGenreRepository, times(2)).save(any(ThemeGenre.class));
    }

    @Test
    void 테마_삭제_성공() {
        Long storeId = 1L;
        Long themeId = 10L;
        String accountId = "owner_escape";

        Store store = createStore(storeId, accountId);
        Theme theme = createTheme(themeId, store);

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        when(themeRepository.findByIdAndStore_Id(themeId, storeId)).thenReturn(Optional.of(theme));

        sut.deleteTheme(storeId, themeId, accountId);

        verify(themeGenreRepository, times(1)).deleteAllByTheme_Id(themeId);
        verify(themeRepository, times(1)).delete(theme);
    }

    @Test
    void 테마_조회_시_권한없음_예외() {
        Long storeId = 1L;
        String accountId = "staff_user";

        Store store = createStore(storeId, "owner_escape");

        when(storeRepository.findById(storeId)).thenReturn(Optional.of(store));
        doThrow(new MoyeobangApplicationException(ErrorCode.INVALID_PERMISSION, "권한 없음"))
                .when(storePermissionValidator)
                .validateOwner(store, accountId);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.getThemes(storeId, accountId));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INVALID_PERMISSION);
    }

    private Store createStore(Long storeId, String accountId) {
        return Store.builder()
                .id(storeId)
                .account(Account.builder().accountId(accountId).build())
                .businessName("미로연구소")
                .businessNumber("1234567890")
                .branchName("홍대점")
                .address("서울특별시 마포구 와우산로 123")
                .addressDetail("2층")
                .latitude(new BigDecimal("37.556993"))
                .longitude(new BigDecimal("126.922679"))
                .authStatus(AuthStatus.APPROVED)
                .themeList(new ArrayList<>())
                .contactList(new ArrayList<>())
                .build();
    }

    private Theme createTheme(Long themeId, Store store) {
        return Theme.builder()
                .id(themeId)
                .store(store)
                .title("심연의 저택")
                .description("공포 추리 테마")
                .minHeadcount(2)
                .maxHeadcount(6)
                .playTime(75)
                .difficultyLevel(4)
                .fearLevel(5)
                .activityLevel(3)
                .themeGenreList(new ArrayList<>())
                .build();
    }

    private Genre createGenre(Long id, com.ironkim.moyeobang.domain.constant.Genre name) {
        Genre genre = new Genre();
        setField(genre, "id", id);
        setField(genre, "name", name);
        return genre;
    }

    private void setField(Object target, String fieldName, Object value) {
        try {
            Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }
}
