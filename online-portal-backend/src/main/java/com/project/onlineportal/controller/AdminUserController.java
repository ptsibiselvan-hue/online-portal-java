package com.project.onlineportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.onlineportal.entity.User;
import com.project.onlineportal.repository.UserRepository;

@RestController
@RequestMapping("/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User u = userRepository.findById(id).orElse(null);
        if (u == null) return ResponseEntity.badRequest().body("User not found");
        return ResponseEntity.ok(u);
    }
}
