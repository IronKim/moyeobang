package com.ironkim.moyeobang.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SQLDelete(sql = "UPDATE seller_account SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
public class SellerAccount extends Account {
    @Column(nullable = false, length = 50)
    private String businessName;
    @Column(nullable = false, length = 10)
    private String businessNumber;
    @Column(nullable = false, length = 1)
    private String status;
}
