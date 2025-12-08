package com.project.onlineportal.config;

import com.project.onlineportal.entity.User;
import com.project.onlineportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // If admin already exists, stop
        if (userRepository.existsByUsername("admin")) {
            return;
        }

        // Otherwise create new admin
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@gmail.com");
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setRole("ADMIN");
        admin.setPassword(passwordEncoder.encode("admin123")); // default admin password

        userRepository.save(admin);

        System.out.println("✔ ADMIN CREATED → username: admin | password: admin123");
    }
}
