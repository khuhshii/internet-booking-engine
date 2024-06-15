package com.kdu.ibe.service;

import com.kdu.ibe.entity.bookings.BookingEntity;
import com.kdu.ibe.entity.bookings.LogInUsers;
import com.kdu.ibe.exception.customExceptions.UserNotFoundException;
import com.kdu.ibe.repository.LogInUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class LoginUserService {


    private final LogInUsersRepository logInUsersRepository;

    @Autowired
    public LoginUserService(LogInUsersRepository logInUsersRepository){
        this.logInUsersRepository=logInUsersRepository;
    }

    public String addUserIfNot(String email, String token){

        if(email.isBlank()  || email.isEmpty() ){
            throw new UserNotFoundException();
        }
        LogInUsers logInUsers = logInUsersRepository.findById(email).orElse(null);
        if(logInUsers==null){
            LogInUsers logInUsers1 = new LogInUsers();
            logInUsers1.setEmailId(email);
            logInUsers1.setBookings(new ArrayList<BookingEntity>());
            logInUsers1.setJwtToken(token);
            logInUsersRepository.save(logInUsers1);
        }
        else{
            logInUsers.setJwtToken(token);
            logInUsersRepository.save(logInUsers);
        }
        return "User added successfully";
    }
}
