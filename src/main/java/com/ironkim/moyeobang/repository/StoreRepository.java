package com.ironkim.moyeobang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
    boolean existsByBusinessNumber(String businessNumber);

    List<Store> findAllByAccount_AccountId(String accountId);
}
