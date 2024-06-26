package com.ironkim.moyeobang.dto;

import com.ironkim.moyeobang.domain.UserAccount;
import com.ironkim.moyeobang.domain.constant.PreferenceType;
import com.ironkim.moyeobang.domain.constant.RoleType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountDto {

    private Long id;
    private String accountId;
    private String password;
    private String name;
    private String phoneNumber;
    private String email;
    private RoleType roleType;
    private String profileImage;
    private String prifileName;
    private String profileText;
    private String gender;
    private LocalDate birthday;
    private Set<PreferenceType> preferenceTypes;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
    private LocalDateTime deletedAt;

    public static UserAccountDto fromUserAccount(UserAccount userAccount) {
        return new UserAccountDto(
                userAccount.getId(),
                userAccount.getAccountId(),
                userAccount.getPassword(),
                userAccount.getName(),
                userAccount.getPhoneNumber(),
                userAccount.getEmail(),
                userAccount.getRoleType(),
                userAccount.getProfileImage(),
                userAccount.getProfileName(),
                userAccount.getProfileText(),
                userAccount.getGender(),
                userAccount.getBirthday(),
                userAccount.getPreferenceTypes(),
                userAccount.getCreatedAt(),
                userAccount.getCreatedBy(),
                userAccount.getModifiedAt(),
                userAccount.getModifiedBy(),
                userAccount.getDeletedAt()
        );
    }
}
