package com.ironkim.moyeobang.validator;

import com.ironkim.moyeobang.domain.constant.Gender;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GenderCheckValidator implements ConstraintValidator<GenderCheck, Gender> {

    @Override
    public boolean isValid(Gender value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        return value == Gender.M || value == Gender.F;
    }
}