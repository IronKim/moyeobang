package com.ironkim.moyeobang.repository;

import com.ironkim.moyeobang.TestContainerSupport;
import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.fixture.SellerAccountFixture;
import com.ironkim.moyeobang.fixture.UserAccountFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class RepositoryTest extends TestContainerSupport {

    @Autowired
    private UserAccountRepository userAccountRepository;
    @Autowired
    private SellerAccountRepository sellerAccountRepository;

    @BeforeEach
    void setUp() {
        userAccountRepository.deleteAll();
        sellerAccountRepository.deleteAll();
    }

    @Test
    void 일반_유저_등록_테스트() {
        UserAccount fixture = UserAccountFixture.get();

        UserAccount saved = userAccountRepository.save(fixture);

        assertNotNull(saved.getId());
        assertEquals(fixture, saved);
    }

    @Test
    void 판매자_유저_등록_테스트() {
        SellerAccount fixture = SellerAccountFixture.get();

        SellerAccount saved = sellerAccountRepository.save(fixture);

        assertNotNull(saved.getId());
        assertEquals(fixture, saved);
    }
}