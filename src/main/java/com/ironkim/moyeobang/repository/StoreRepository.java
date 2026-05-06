package com.ironkim.moyeobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
	boolean existsByBusinessNumber(String businessNumber);
}
