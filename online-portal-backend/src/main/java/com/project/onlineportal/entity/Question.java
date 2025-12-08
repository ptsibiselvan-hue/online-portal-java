package com.project.onlineportal.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    @JsonIgnoreProperties({"questions", "category"})
    private Quiz quiz;

    @Column(nullable = false)
    private Integer marks;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionA;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionB;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionC;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionD;

    @Column(nullable = false)
    private String correctAnswer;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
