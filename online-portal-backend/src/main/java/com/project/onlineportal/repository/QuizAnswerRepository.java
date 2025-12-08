package com.project.onlineportal.repository;

import com.project.onlineportal.entity.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Long> {
    List<QuizAnswer> findByResult_Id(Long resultId);
}
