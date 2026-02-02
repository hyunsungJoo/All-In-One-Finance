package com.example.demo.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long expMillis;

    public JwtUtil(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.exp-minutes}") long expMinutes
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expMillis = expMinutes * 60_000L;
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expMillis);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(exp)
                .signWith(key)
                .compact();
    }

    public String validateAndGetEmail(String token) {
        JwtParser parser = Jwts.parser().verifyWith((javax.crypto.SecretKey) key).build();
        Jws<Claims> jws = parser.parseSignedClaims(token);
        return jws.getPayload().getSubject();
    }
}
