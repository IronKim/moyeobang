package com.ironkim.moyeobang.validator;

import org.springframework.stereotype.Component;

import com.ironkim.moyeobang.domain.Store;
import com.ironkim.moyeobang.exception.ErrorCode;
import com.ironkim.moyeobang.exception.MoyeobangApplicationException;

/**
 * 스토어에 대한 접근 권한을 검증하는 컴포넌트.
 * 향후 스태프(STAFF) 등의 역할이 추가될 경우 이 클래스에서 확장합니다.
 */
@Component
public class StorePermissionValidator {

    /**
     * 주어진 accountId가 해당 스토어의 소유자인지 검증합니다.
     * 검증 실패 시 {@link MoyeobangApplicationException}을 던집니다.
     */
    public void validateOwner(Store store, String accountId) {
        if (!store.getAccount().getAccountId().equals(accountId)) {
            throw new MoyeobangApplicationException(
                    ErrorCode.INVALID_PERMISSION,
                    "해당 스토어에 대한 권한이 없습니다.");
        }
    }
}
