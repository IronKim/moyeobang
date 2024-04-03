package com.ironkim.moyeobang.exception;

import com.ironkim.moyeobang.dto.response.Response;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(MoyeobangApplicationException.class)
    public ResponseEntity<?> applicationHandler(MoyeobangApplicationException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getStatus())
                .body(Response.error(e.getErrorCode().name()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> applicationHandler(ConstraintViolationException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Response.error(ErrorCode.BAD_REQUEST.name()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> applicationHandler(MethodArgumentNotValidException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Response.error(ErrorCode.BAD_REQUEST.name()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> applicationHandler(RuntimeException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Response.error(ErrorCode.INTERNAL_SERVER_ERROR.name()));
    }
}
