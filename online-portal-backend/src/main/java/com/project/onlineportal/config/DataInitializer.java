package com.project.onlineportal.config;

import com.project.onlineportal.entity.User;
import com.project.onlineportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Initialize default admin user on application startup
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Create default admin user if it doesn't exist
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@onlineportal.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setFirstName("System");
                admin.setLastName("Administrator");
                admin.setRole("ADMIN");
                admin.setCreatedAt(LocalDateTime.now());
                admin.setUpdatedAt(LocalDateTime.now());
                
                userRepository.save(admin);
                System.out.println("✓ Admin user created - Username: admin, Password: admin123");
            } else {
                System.out.println("✓ Admin user already exists");
            }
        } catch (Exception e) {
            System.err.println("Error during data initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
