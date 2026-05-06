package com.ironkim.moyeobang.repository;

import com.ironkim.moyeobang.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    List<Genre> findAllByNameIn(Set<com.ironkim.moyeobang.domain.constant.Genre> names);
}