package com.ironkim.moyeobang.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class FourteenYearsOrOlderValidator implements ConstraintValidator<FourteenYearsOrOlder, LocalDate> {

    private boolean nullable;

    @Override
    public void initialize(FourteenYearsOrOlder constraintAnnotation) {
        this.nullable = constraintAnnotation.nullable();
    }

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if(nullable && (value == null)) {
            return true;
        }

        if(value == null) {
            return false;
        }

        return value.isBefore(LocalDate.now().minusYears(14));
    }
}