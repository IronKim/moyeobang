package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.AccountRole;
import com.ironkim.moyeobang.domain.Role;
import com.ironkim.moyeobang.domain.constant.Gender;
import com.ironkim.moyeobang.domain.constant.Genre;
import com.ironkim.moyeobang.dto.request.AccountJoinRequest;
import com.ironkim.moyeobang.dto.request.AccountLoginRequest;
import com.ironkim.moyeobang.dto.response.AccountJoinResponse;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.repository.AccountRepository;
import com.ironkim.moyeobang.repository.AccountRoleRepository;
import com.ironkim.moyeobang.repository.GenreRepository;
import com.ironkim.moyeobang.repository.PreferenceGenreRepository;
import com.ironkim.moyeobang.repository.RoleRepository;
import com.ironkim.moyeobang.util.JwtTokenUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    private static final String TEST_JWT_SECRET_KEY = "test-jwt-secret-key-for-unit-tests-only-2026";

    @InjectMocks
    private AuthService sut;

    @Mock
    private AccountRepository accountRepository;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private AccountRoleRepository accountRoleRepository;
    @Mock
    private GenreRepository genreRepository;
    @Mock
    private PreferenceGenreRepository preferenceGenreRepository;
    @Mock
    private BCryptPasswordEncoder encoder;

    @BeforeEach
    void setUp() {
        setField(sut, "secretKey", TEST_JWT_SECRET_KEY);
        setField(sut, "expiredTimeMs", 1000L * 60 * 60 * 24);
    }

    @Test
    void 계정아이디가_존재하면_true를_반환한다() {
        when(accountRepository.findByAccountId("testId")).thenReturn(Optional.of(createAccount("testId")));

        boolean result = sut.accountIdCheck("testId");

        assertThat(result).isTrue();
    }

    @Test
    void 계정회원가입이_정상적으로_동작한다() {
        AccountJoinRequest joinRequest = createJoinRequest(Set.of(Genre.ADVENTURE, Genre.CRIME));
        Account savedAccount = createAccount(joinRequest.getAccountId());
        Role userRole = createRole("USER");
        List<com.ironkim.moyeobang.domain.Genre> genres = List.of(
                createGenre(Genre.ADVENTURE),
                createGenre(Genre.CRIME));

        when(accountRepository.findByAccountId(joinRequest.getAccountId())).thenReturn(Optional.empty());
        when(encoder.encode(joinRequest.getPassword())).thenReturn("encodedPassword");
        when(accountRepository.save(any(Account.class))).thenReturn(savedAccount);
        when(roleRepository.findByName("USER")).thenReturn(Optional.of(userRole));
        when(genreRepository.findAllByNameIn(joinRequest.getPreferenceGenres())).thenReturn(genres);

        AccountJoinResponse result = sut.AccountJoin(joinRequest);

        then(accountRepository).should().save(any(Account.class));
        then(accountRoleRepository).should().save(any(com.ironkim.moyeobang.domain.AccountRole.class));
        then(preferenceGenreRepository).should().saveAll(anyList());
        assertThat(result.getAccountId()).isEqualTo(savedAccount.getAccountId());
        assertThat(result.getName()).isEqualTo(savedAccount.getName());
    }

    @Test
    void 계정회원가입시_중복아이디면_예외가_발생한다() {
        AccountJoinRequest joinRequest = createJoinRequest(Set.of(Genre.ADVENTURE));
        when(accountRepository.findByAccountId(joinRequest.getAccountId()))
                .thenReturn(Optional.of(createAccount("testId")));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.AccountJoin(joinRequest));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_ACCOUNT_ID);
        then(accountRepository).should(never()).save(any(Account.class));
    }

    @Test
    void 계정회원가입시_USER역할이_없으면_예외가_발생한다() {
        AccountJoinRequest joinRequest = createJoinRequest(Set.of(Genre.ADVENTURE));
        when(accountRepository.findByAccountId(joinRequest.getAccountId())).thenReturn(Optional.empty());
        when(encoder.encode(joinRequest.getPassword())).thenReturn("encodedPassword");
        when(accountRepository.save(any(Account.class))).thenReturn(createAccount(joinRequest.getAccountId()));
        when(roleRepository.findByName("USER")).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.AccountJoin(joinRequest));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @Test
    void 계정회원가입시_선호장르가_유효하지않으면_예외가_발생한다() {
        AccountJoinRequest joinRequest = createJoinRequest(Set.of(Genre.ADVENTURE, Genre.CRIME));
        when(accountRepository.findByAccountId(joinRequest.getAccountId())).thenReturn(Optional.empty());
        when(encoder.encode(joinRequest.getPassword())).thenReturn("encodedPassword");
        when(accountRepository.save(any(Account.class))).thenReturn(createAccount(joinRequest.getAccountId()));
        when(roleRepository.findByName("USER")).thenReturn(Optional.of(createRole("USER")));
        when(genreRepository.findAllByNameIn(joinRequest.getPreferenceGenres()))
                .thenReturn(List.of(createGenre(Genre.ADVENTURE)));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.AccountJoin(joinRequest));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.BAD_REQUEST);
    }

    @Test
    void 계정로그인이_정상적으로_동작한다() {
        AccountLoginRequest loginRequest = new AccountLoginRequest("testId", "testPassw1!");
        Account account = createAccount("testId");
        Role userRole = createRole("USER");
        account.getAccountRoleList().add(AccountRole.of(account, userRole));

        when(accountRepository.findByAccountId(loginRequest.getAccountId())).thenReturn(Optional.of(account));
        when(encoder.matches(loginRequest.getPassword(), account.getPassword())).thenReturn(true);

        String token = sut.AccountLogin(loginRequest);

        assertThat(token).isNotBlank();
        assertThat(JwtTokenUtils.getAccountId(token, TEST_JWT_SECRET_KEY))
                .isEqualTo("testId");
        assertThat(JwtTokenUtils.getRoles(token, TEST_JWT_SECRET_KEY))
                .containsExactly("USER");
    }

    @Test
    void 계정로그인시_아이디가_없으면_예외가_발생한다() {
        AccountLoginRequest loginRequest = new AccountLoginRequest("testId", "testPassw1!");
        when(accountRepository.findByAccountId(loginRequest.getAccountId())).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.AccountLogin(loginRequest));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    @Test
    void 계정로그인시_비밀번호가_틀리면_예외가_발생한다() {
        AccountLoginRequest loginRequest = new AccountLoginRequest("testId", "testPassw1!");
        Account account = createAccount("testId");

        when(accountRepository.findByAccountId(loginRequest.getAccountId())).thenReturn(Optional.of(account));
        when(encoder.matches(loginRequest.getPassword(), account.getPassword())).thenReturn(false);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.AccountLogin(loginRequest));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INVALID_PASSWORD);
    }

    @Test
    void 계정로그인시_권한이_없으면_예외가_발생한다() {
        AccountLoginRequest loginRequest = new AccountLoginRequest("testId", "testPassw1!");
        Account account = createAccount("testId");

        when(accountRepository.findByAccountId(loginRequest.getAccountId())).thenReturn(Optional.of(account));
        when(encoder.matches(loginRequest.getPassword(), account.getPassword())).thenReturn(true);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class,
                () -> sut.AccountLogin(loginRequest));

        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    private AccountJoinRequest createJoinRequest(Set<Genre> preferenceGenres) {
        return new AccountJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testProfileName",
                "testProfileImage",
                "testProfileText",
                LocalDate.of(1990, 1, 1),
                Gender.M,
                preferenceGenres);
    }

    private Account createAccount(String accountId) {
        return Account.builder()
                .accountId(accountId)
                .password("encodedPassword")
                .name("testName")
                .phoneNumber("01012345678")
                .email("test@naver.com")
                .profileName("testProfileName")
                .profileImage("testProfileImage")
                .profileText("testProfileText")
                .birthday(LocalDate.of(1990, 1, 1))
                .gender(Gender.M)
                .accountRoleList(new ArrayList<>())
                .preferenceGenreList(new ArrayList<>())
                .build();
    }

    private Role createRole(String name) {
        Role role = new Role();
        setField(role, "name", name);
        return role;
    }

    private com.ironkim.moyeobang.domain.Genre createGenre(Genre genreName) {
        com.ironkim.moyeobang.domain.Genre genre = new com.ironkim.moyeobang.domain.Genre();
        setField(genre, "name", genreName);
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