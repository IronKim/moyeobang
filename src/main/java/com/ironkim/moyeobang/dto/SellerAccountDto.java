package com.ironkim.moyeobang.dto;

import com.ironkim.moyeobang.domain.SellerAccount;
import com.ironkim.moyeobang.domain.constant.RoleType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerAccountDto {

    private Long id;
    private String accountId;
    private String password;
    private String name;
    private LocalDate birthday;
    private String phoneNumber;
    private String email;
    private RoleType roleType;
    private String businessName;
    private String businessNumber;
    private String authStatus;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
    private LocalDateTime deletedAt;

    public static SellerAccountDto fromSellerAccount(SellerAccount sellerAccount) {
        return new SellerAccountDto(
                sellerAccount.getId(),
                sellerAccount.getAccountId(),
                sellerAccount.getPassword(),
                sellerAccount.getName(),
                sellerAccount.getBirthday(),
                sellerAccount.getPhoneNumber(),
                sellerAccount.getEmail(),
                sellerAccount.getRoleType(),
                sellerAccount.getBusinessName(),
                sellerAccount.getBusinessNumber(),
                sellerAccount.getAuthStatus(),
                sellerAccount.getCreatedAt(),
                sellerAccount.getCreatedBy(),
                sellerAccount.getModifiedAt(),
                sellerAccount.getModifiedBy(),
                sellerAccount.getDeletedAt()
        );
    }
}
