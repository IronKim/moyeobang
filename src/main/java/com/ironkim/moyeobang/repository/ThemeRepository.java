package com.ironkim.moyeobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ironkim.moyeobang.domain.Theme;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
}
