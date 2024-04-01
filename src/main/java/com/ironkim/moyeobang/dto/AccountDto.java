package com.ironkim.moyeobang.dto;

import com.ironkim.moyeobang.domain.Account;
import com.ironkim.moyeobang.domain.constant.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@AllArgsConstructor
public class AccountDto implements UserDetails {
    private Long id;
    private String accountId;
    private String password;
    private String name;
    private LocalDate birthday;
    private String phoneNumber;
    private String email;
    private RoleType roleType;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
    private LocalDateTime deletedAt;

    public static AccountDto fromAccount(Account account) {
        return new AccountDto(
                account.getId(),
                account.getAccountId(),
                account.getPassword(),
                account.getName(),
                account.getBirthday(),
                account.getPhoneNumber(),
                account.getEmail(),
                account.getRoleType(),
                account.getCreatedAt(),
                account.getCreatedBy(),
                account.getModifiedAt(),
                account.getModifiedBy(),
                account.getDeletedAt()
        );
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.getRoleType().getName()));
    }

    @Override
    public String getUsername() {
        return this.accountId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.deletedAt == null;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.deletedAt == null;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.deletedAt == null;
    }

    @Override
    public boolean isEnabled() {
        return this.deletedAt == null;
    }
}
