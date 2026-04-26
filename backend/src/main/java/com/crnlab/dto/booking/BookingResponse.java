package com.crnlab.dto.booking;

import com.crnlab.dto.medtest.MedTestResponse;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record BookingResponse(
    Long id,
    String bookingType,
    String status,
    String mobileNumber,
    String fullAddress,
    String currentLocation,
    LocalDate bookingDate,
    String timeSlot,
    String additionalMessage,
    BigDecimal totalPrice,
    LocalDateTime createdAt,
    List<MedTestResponse> medTests,
    List<String> specialInstructions
) {
}
