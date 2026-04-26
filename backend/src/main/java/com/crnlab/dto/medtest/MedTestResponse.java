package com.crnlab.dto.medtest;

import java.math.BigDecimal;

public record MedTestResponse(
    Long id,
    String name,
    BigDecimal price,
    String category,
    String specialInstructions
) {
}
