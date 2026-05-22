package com.ironkim.moyeobang.domain;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class BaseEntity {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    protected LocalDateTime createdAt;

    @CreatedBy
    @Column(nullable = false, updatable = false, length = 20)
    protected String createdBy;

    @LastModifiedDate
    @Column(nullable = false)
    protected LocalDateTime modifiedAt;

    @LastModifiedBy
    @Column(nullable = false, length = 20)
    protected String modifiedBy;

    @PrePersist
    @PreUpdate
    public void trimFields() {
        Class<?> current = this.getClass();

        while (current != null && current != Object.class) {
            for (Field field : current.getDeclaredFields()) {
                if (field.getType() != String.class) {
                    continue;
                }

                int modifiers = field.getModifiers();
                if (Modifier.isStatic(modifiers) || Modifier.isFinal(modifiers)) {
                    continue;
                }

                try {
                    field.setAccessible(true);
                    String value = (String) field.get(this);
                    if (value != null) {
                        field.set(this, value.trim());
                    }
                } catch (IllegalAccessException e) {
                    throw new IllegalStateException("Failed to trim string fields", e);
                }
            }

            current = current.getSuperclass();
        }
    }
}
