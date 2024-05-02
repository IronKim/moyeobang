package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.domain.constant.RoleType;
import com.ironkim.moyeobang.dto.SellerAccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.SellerJoinRequest;
import com.ironkim.moyeobang.dto.request.SellerLoginRequest;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.dto.request.UserLoginRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.fixture.SellerAccountFixture;
import com.ironkim.moyeobang.fixture.UserAccountFixture;
import com.ironkim.moyeobang.repository.SellerAccountRepository;
import com.ironkim.moyeobang.repository.UserAccountRepository;
import com.ironkim.moyeobang.util.JwtTokenUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @InjectMocks private AuthService sut;

    @Mock private UserAccountRepository userAccountRepository;
    @Mock private SellerAccountRepository sellerAccountRepository;
    @Mock private BCryptPasswordEncoder encoder;

    @Test
    void 유저회원가입이_정상적으로_동작하는_경우() {
        UserJoinRequest userJoinRequest = createUserJoinRequest();
        when(userAccountRepository.findByAccountId(userJoinRequest.getAccountId())).thenReturn(Optional.empty());
        when(sellerAccountRepository.findByAccountId(userJoinRequest.getAccountId())).thenReturn(Optional.empty());
        when(encoder.encode(userJoinRequest.getPassword())).thenReturn("encodedPassword");
        when(userAccountRepository.save(any(UserAccount.class))).thenReturn(UserAccountFixture.get());

        UserAccountDto result = sut.userJoin(userJoinRequest);

        then(userAccountRepository).should().findByAccountId(userJoinRequest.getAccountId());
        then(sellerAccountRepository).should().findByAccountId(userJoinRequest.getAccountId());
        then(encoder).should().encode(userJoinRequest.getPassword());
        then(userAccountRepository).should().save(any(UserAccount.class));
        assertThat(result).isEqualTo(UserAccountDto.fromUserAccount(UserAccountFixture.get()));
        assertThat(result.getPassword()).isNotEqualTo(userJoinRequest.getPassword());
    }

    @Test
    void 유저회원가입시_이미_유저에_등록된_아이디로_회원가입을_하는_경우() {
        UserJoinRequest userJoinRequest = createUserJoinRequest();
        UserAccount fixture = UserAccountFixture.get();
        when(userAccountRepository.findByAccountId(userJoinRequest.getAccountId())).thenReturn(Optional.of(fixture));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.userJoin(userJoinRequest));

        then(userAccountRepository).should().findByAccountId(userJoinRequest.getAccountId());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_ACCOUNT_ID);
    }

    @Test
    void 유저회원가입시_이미_판매자에_등록된_아이디로_회원가입을_하는_경우() {
        UserJoinRequest userJoinRequest = createUserJoinRequest();
        SellerAccount fixture = SellerAccountFixture.get();
        when(userAccountRepository.findByAccountId(userJoinRequest.getAccountId())).thenReturn(Optional.empty());
        when(sellerAccountRepository.findByAccountId(userJoinRequest.getAccountId())).thenReturn(Optional.of(fixture));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.userJoin(userJoinRequest));

        then(userAccountRepository).should().findByAccountId(userJoinRequest.getAccountId());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_ACCOUNT_ID);
    }

    @Test
    void 판매자회원가입이_정상적으로_동작하는_경우() {
        SellerJoinRequest sellerJoinRequest = createSellerJoinRequest();
        when(userAccountRepository.findByAccountId(sellerJoinRequest.getAccountId())).thenReturn(Optional.empty());
        when(sellerAccountRepository.findByAccountId(sellerJoinRequest.getAccountId())).thenReturn(Optional.empty());
        when(encoder.encode(sellerJoinRequest.getPassword())).thenReturn("encodedPassword");
        when(sellerAccountRepository.save(any(SellerAccount.class))).thenReturn(SellerAccountFixture.get());

        SellerAccountDto result = sut.sellerJoin(sellerJoinRequest);

        then(userAccountRepository).should().findByAccountId(sellerJoinRequest.getAccountId());
        then(sellerAccountRepository).should().findByAccountId(sellerJoinRequest.getAccountId());
        then(encoder).should().encode(sellerJoinRequest.getPassword());
        then(sellerAccountRepository).should().save(any(SellerAccount.class));
        assertThat(result).isEqualTo(SellerAccountDto.fromSellerAccount(SellerAccountFixture.get()));
        assertThat(result.getPassword()).isNotEqualTo(sellerJoinRequest.getPassword());
    }

    @Test
    void 판매자회원가입시_이미_유저에_등록된_아이디로_회원가입을_하는_경우() {
        SellerJoinRequest sellerJoinRequest = createSellerJoinRequest();
        SellerAccount fixture = SellerAccountFixture.get();
        when(sellerAccountRepository.findByAccountId(sellerJoinRequest.getAccountId())).thenReturn(Optional.of(fixture));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.sellerJoin(sellerJoinRequest));

        then(sellerAccountRepository).should().findByAccountId(sellerJoinRequest.getAccountId());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_ACCOUNT_ID);
    }

    @Test
    void 판매자회원가입시_이미_판매자에_등록된_아이디로_회원가입을_하는_경우() {
        SellerJoinRequest sellerJoinRequest = createSellerJoinRequest();
        SellerAccount fixture = SellerAccountFixture.get();
        when(userAccountRepository.findByAccountId(sellerJoinRequest.getAccountId())).thenReturn(Optional.empty());
        when(sellerAccountRepository.findByAccountId(sellerJoinRequest.getAccountId())).thenReturn(Optional.of(fixture));

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.sellerJoin(sellerJoinRequest));

        then(sellerAccountRepository).should().findByAccountId(sellerJoinRequest.getAccountId());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.DUPLICATED_ACCOUNT_ID);
    }

    @Test
    void 유저로그인이_정상적으로_동작하는_경우() {
        try(MockedStatic<JwtTokenUtils> jwtTokenUtils = mockStatic(JwtTokenUtils.class)) {
            UserLoginRequest userLoginRequest = createUserLoginRequest();
            UserAccount fixture = UserAccountFixture.get();
            when(userAccountRepository.findByAccountId(userLoginRequest.getAccountId())).thenReturn(Optional.of(fixture));
            when(encoder.matches(userLoginRequest.getPassword(), fixture.getPassword())).thenReturn(true);
            jwtTokenUtils.when(() -> JwtTokenUtils.generateToken(fixture.getAccountId(), RoleType.USER, fixture.getName(), "secretKey", 1000L * 60 * 60 * 24)).thenReturn("token");

            String result = sut.userLogin(userLoginRequest);

            then(userAccountRepository).should().findByAccountId(userLoginRequest.getAccountId());
            then(encoder).should().matches(userLoginRequest.getPassword(), fixture.getPassword());
        }
    }

    @Test
    void 유저로그인시_존재하지_않는_아이디로_로그인을_하는_경우() {
        UserLoginRequest userLoginRequest = createUserLoginRequest();
        when(userAccountRepository.findByAccountId(userLoginRequest.getAccountId())).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.userLogin(userLoginRequest));

        then(userAccountRepository).should().findByAccountId(userLoginRequest.getAccountId());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    @Test
    void 유저로그인시_비밀번호가_일치하지_않는_경우() {
        UserLoginRequest userLoginRequest = createUserLoginRequest();
        UserAccount fixture = UserAccountFixture.get();
        when(userAccountRepository.findByAccountId(userLoginRequest.getAccountId())).thenReturn(Optional.of(fixture));
        when(encoder.matches(userLoginRequest.getPassword(), fixture.getPassword())).thenReturn(false);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.userLogin(userLoginRequest));

        then(userAccountRepository).should().findByAccountId(userLoginRequest.getAccountId());
        then(encoder).should().matches(userLoginRequest.getPassword(), fixture.getPassword());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INVALID_PASSWORD);
    }

    @Test
    void 판매자로그인이_정상적으로_동작하는_경우() {
        try(MockedStatic<JwtTokenUtils> jwtTokenUtils = mockStatic(JwtTokenUtils.class)) {
            SellerLoginRequest sellerLoginRequest = createSellerLoginRequest();
            SellerAccount fixture = SellerAccountFixture.get();
            when(sellerAccountRepository.findByAccountId(sellerLoginRequest.getAccountId())).thenReturn(Optional.of(fixture));
            when(encoder.matches(sellerLoginRequest.getPassword(), fixture.getPassword())).thenReturn(true);
            jwtTokenUtils.when(() -> JwtTokenUtils.generateToken(fixture.getAccountId(), RoleType.SELLER, fixture.getName(), "secretKey", 1000L * 60 * 60 * 24)).thenReturn("token");

            String result = sut.sellerLogin(sellerLoginRequest);

            then(sellerAccountRepository).should().findByAccountId(sellerLoginRequest.getAccountId());
            then(encoder).should().matches(sellerLoginRequest.getPassword(), fixture.getPassword());
        }
    }

    @Test
    void 판매자로그인시_존재하지_않는_아이디로_로그인을_하는_경우() {
        SellerLoginRequest sellerLoginRequest = createSellerLoginRequest();
        when(sellerAccountRepository.findByAccountId(sellerLoginRequest.getAccountId())).thenReturn(Optional.empty());

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.sellerLogin(sellerLoginRequest));

        then(sellerAccountRepository).should().findByAccountId(sellerLoginRequest.getAccountId());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    @Test
    void 판매자로그인시_비밀번호가_일치하지_않는_경우() {
        SellerLoginRequest sellerLoginRequest = createSellerLoginRequest();
        SellerAccount fixture = SellerAccountFixture.get();
        when(sellerAccountRepository.findByAccountId(sellerLoginRequest.getAccountId())).thenReturn(Optional.of(fixture));
        when(encoder.matches(sellerLoginRequest.getPassword(), fixture.getPassword())).thenReturn(false);

        MoyeobangApplicationException e = assertThrows(MoyeobangApplicationException.class, () -> sut.sellerLogin(sellerLoginRequest));

        then(sellerAccountRepository).should().findByAccountId(sellerLoginRequest.getAccountId());
        then(encoder).should().matches(sellerLoginRequest.getPassword(), fixture.getPassword());
        assertThat(e.getErrorCode()).isEqualTo(ErrorCode.INVALID_PASSWORD);
    }




    private UserJoinRequest createUserJoinRequest() {
        return new UserJoinRequest(
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
    }

    private SellerJoinRequest createSellerJoinRequest() {
        return new SellerJoinRequest(
                "testId",
                "testPassw1!",
                "testName",
                "01012345678",
                "test@naver.com",
                "testBusinessName",
                "1231212345"
        );
    }

    private UserLoginRequest createUserLoginRequest() {
        return new UserLoginRequest(
                "testId",
                "testPassw1!"
        );
    }

    private SellerLoginRequest createSellerLoginRequest() {
        return new SellerLoginRequest(
                "testId",
                "testPassw1!"
        );
    }
}