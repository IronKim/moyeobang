package com.ironkim.moyeobang.service;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.dto.SellerAccountDto;
import com.ironkim.moyeobang.dto.UserAccountDto;
import com.ironkim.moyeobang.dto.request.SellerJoinRequest;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;
import com.ironkim.moyeobang.fixture.SellerAccountFixture;
import com.ironkim.moyeobang.fixture.UserAccountFixture;
import com.ironkim.moyeobang.repository.SellerAccountRepository;
import com.ironkim.moyeobang.repository.UserAccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.then;
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
}