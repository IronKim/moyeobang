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
    private LocalDate birthday;
    private String phoneNumber;
    private String email;
    private RoleType roleType;
    private String gender;
    private String nickname;
    private String profileImage;
    private String profileText;
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
                userAccount.getBirthday(),
                userAccount.getPhoneNumber(),
                userAccount.getEmail(),
                userAccount.getRoleType(),
                userAccount.getGender(),
                userAccount.getNickname(),
                userAccount.getProfileImage(),
                userAccount.getProfileText(),
                userAccount.getPreferenceTypes(),
                userAccount.getCreatedAt(),
                userAccount.getCreatedBy(),
                userAccount.getModifiedAt(),
                userAccount.getModifiedBy(),
                userAccount.getDeletedAt()
        );
    }
}
