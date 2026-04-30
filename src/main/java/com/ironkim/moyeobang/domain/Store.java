package com.ironkim.moyeobang.domain;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.ironkim.moyeobang.domain.constant.AuthStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@SQLDelete(sql = "UPDATE store SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
public class Store extends SoftDeletableEntity {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(length = 50, nullable = false)
    private String businessName;
    
    @Column(length = 10, nullable = false)
    private String businessNumber;
    
    @Column(length = 20)
    private String branchName;
    
    @Column(length = 255, nullable = false)
    private String address;
    
    @Column(length = 50)
    private String addressDetail;
    
    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private AuthStatus authStatus;
    
    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Theme> themeList = new ArrayList<>();
}
