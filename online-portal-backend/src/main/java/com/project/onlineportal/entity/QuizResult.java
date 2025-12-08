package com.project.onlineportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✨ User who attempted the quiz
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ✨ Quiz attempted
    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(nullable = false)
    private Integer obtainedMarks;

    @Column(nullable = false)
    private Integer totalMarks;

    @Column(nullable = false)
    private Double percentage;

    @Column(nullable = false)
    private Boolean passed;

    @Column(name = "attempted_at")
    private LocalDateTime attemptedAt;

    // Store user's answers as a transient field (not persisted to DB for now)
    @Transient
    private Map<String, String> answers;

    @PrePersist
    protected void onCreate() {
        attemptedAt = LocalDateTime.now();
    }
}
