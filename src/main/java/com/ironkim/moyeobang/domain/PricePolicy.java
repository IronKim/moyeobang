package com.ironkim.moyeobang.domain;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PricePolicy extends BaseEntity {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="store_id", nullable = false)
    private Store store;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="theme_id")
    private Theme theme;

    @Column(length=100, nullable = false)
    private String name;

    private LocalDate startDate;

    private LocalDate endDate;
    
    private Integer dayOfWeek; // 비트마스크 (1: 월, 2: 화, 4: 수, 8: 목, 16: 금, 32: 토, 64: 일)

    private LocalTime startTime;

    private LocalTime endTime;
    
    @Column(nullable = false)
    private Boolean isAllDay;
    
    @Column(nullable = false)
    private Integer priority; // 우선순위 (낮을수록 우선 적용)
    
    @Column(nullable = false)
    private Boolean active;
}
