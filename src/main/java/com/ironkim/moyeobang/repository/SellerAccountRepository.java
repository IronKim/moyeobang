package com.ironkim.moyeobang.repository;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerAccountRepository extends JpaRepository<SellerAccount, Long> {
    Optional<SellerAccount> findByAccountId(String accountId);
}
