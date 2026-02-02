package com.example.demo.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public record SignupRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}

    @PostMapping("/signup")
    public Map<String, Object> signup(@Valid @RequestBody SignupRequest req) {
        if (repo.existsByEmail(req.email())) {
            return Map.of("ok", false, "message", "email already exists");
        }
        repo.save(new User(req.email(), encoder.encode(req.password())));
        return Map.of("ok", true);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@Valid @RequestBody LoginRequest req) {
        User user = repo.findByEmail(req.email())
                .orElseThrow(() -> new RuntimeException("invalid credentials"));

        if (!encoder.matches(req.password(), user.getPasswordHash())) {
            throw new RuntimeException("invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return Map.of("ok", true, "token", token);
    }
}
