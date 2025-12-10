package com.appdev.arradazadelossantos.notenest.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.appdev.arradazadelossantos.notenest.Entity.User;
import com.appdev.arradazadelossantos.notenest.Repository.UserRepository;
import com.appdev.arradazadelossantos.notenest.Service.AuthService;
import com.appdev.arradazadelossantos.notenest.DTO.RegisterRequest;
import com.appdev.arradazadelossantos.notenest.DTO.LoginRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(Map.of(
                "success", false,
                "message", "Invalid credentials"
            ));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("userId", user.getUserId());   
        response.put("username", user.getUsername());

        return ResponseEntity.ok(response);
    }
}
