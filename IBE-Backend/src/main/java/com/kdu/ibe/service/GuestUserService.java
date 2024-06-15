package com.kdu.ibe.service;
import com.kdu.ibe.entity.GuestUserEntity;
import com.kdu.ibe.repository.GuestUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestUserService {
    private final GuestUserRepository guestUserRepository;

    @Autowired
    public GuestUserService(GuestUserRepository guestUserRepository) {
        this.guestUserRepository = guestUserRepository;
    }

    public List<GuestUserEntity> getAllUsers(){
        return guestUserRepository.findAll();
    }

    public void createUser(GuestUserEntity guestUser){
        guestUserRepository.save(guestUser);
    }
}
