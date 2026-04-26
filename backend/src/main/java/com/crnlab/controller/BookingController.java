package com.crnlab.controller;

import com.crnlab.dto.booking.AvailableSlotsResponse;
import com.crnlab.dto.booking.BookingRequest;
import com.crnlab.dto.booking.BookingResponse;
import com.crnlab.entity.User;
import com.crnlab.service.BookingService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/slots")
    public AvailableSlotsResponse getAvailableSlots(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return new AvailableSlotsResponse(bookingService.getAvailableSlots(date));
    }

    @GetMapping("/my")
    public List<BookingResponse> myBookings(@AuthenticationPrincipal User user) {
        return bookingService.getBookingsForUser(user.getEmail());
    }

    @PostMapping
    public BookingResponse createBooking(
        @Valid @RequestBody BookingRequest request,
        @AuthenticationPrincipal User user
    ) {
        return bookingService.createBooking(request, user.getEmail());
    }
}
