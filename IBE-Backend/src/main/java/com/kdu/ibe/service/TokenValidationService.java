package com.kdu.ibe.service;

import com.kdu.ibe.entity.TokenValidatorEntity;
import com.kdu.ibe.exception.customExceptions.TokenInvalidException;
import com.kdu.ibe.repository.TokenValidatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenValidationService {

    private final TokenValidatorRepository tokenValidatorRepository;

    @Autowired
    public TokenValidationService(TokenValidatorRepository tokenValidatorRepository){
        this.tokenValidatorRepository=tokenValidatorRepository;
    }

    public void addNewToken(String token){
        TokenValidatorEntity tokenValidatorEntity = new TokenValidatorEntity(token,true);
        tokenValidatorRepository.save(tokenValidatorEntity);
    }

    public void makeTokenInvalid(String token){
        TokenValidatorEntity tokenValidatorEntity = tokenValidatorRepository.findById(token).orElse(null);
        if(tokenValidatorEntity == null){
            throw new TokenInvalidException();
        }
        if(!tokenValidatorEntity.isValidity()){
            throw new TokenInvalidException();
        }
        tokenValidatorEntity.setValidity(false);
        tokenValidatorRepository.save(tokenValidatorEntity);
    }

    public boolean checkValidityOfToken(String token){
        TokenValidatorEntity tokenValidatorEntity = tokenValidatorRepository.findById(token).orElse(null);
        if(tokenValidatorEntity==null){
            throw new TokenInvalidException();
        }

        return tokenValidatorEntity.isValidity();
    }

}
