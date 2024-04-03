package com.ironkim.moyeobang.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class FourteenYearsOrOlderValidator implements ConstraintValidator<FourteenYearsOrOlder, LocalDate> {

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        return value.isBefore(LocalDate.now().minusYears(14));
    }
}