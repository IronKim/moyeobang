package com.ironkim.moyeobang.domain;

import com.ironkim.moyeobang.domain.constant.RoleType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@ToString(callSuper = true)
@MappedSuperclass
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public abstract class Account extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(unique = true, nullable = false, length = 20)
    protected String accountId;

    @Column(nullable = false)
    protected String password;

    @Column(nullable = false, length = 20)
    protected String name;

    @Column(nullable = false)
    protected LocalDate birthday;

    @Column(nullable = false, length = 20)
    protected String phoneNumber;

    @Column(nullable = false, length = 50)
    protected String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    protected RoleType roleType;

}
