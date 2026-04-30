package com.ironkim.moyeobang.domain;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@SQLDelete(sql = "UPDATE theme SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
public class Theme extends SoftDeletableEntity {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer minHeadcount;
    
    @Column(nullable = false)
    private Integer maxHeadcount;

    @Column(nullable = false)
    private Integer playTime;
    
    @Column(nullable = false)
    private Integer difficultyLevel;
    
    @Column(name = "fear_level")
    private Integer fearLevel;
    
    @Column(name = "activity_level")
    private Integer activityLevel;
    
    @OneToMany(mappedBy = "theme", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ThemeGenre> themeGenreList = new ArrayList<>();
}
