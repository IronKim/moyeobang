package com.ironkim.moyeobang.config.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ironkim.moyeobang.dto.AccountPrincipal;
import com.ironkim.moyeobang.util.JwtTokenUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final String key;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // get header
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(header == null || !header.startsWith("Bearer ")) {
            log.error("Error occurs while getting header. header is null or invalid");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String token = header.split(" ")[1].trim();

            if (JwtTokenUtils.isExpired(token, key)) {
                log.error("Key is expired");
                filterChain.doFilter(request, response);
                return;
            }

            String accountId = JwtTokenUtils.getAccountId(token, key);
            List<String> roles = JwtTokenUtils.getRoles(token, key);
            
            AccountPrincipal principal = new AccountPrincipal(accountId, roles);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            		principal, null, principal.getAuthorities()
            );
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // WebAuthenticationDetailsSource를 통해 HttpServletRequest 객체를 이용해 WebAuthenticationDetails 객체를 생성한다.
            SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContextHolder에 인증 정보를 저장한다. 이후 필요한 곳에서 SecurityContextHolder를 통해 인증 정보를 가져올 수 있다.
        }catch (RuntimeException e) {
            log.error("Error occurs while validating. {}", e.toString());
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);

    }
}
