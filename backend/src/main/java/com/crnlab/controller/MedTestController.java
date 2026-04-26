package com.crnlab.controller;

import com.crnlab.dto.medtest.MedTestResponse;
import com.crnlab.service.MedTestService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/med-tests")
@RequiredArgsConstructor
public class MedTestController {

    private final MedTestService medTestService;

    @GetMapping
    public List<MedTestResponse> getAllMedTests() {
        return medTestService.getAllMedTests();
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return medTestService.getCategories();
    }
}
