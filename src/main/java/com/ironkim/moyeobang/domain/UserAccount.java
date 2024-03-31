package com.ironkim.moyeobang.domain;

import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.domain.constant.RoleType;
import com.ironkim.moyeobang.domain.converter.PreferenceTypesConverter;
import com.ironkim.moyeobang.dto.request.UserJoinRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    @Column(length = 1)
    private Character gender;
    @Column(nullable = false, length = 20)
    private String nickname;
    private String profileImage;
    private String profileText;
    @Convert(converter = PreferenceTypesConverter.class)
    private Set<PreferenceType> preferenceTypes = new LinkedHashSet<>();

}
