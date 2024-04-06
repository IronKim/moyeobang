package com.ironkim.moyeobang.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GenderCheckValidator implements ConstraintValidator<GenderCheck, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        return value.equals("M") || value.equals("F");
    }
}