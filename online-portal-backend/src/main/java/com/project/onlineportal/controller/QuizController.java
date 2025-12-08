package com.project.onlineportal.controller;

import com.project.onlineportal.entity.Quiz;
import com.project.onlineportal.repository.CategoryRepository;
import com.project.onlineportal.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // 1️⃣ GET ALL QUIZZES
    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Quiz> list = quizRepository.findAll();
        return ResponseEntity.ok(list);
    }

    // 2️⃣ GET QUIZ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Quiz quiz = quizRepository.findById(id).orElse(null);

        if (quiz == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
        }

        return ResponseEntity.ok(quiz);
    }

    // 3️⃣ GET QUIZZES BY CATEGORY
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getByCategory(@PathVariable Long categoryId) {
        List<Quiz> list = quizRepository.findByCategory_Id(categoryId);
        return ResponseEntity.ok(list);
    }

    // 4️⃣ CREATE QUIZ
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Quiz quiz) {

        if (quiz.getCategory() == null || quiz.getCategory().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category ID is required");
        }

        // check category
        var category = categoryRepository.findById(quiz.getCategory().getId()).orElse(null);

        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category not found");
        }

        quiz.setCategory(category);
        quiz.setCreatedAt(LocalDateTime.now());

        Quiz saved = quizRepository.save(quiz);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 5️⃣ UPDATE QUIZ
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Quiz updated) {

        Quiz quiz = quizRepository.findById(id).orElse(null);

        if (quiz == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
        }

        quiz.setTitle(updated.getTitle());
        quiz.setDescription(updated.getDescription());
        quiz.setMaxMarks(updated.getMaxMarks());
        quiz.setPassingMarks(updated.getPassingMarks());
        quiz.setTotalQuestions(updated.getTotalQuestions());
        quiz.setUpdatedAt(LocalDateTime.now());

        // Update category if provided
        if (updated.getCategory() != null && updated.getCategory().getId() != null) {
            var category = categoryRepository.findById(updated.getCategory().getId()).orElse(null);
            if (category != null) {
                quiz.setCategory(category);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category not found");
            }
        }

        Quiz saved = quizRepository.save(quiz);
        return ResponseEntity.ok(saved);
    }

    // 6️⃣ DELETE QUIZ
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        Quiz quiz = quizRepository.findById(id).orElse(null);

        if (quiz == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
        }

        quizRepository.delete(quiz);

        return ResponseEntity.ok("Quiz deleted");
    }
}
