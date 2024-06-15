package com.kdu.ibe.controller;


import com.kdu.ibe.dto.bookings.BookingRequestDTO;
import com.kdu.ibe.dto.bookings.PreBookingDTO;
import com.kdu.ibe.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("api/v1/newBooking")
public class BookingController {

    BookingService bookingService;

    @Autowired
    public  BookingController(BookingService bookingService){
        this.bookingService=bookingService;
    }

//    @PostMapping("")
//    public ResponseEntity<String> makeBooking(@Valid @RequestBody BookingRequestDTO bookingRequestDTO){
//        bookingService.makeBooking(bookingRequestDTO);
//        return ResponseEntity.ok("Booking made");
//    }
//
//    @PostMapping("/testPrebooking")
//    public ResponseEntity<String> testPreBooking(@RequestBody PreBookingDTO preBookingDTO){
//        return  ResponseEntity.ok(bookingService.testBooking(preBookingDTO));
//    }

}
