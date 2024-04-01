package com.ironkim.moyeobang.repository;

import com.ironkim.moyeobang.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByAccountId(String accountId);
}
