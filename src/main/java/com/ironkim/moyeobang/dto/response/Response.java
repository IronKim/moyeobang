package com.ironkim.moyeobang.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Response<T> {

    private String resultCode;
    private String message;
    private T result;

    public static Response<Void> error(String errorCode, String message) {
        return new Response<>(errorCode, message, null);
    }

    public static Response<Void> success() {
        return new Response<Void>("SUCCESS", null, null);
    }

    public static <T> Response<T> success(T result) {
        return new Response<>("SUCCESS", null, result);
    }
    public static <T> Response<T> success(T result, String message) {
        return new Response<>("SUCCESS", message, result);
    }

    public String toStream() {
        if(result == null) {
            return "{" +
                    "\"resultCode\":" + "\"" + resultCode + "\"," +
                    "\"message\":" + "\"" + message + "\"," +
                    "\"result\":" + null + "}";
        }

        return "{" +
                "\"resultCode\":" + "\"" + resultCode + "\"," +
                "\"message\":" + "\"" + message + "\"," +
                "\"result\":" + "\"" + result + "\"" + "}";
    }
}
