package com.ironkim.moyeobang.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.ReportAsSingleViolation;

import java.lang.annotation.*;

@Inherited
@Documented
@Constraint(validatedBy = GenderCheckValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@ReportAsSingleViolation
public @interface GenderCheck {
    String message() default "M or F 또는 null 이어야 합니다";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
