package com.courseplatform.course_api.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final SecretKey secretKey;
    private final long accessExpirationTime;
    private final long refreshExpirationTime;

    public JwtUtil(
            @Value("${app.jwt.secret:VGhpcy1pcy1hLWRlbW8tc2VjcmV0LWtleS10aGF0LW11c3QtYmUtc2FmZWx5LXJlcGxhY2VkLTEyMzQ1Njc4OTA=}") String secret,
            @Value("${app.jwt.access-expiration-ms:3600000}") long accessExpirationTime,
            @Value("${app.jwt.refresh-expiration-ms:604800000}") long refreshExpirationTime) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.accessExpirationTime = accessExpirationTime;
        this.refreshExpirationTime = refreshExpirationTime;
    }

    public String generateAccessToken(String email, String role) {
        return generateToken(email, role, "access", accessExpirationTime);
    }

    public String generateRefreshToken(String email, String role) {
        return generateToken(email, role, "refresh", refreshExpirationTime);
    }

    private String generateToken(String email, String role, String tokenType, long expirationTime) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .claim("tokenType", tokenType)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    public String extractTokenType(String token) {
        return getClaims(token).get("tokenType", String.class);
    }

    public boolean validateToken(String token, String email) {
        return extractEmail(token).equals(email) && !getClaims(token).getExpiration().before(new Date());
    }

    public boolean isRefreshToken(String token) {
        return "refresh".equalsIgnoreCase(extractTokenType(token));
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
