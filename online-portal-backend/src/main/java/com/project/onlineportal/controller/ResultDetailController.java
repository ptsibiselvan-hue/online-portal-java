package com.project.onlineportal.controller;

import com.project.onlineportal.entity.QuizResult;
import com.project.onlineportal.entity.Question;
import com.project.onlineportal.repository.QuizResultRepository;
import com.project.onlineportal.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/results")
public class ResultDetailController {

    @Autowired
    private QuizResultRepository quizResultRepo;

    @Autowired
    private QuestionRepository questionRepo;

    // ================================
    // GET DETAILED RESULT BY RESULT ID
    // ================================
    @GetMapping("/detail/{resultId}")
    public ResponseEntity<?> getResultDetails(@PathVariable Long resultId) {

        QuizResult result = quizResultRepo.findById(resultId).orElse(null);

        if (result == null) {
            return ResponseEntity.status(404).body("Result not found");
        }

        // Fetch all questions for this quiz
        List<Question> questions = questionRepo.findByQuiz_Id(result.getQuiz().getId());

        // Build answers array with user's answers and correct answers
        List<Map<String, Object>> answers = new ArrayList<>();
        
        if (result.getAnswers() != null) {
            for (Question q : questions) {
                Map<String, Object> answerItem = new HashMap<>();
                answerItem.put("id", q.getId());
                answerItem.put("question", q);
                answerItem.put("userAnswer", result.getAnswers().getOrDefault(String.valueOf(q.getId()), null));
                answerItem.put("correctAnswer", q.getCorrectAnswer());
                
                // Calculate marks awarded
                String userAnswer = result.getAnswers().getOrDefault(String.valueOf(q.getId()), null);
                int marksAwarded = (userAnswer != null && userAnswer.equals(q.getCorrectAnswer())) ? q.getMarks() : 0;
                answerItem.put("marksAwarded", marksAwarded);
                
                answers.add(answerItem);
            }
        } else {
            // If no answers stored, create empty answer items
            for (Question q : questions) {
                Map<String, Object> answerItem = new HashMap<>();
                answerItem.put("id", q.getId());
                answerItem.put("question", q);
                answerItem.put("userAnswer", null);
                answerItem.put("correctAnswer", q.getCorrectAnswer());
                answerItem.put("marksAwarded", 0);
                answers.add(answerItem);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("result", result);
        response.put("answers", answers);

        return ResponseEntity.ok(response);
    }
}
