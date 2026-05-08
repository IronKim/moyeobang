package com.ironkim.moyeobang.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.Theme;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
    List<Theme> findAllByStore_Id(Long storeId);

    Optional<Theme> findByIdAndStore_Id(Long themeId, Long storeId);
}
