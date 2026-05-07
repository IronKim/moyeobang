package com.ironkim.moyeobang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.StoreContact;

public interface StoreContactRepository extends JpaRepository<StoreContact, Long> {
    List<StoreContact> findAllByStore_Id(Long storeId);
}
