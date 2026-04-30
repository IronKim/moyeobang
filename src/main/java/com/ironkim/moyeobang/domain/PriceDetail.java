package com.ironkim.moyeobang.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"price_policy_id", "min_headcount", "max_headcount"}))
public class PriceDetail extends BaseEntity{
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable=false)
    private PricePolicy pricePolicy;

    @Column(nullable=false)
    private Integer minHeadcount;

    @Column(nullable=false)
    private Integer maxHeadcount;

    @Column(nullable=false)
    private Integer price;
}
