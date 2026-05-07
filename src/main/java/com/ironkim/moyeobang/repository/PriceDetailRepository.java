package com.ironkim.moyeobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.PriceDetail;

public interface PriceDetailRepository extends JpaRepository<PriceDetail, Long> {
    void deleteAllByPricePolicy_Id(Long policyId);
}
