package com.ironkim.moyeobang.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PricePolicy extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @Column(length = 100, nullable = false)
    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer dayOfWeek; // 비트마스크 (1: 월, 2: 화, 4: 수, 8: 목, 16: 금, 32: 토, 64: 일)

    private LocalTime startTime;

    private LocalTime endTime;

    @Column(nullable = false)
    private Integer priority; // 우선순위 (낮을수록 우선 적용)

    @Column(nullable = false)
    private Boolean active;

    @Builder.Default
    @OneToMany(mappedBy = "pricePolicy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PriceDetail> priceDetailList = new ArrayList<>();
}
