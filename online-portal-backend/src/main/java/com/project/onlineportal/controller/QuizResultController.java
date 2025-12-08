package com.project.onlineportal.controller;

import com.project.onlineportal.entity.Quiz;
import com.project.onlineportal.entity.QuizResult;
import com.project.onlineportal.entity.User;
import com.project.onlineportal.repository.QuizRepository;
import com.project.onlineportal.repository.QuizResultRepository;
import com.project.onlineportal.repository.UserRepository;
import com.project.onlineportal.repository.QuestionRepository;
import com.project.onlineportal.repository.QuizAnswerRepository;
import com.project.onlineportal.entity.Question;
import com.project.onlineportal.entity.QuizAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/results") // final: /api/results/**
public class QuizResultController {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAnswerRepository quizAnswerRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitResult(@RequestBody QuizResult resultData) {

        User user = userRepository.findById(resultData.getUser().getId()).orElse(null);
        Quiz quiz = quizRepository.findById(resultData.getQuiz().getId()).orElse(null);

        if (user == null || quiz == null) {
            return ResponseEntity.badRequest().body("Invalid user or quiz id");
        }

        // Prevent multiple attempts: user can attempt a quiz only once
        var existing = quizResultRepository.findByUser_Id(user.getId());
        for (QuizResult r : existing) {
            if (r.getQuiz().getId().equals(quiz.getId())) {
                return ResponseEntity.status(400).body("User has already attempted this quiz");
            }
        }

        QuizResult result = new QuizResult();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setObtainedMarks(resultData.getObtainedMarks());
        result.setTotalMarks(resultData.getTotalMarks());
        result.setPercentage(resultData.getPercentage());
        result.setPassed(resultData.getPassed());
        result.setAttemptedAt(LocalDateTime.now());

        quizResultRepository.save(result);

        // Save per-question answers (if provided)
        if (resultData.getAnswers() != null && !resultData.getAnswers().isEmpty()) {
            for (var entry : resultData.getAnswers().entrySet()) {
                String qidStr = entry.getKey();
                String userAnswer = entry.getValue();
                try {
                    Long qid = Long.valueOf(qidStr);
                    Question question = questionRepository.findById(qid).orElse(null);
                    if (question == null) continue;

                    // determine correct answer text or letter
                    String correct = question.getCorrectAnswer();
                    String correctText = correct;
                    if (correct != null) {
                        String c = correct.trim();
                        if (c.equalsIgnoreCase("A")) correctText = question.getOptionA();
                        else if (c.equalsIgnoreCase("B")) correctText = question.getOptionB();
                        else if (c.equalsIgnoreCase("C")) correctText = question.getOptionC();
                        else if (c.equalsIgnoreCase("D")) correctText = question.getOptionD();
                    }

                    int marksAwarded = 0;
                    if (userAnswer != null && correctText != null && userAnswer.equals(correctText)) {
                        marksAwarded = question.getMarks() != null ? question.getMarks() : 0;
                    }

                    QuizAnswer qa = new QuizAnswer();
                    qa.setResult(result);
                    qa.setQuestion(question);
                    qa.setUserAnswer(userAnswer);
                    qa.setCorrectAnswer(correctText);
                    qa.setMarksAwarded(marksAwarded);

                    quizAnswerRepository.save(qa);
                } catch (NumberFormatException ex) {
                    // skip invalid question id
                }
            }
        }

        return ResponseEntity.ok(result);
    }
}
