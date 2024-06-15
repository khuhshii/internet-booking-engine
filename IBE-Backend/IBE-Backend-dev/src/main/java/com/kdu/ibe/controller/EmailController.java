package com.kdu.ibe.controller;


import com.kdu.ibe.dto.email.EmailDto;
import com.kdu.ibe.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("api/v1")
public class EmailController {
    EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService){
        this.emailService=emailService;
    }

    @PostMapping("/mail")
    public ResponseEntity<String> sendEmail(@Valid @RequestBody EmailDto emailDto){
//        emailService.sendEmail(emailDto.getEmail(),emailDto.getData());
        emailService.scheduleEmail(emailDto.getEmail(), emailDto.getData(), Duration.ofSeconds(10),"Feedback Request: Your Recent Stay at KDU Hotels");
        return ResponseEntity.ok("Mail send successfully");
    }

    @PostMapping("/confirmationEmail")
    public ResponseEntity<String> sendConfirmationEmail(@Valid @RequestBody EmailDto emailDto){
//        emailService.sendEmail(emailDto.getEmail(),emailDto.getData());
        emailService.scheduleEmail(emailDto.getEmail(), emailDto.getData(), Duration.ofSeconds(1),"Booking Confirmation: Thank you for your bookings");
        return ResponseEntity.ok("Mail send successfully");
    }


}
