package com.ironkim.moyeobang.domain;

import java.time.LocalDateTime;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@MappedSuperclass
public abstract class SoftDeletableEntity extends BaseEntity {
	
    protected LocalDateTime deletedAt;
}
