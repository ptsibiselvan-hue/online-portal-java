package com.project.onlineportal.controller;

import com.project.onlineportal.entity.QuizAnswer;
import com.project.onlineportal.entity.QuizResult;
import com.project.onlineportal.repository.QuizAnswerRepository;
import com.project.onlineportal.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/results")
@CrossOrigin(origins = "*")
public class AdminResultController {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private QuizAnswerRepository quizAnswerRepository;

    // 1️⃣ All results
    @GetMapping
    public ResponseEntity<?> getAllResults() {
        List<QuizResult> list = quizResultRepository.findAll();
        return ResponseEntity.ok(list);
    }

    // 2️⃣ Results by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        List<QuizResult> list = quizResultRepository.findByUser_Id(userId);
        return ResponseEntity.ok(list);
    }

    // 3️⃣ Results by quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getByQuiz(@PathVariable Long quizId) {
        List<QuizResult> list = quizResultRepository.findByQuiz_Id(quizId);
        return ResponseEntity.ok(list);
    }

    // 4️⃣ Full details of one result
    @GetMapping("/detail/{resultId}")
    public ResponseEntity<?> getDetail(@PathVariable Long resultId) {

        QuizResult result = quizResultRepository.findById(resultId).orElse(null);
        if (result == null) {
            return ResponseEntity.badRequest().body("Result not found");
        }

        List<QuizAnswer> answers = quizAnswerRepository.findByResult_Id(resultId);

        Map<String, Object> response = new HashMap<>();
        response.put("result", result);
        response.put("answers", answers);

        return ResponseEntity.ok(response);
    }
}
