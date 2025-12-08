package com.project.onlineportal.controller;

import com.project.onlineportal.entity.QuizResult;
import com.project.onlineportal.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")  // final URL: /api/results/**
public class UserResultController {

    @Autowired
    private QuizResultRepository quizResultRepository;

    // ✔ Get results for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuizResult>> getUserResults(@PathVariable Long userId) {
        List<QuizResult> results = quizResultRepository.findByUser_Id(userId);
        return ResponseEntity.ok(results);
    }
}
