package com.crnlab.repository;

import com.crnlab.entity.MedTest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedTestRepository extends JpaRepository<MedTest, Long> {
    List<MedTest> findAllByOrderByCategoryAscNameAsc();
}
