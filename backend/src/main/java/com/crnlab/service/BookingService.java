package com.crnlab.service;

import com.crnlab.dto.booking.BookingRequest;
import com.crnlab.dto.booking.BookingResponse;
import com.crnlab.dto.medtest.MedTestResponse;
import com.crnlab.entity.Booking;
import com.crnlab.entity.MedTest;
import com.crnlab.entity.User;
import com.crnlab.enums.BookingStatus;
import com.crnlab.enums.BookingType;
import com.crnlab.repository.BookingRepository;
import com.crnlab.repository.MedTestRepository;
import com.crnlab.repository.UserRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final MedTestRepository medTestRepository;
    private final UserRepository userRepository;
    private final MedTestService medTestService;
    private final SlotService slotService;

    public List<String> getAvailableSlots(LocalDate bookingDate) {
        return slotService.getDailySlots();
    }

    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        validateSlot(request.timeSlot());
        validateHomeCollectionLocation(request.bookingType(), request.currentLocation());

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<MedTest> medTests = medTestRepository.findAllById(request.medTestIds());
        if (medTests.size() != request.medTestIds().size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "One or more selected medical tests are invalid");
        }

        BigDecimal totalPrice = medTests.stream()
            .map(MedTest::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Booking booking = bookingRepository.save(
            Booking.builder()
                .user(user)
                .medTests(medTests)
                .bookingType(request.bookingType())
                .status(BookingStatus.CONFIRMED)
                .mobileNumber(request.mobileNumber().trim())
                .fullAddress(request.fullAddress().trim())
                .currentLocation(blankToNull(request.currentLocation()))
                .bookingDate(request.bookingDate())
                .timeSlot(request.timeSlot())
                .additionalMessage(blankToNull(request.additionalMessage()))
                .totalPrice(totalPrice)
                .build()
        );

        return toResponse(booking);
    }

    public List<BookingResponse> getBookingsForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return bookingRepository.findAllByUserOrderByCreatedAtDesc(user)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    private void validateSlot(String slot) {
        if (!slotService.getDailySlots().contains(slot)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected slot is invalid");
        }
    }

    private void validateHomeCollectionLocation(BookingType bookingType, String currentLocation) {
        if (bookingType == BookingType.HOME_COLLECTION && blankToNull(currentLocation) == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Home collection requires the current location placeholder to be filled"
            );
        }
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private BookingResponse toResponse(Booking booking) {
        List<MedTestResponse> medTests = booking.getMedTests()
            .stream()
            .map(medTestService::toResponse)
            .toList();

        Set<String> specialInstructions = new LinkedHashSet<>();
        booking.getMedTests().forEach(medTest -> specialInstructions.add(medTest.getSpecialInstructions()));

        return new BookingResponse(
            booking.getId(),
            booking.getBookingType().name(),
            booking.getStatus().name(),
            booking.getMobileNumber(),
            booking.getFullAddress(),
            booking.getCurrentLocation(),
            booking.getBookingDate(),
            booking.getTimeSlot(),
            booking.getAdditionalMessage(),
            booking.getTotalPrice(),
            booking.getCreatedAt(),
            medTests,
            List.copyOf(specialInstructions)
        );
    }
}
