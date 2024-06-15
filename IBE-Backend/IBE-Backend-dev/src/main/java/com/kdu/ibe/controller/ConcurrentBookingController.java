package com.kdu.ibe.controller;
import com.kdu.ibe.dto.bookings.BookingFinalRequestDTO;
import com.kdu.ibe.entity.bookings.BookingEntity;
import com.kdu.ibe.service.ConcurrentBookingService;
import com.kdu.ibe.service.LoginUserService;
import com.kdu.ibe.service.StoreBookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/booking")
@EnableTransactionManagement
public class ConcurrentBookingController {
    private final ConcurrentBookingService bookingCheckService;

    private final StoreBookingService storeBookingService;

    private final LoginUserService loginUserService;

    @Autowired
    public ConcurrentBookingController(ConcurrentBookingService bookingCheckService, StoreBookingService storeBookingService, LoginUserService loginUserService) {
        this.bookingCheckService = bookingCheckService;
        this.storeBookingService=storeBookingService;
        this.loginUserService = loginUserService;
    }

    @PostMapping("")
    public ResponseEntity<Long> postBooking(@Valid @RequestBody BookingFinalRequestDTO bookingRequestDTO){
        return ResponseEntity.ok(bookingCheckService.createBookingCheck(bookingRequestDTO));
    }

    @GetMapping("/getBooking/{id}")
    public ResponseEntity<BookingEntity> getBookingById(@PathVariable Long id){
        return ResponseEntity.ok(storeBookingService.getBookingById(id));
    }

    @GetMapping("/getBookingsByMailId/{id}")
    public ResponseEntity<List<BookingEntity>> getBookingByMailId(@PathVariable String id, @RequestHeader("jwtToken") String jwtToken){
        return ResponseEntity.ok(storeBookingService.getBookingByMailId(id,jwtToken));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(@Valid @PathVariable Long bookingId){
        bookingCheckService.cancelBooking(bookingId);
        return ResponseEntity.ok("Booking canceled");
    }

    @GetMapping("/guest/{bookingId}")
    public ResponseEntity<String> cancelationBookingMail(@PathVariable String bookingId){
        bookingCheckService.sendEmailForCancelation(Long.parseLong(bookingId));
        return ResponseEntity.ok("Email send successfully");
    }

    @DeleteMapping("/guest/cancelation/{bookingId}")
    public ResponseEntity<String> cancelBookingViaOtp(@PathVariable String bookingId, @RequestParam String otp){
        bookingCheckService.cancelBookingViaOtp(Long.parseLong(bookingId),otp);
        return ResponseEntity.ok("Booking cancelled successfully");
    }

//    @DeleteMapping("/user/cancelation/{bookingId}")
//    public ResponseEntity<String> cancelBookingViaLogedInUser(@PathVariable String bookingId, @RequestParam String email, @RequestParam String jwtToken){
//        bookingCheckService.cancelBookingViaEmail(Long.parseLong(bookingId),email,jwtToken);
//        return ResponseEntity.ok("Booking cancelled successfully");
//    }
    @DeleteMapping("/user/cancelation/{bookingId}")
    public ResponseEntity<String> cancelBookingViaLogedInUser(@PathVariable String bookingId, @RequestParam String email,@RequestHeader("jwtToken") String jwtToken){
        bookingCheckService.cancelBookingViaEmail(Long.parseLong(bookingId),email,jwtToken);
        return ResponseEntity.ok("Booking cancelled successfully");
    }

//    @GetMapping("/user/addUser/{emailId}")
//    public ResponseEntity<String> addUserIfNotAdded(@PathVariable String emailId, @RequestParam String token){
//        loginUserService.addUserIfNot(emailId,token);
//        return ResponseEntity.ok("User added successfully");
//    }
    @GetMapping("/user/addUser/{emailId}")
    public ResponseEntity<String> addUserIfNotAdded(@PathVariable String emailId, @RequestHeader("jwtToken") String token){
        loginUserService.addUserIfNot(emailId,token);
        return ResponseEntity.ok("User added successfully");
    }
}

