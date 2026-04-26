package com.crnlab.repository;

import com.crnlab.entity.Booking;
import com.crnlab.entity.User;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByUserOrderByCreatedAtDesc(User user);
    long countByBookingDateAndTimeSlot(LocalDate bookingDate, String timeSlot);
}
