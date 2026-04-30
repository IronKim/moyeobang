package com.ironkim.moyeobang.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountId(String accountId);
}
