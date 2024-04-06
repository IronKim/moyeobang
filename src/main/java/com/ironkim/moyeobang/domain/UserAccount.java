package com.ironkim.moyeobang.domain;

import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.domain.converter.PreferenceTypesConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SQLDelete(sql = "UPDATE user_account SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
public class UserAccount extends Account {

    private String profileImage;
    @Column(nullable = false, length = 20)
    private String profileName;
    @Column(length = 100)
    private String profileText;
    @Column(length = 1)
    private String gender;
    private LocalDate birthday;
    @Convert(converter = PreferenceTypesConverter.class)
    private Set<PreferenceType> preferenceTypes = new LinkedHashSet<>();

}