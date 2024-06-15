package com.kdu.ibe.controller;

import com.kdu.ibe.constants.DateFormatter;
import com.kdu.ibe.dto.request.RoomDetailsRequestDTO;
import com.kdu.ibe.dto.response.GetFilterRoomsWithSizeResponseDTO;
import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import com.kdu.ibe.exception.customExceptions.WrongDatesError;
import com.kdu.ibe.service.RoomDetailsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/v1")
public class RoomDetailsController {
    private final RoomDetailsService roomDetailsService;
    @Autowired
    public RoomDetailsController(RoomDetailsService roomDetailsService) {
        this.roomDetailsService = roomDetailsService;
    }

    private static final int MAXIMUM_STAY_DAYS = 14;
    private boolean isValidDateRange(String checkInDate, String checkOutDate) {
        LocalDate checkIn = LocalDate.parse(checkInDate, DateTimeFormatter.ISO_DATE);
        LocalDate checkOut = LocalDate.parse(checkOutDate, DateTimeFormatter.ISO_DATE);
        return !checkOut.isBefore(checkIn) && !checkOut.isAfter(checkIn.plusDays(MAXIMUM_STAY_DAYS));
    }
    @PostMapping("/roomDetailsPag")
    public ResponseEntity<GetFilterRoomsWithSizeResponseDTO> getRoomDetailsPag(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @Valid @RequestBody RoomDetailsRequestDTO request
    ) {
        String checkInDate = request.getCheckInDate();
        String checkOutDate = request.getCheckOutDate();
        int propertyId = request.getPropertyId();

        if (!isValidDateRange(checkInDate, checkOutDate)) {
            log.info("Wrong Dates {} {}", checkInDate, checkOutDate);
            throw new WrongDatesError();
        }

        GetFilterRoomsWithSizeResponseDTO roomTypes = roomDetailsService.getRoomDetailsPag(
                page,
                pageSize,
                propertyId,
                DateFormatter.formatDate(checkInDate),
                DateFormatter.formatDate(checkOutDate),
                request);
        return new ResponseEntity<>(roomTypes, HttpStatus.OK);
    }
}
