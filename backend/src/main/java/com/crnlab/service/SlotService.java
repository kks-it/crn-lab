package com.crnlab.service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SlotService {

    private static final DateTimeFormatter DISPLAY_FORMAT = DateTimeFormatter.ofPattern("hh:mm a");

    public List<String> getDailySlots() {
        List<String> slots = new ArrayList<>();
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(21, 0);

        while (start.isBefore(end)) {
            LocalTime slotEnd = start.plusHours(2);
            slots.add(start.format(DISPLAY_FORMAT) + " - " + slotEnd.format(DISPLAY_FORMAT));
            start = slotEnd;
        }

        return slots;
    }
}
