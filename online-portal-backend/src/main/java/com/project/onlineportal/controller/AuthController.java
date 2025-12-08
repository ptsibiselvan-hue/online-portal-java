package com.project.onlineportal.controller;

import com.project.onlineportal.dto.LoginRequest;
import com.project.onlineportal.dto.RegisterRequest;
import com.project.onlineportal.entity.User;
import com.project.onlineportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ======================
    // REGISTER
    // ======================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (req.getUsername() == null || req.getEmail() == null || req.getPassword() == null
                || req.getFirstName() == null || req.getLastName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields");
        }

        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        // default role should be STUDENT (some existing accounts used 'USER')
        user.setRole("STUDENT");

        User saved = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ======================
    // LOGIN
    // ======================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        if (req.getUsername() == null || req.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing username or password");
        }

        User user = userRepository.findByUsername(req.getUsername()).orElse(null);

        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("user", user);
        response.put("token", "Bearer " + user.getId() + "-" + user.getUsername());

        return ResponseEntity.ok(response);
    }

    // ======================
    // GET PROFILE
    // ======================
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(user);
    }

    // ======================
    // UPDATE PROFILE
    // ======================
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (updatedUser.getFirstName() != null)
            user.setFirstName(updatedUser.getFirstName());

        if (updatedUser.getLastName() != null)
            user.setLastName(updatedUser.getLastName());

        if (updatedUser.getEmail() != null) {
            if (!updatedUser.getEmail().equals(user.getEmail()) &&
                 userRepository.existsByEmail(updatedUser.getEmail())) {
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
            }
            user.setEmail(updatedUser.getEmail());
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }
}
