package com.crnlab.dto.booking;

import com.crnlab.enums.BookingType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record BookingRequest(
    @NotEmpty(message = "Select at least one medical test")
    List<Long> medTestIds,

    @NotNull(message = "Booking type is required")
    BookingType bookingType,

    @NotBlank(message = "Mobile number is required")
    String mobileNumber,

    @NotBlank(message = "Full address is required")
    String fullAddress,

    @FutureOrPresent(message = "Booking date cannot be in the past")
    @NotNull(message = "Booking date is required")
    LocalDate bookingDate,

    @NotBlank(message = "Time slot is required")
    String timeSlot,

    String additionalMessage,
    String currentLocation
) {
}
