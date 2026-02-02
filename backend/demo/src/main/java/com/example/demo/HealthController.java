package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "Spring is running";
    }

    @GetMapping("/api/health")
    public String health() {
        return "ok";
    }
}
