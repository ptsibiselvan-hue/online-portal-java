package com.project.onlineportal.controller;

import com.project.onlineportal.entity.Category;
import com.project.onlineportal.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {

        Category category = categoryRepository.findById(id).orElse(null);

        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        }

        return ResponseEntity.ok(category);
    }

    // ADD NEW
    @PostMapping
    public ResponseEntity<?> addCategory(@RequestBody Category category) {

        if (category.getName() == null || category.getName().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category name is required");
        }

        Category saved = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {

        Category category = categoryRepository.findById(id).orElse(null);

        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        }

        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());

        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {

        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        }

        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Category deleted successfully");
    }
}
