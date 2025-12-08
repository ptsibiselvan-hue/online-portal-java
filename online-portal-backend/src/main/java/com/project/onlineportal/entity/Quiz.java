package com.project.onlineportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "quizzes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "max_marks", nullable = false)
    private Integer maxMarks;

    @Column(name = "passing_marks", nullable = false)
    private Integer passingMarks;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions = 0;

    // ✅ VERY IMPORTANT FIX — prevents infinite JSON loop
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"quizzes", "hibernateLazyInitializer", "handler"})
    private Category category;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
