package com.project.onlineportal.controller;

import com.project.onlineportal.entity.Question;
import com.project.onlineportal.entity.Quiz;
import com.project.onlineportal.repository.QuestionRepository;
import com.project.onlineportal.repository.QuizRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    // ✅ GET QUESTIONS BY QUIZ
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getByQuiz(@PathVariable Long quizId) {
        List<Question> list = questionRepository.findByQuiz_Id(quizId);
        return ResponseEntity.ok(list);
    }

    // ✅ GET QUESTION BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        Question question = questionRepository.findById(id).orElse(null);

        if (question == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
        }

        return ResponseEntity.ok(question);
    }

    // ✅ CREATE QUESTION
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Question question) {

        if (question.getQuiz() == null || question.getQuiz().getId() == null) {
            return ResponseEntity.badRequest().body("Quiz ID is required");
        }

        Quiz quiz = quizRepository.findById(question.getQuiz().getId()).orElse(null);

        if (quiz == null) {
            return ResponseEntity.badRequest().body("Quiz not found");
        }

        question.setQuiz(quiz);

        Question saved = questionRepository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ UPDATE QUESTION
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Question updated) {

        Question question = questionRepository.findById(id).orElse(null);

        if (question == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
        }

        question.setQuestionText(updated.getQuestionText());
        question.setOptionA(updated.getOptionA());
        question.setOptionB(updated.getOptionB());
        question.setOptionC(updated.getOptionC());
        question.setOptionD(updated.getOptionD());
        question.setCorrectAnswer(updated.getCorrectAnswer());
        question.setMarks(updated.getMarks());

        Question saved = questionRepository.save(question);
        return ResponseEntity.ok(saved);
    }

    // ✅ DELETE QUESTION
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        Question question = questionRepository.findById(id).orElse(null);

        if (question == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
        }

        questionRepository.delete(question);
        return ResponseEntity.ok("Question deleted");
    }
}
