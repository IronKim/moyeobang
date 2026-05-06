package com.ironkim.moyeobang.repository;

import com.ironkim.moyeobang.TestContainerSupport;
import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.fixture.AccountFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class RepositoryTest extends TestContainerSupport {

    @Autowired
    private AccountRepository accountRepository;

    @BeforeEach
    void setUp() {
        accountRepository.deleteAll();
    }

    @Test
    void 계정_등록_테스트() {
        Account fixture = AccountFixture.get();

        Account saved = accountRepository.save(fixture);

        assertNotNull(saved.getId());
        assertEquals(fixture, saved);
    }
}