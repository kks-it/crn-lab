package com.crnlab.service;

import com.crnlab.dto.medtest.MedTestResponse;
import com.crnlab.entity.MedTest;
import com.crnlab.repository.MedTestRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedTestService {

    private final MedTestRepository medTestRepository;

    public List<MedTestResponse> getAllMedTests() {
        return medTestRepository.findAllByOrderByCategoryAscNameAsc()
            .stream()
            .map(this::toResponse)
            .toList();
    }

    public List<String> getCategories() {
        return medTestRepository.findAllByOrderByCategoryAscNameAsc()
            .stream()
            .map(MedTest::getCategory)
            .distinct()
            .toList();
    }

    public MedTestResponse toResponse(MedTest medTest) {
        return new MedTestResponse(
            medTest.getId(),
            medTest.getName(),
            medTest.getPrice(),
            medTest.getCategory(),
            medTest.getSpecialInstructions()
        );
    }
}
