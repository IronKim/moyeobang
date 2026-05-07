package com.ironkim.moyeobang.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.PricePolicy;

public interface PricePolicyRepository extends JpaRepository<PricePolicy, Long> {
    List<PricePolicy> findAllByStore_Id(Long storeId);

    Optional<PricePolicy> findByIdAndStore_Id(Long policyId, Long storeId);
}
