package com.ironkim.moyeobang.util;

import com.ironkim.moyeobang.domain.constant.RoleType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtTokenUtils {
    public static String getAccountId(String token, String key) {
        return extractClaims(token, key).get("AccountId", String.class);
    }

    public static boolean isExpired(String token, String key) {
        Date expiredDate = extractClaims(token, key).getExpiration();
        return expiredDate.before(new Date());
    }

    private static Claims extractClaims(String token, String key) {
        return Jwts.parserBuilder().setSigningKey(getKey(key)).build().parseClaimsJws(token).getBody();
    }

    public static String generateToken(String accountId, RoleType roleType, String name, String key, long expiredTimeMs) {
        Claims claims = Jwts.claims();
        claims.put("AccountId", accountId);
        claims.put("RoleType", roleType);
        claims.put("Name", name);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredTimeMs))
                .signWith(getKey(key), SignatureAlgorithm.HS256)
                .compact();
    }

    private static Key getKey(String key) { // 키를 Key 객체로 변환하는 메서드
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8); // 키를 바이트 배열로 변환
        return Keys.hmacShaKeyFor(keyBytes); // 바이트 배열로 변환된 키를 Key 객체로 변환
    }
}
