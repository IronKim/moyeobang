package com.ironkim.moyeobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.ThemeGenre;

public interface ThemeGenreRepository extends JpaRepository<ThemeGenre, Long> {
    void deleteAllByTheme_Id(Long themeId);
}
