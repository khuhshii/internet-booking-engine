package com.kdu.ibe.controller;

import com.kdu.ibe.dto.token.TokenResponseDTO;
import com.kdu.ibe.service.TokenValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class TokenValidationController {

    public final TokenValidationService tokenValidationService;

    public TokenValidationController(TokenValidationService tokenValidationService){
        this.tokenValidationService = tokenValidationService;
    }

    @GetMapping("/addToken/{token}")
    public ResponseEntity<String> addToken(@PathVariable String token){
        tokenValidationService.addNewToken(token);
        return ResponseEntity.ok("Token added successfully");
    }

    @GetMapping("/getToken/{token}")
    public ResponseEntity<TokenResponseDTO> getToken(@PathVariable String token){
        boolean validity = tokenValidationService.checkValidityOfToken(token);

        return ResponseEntity.ok(new TokenResponseDTO(validity,"The validity for the token is sent!!"));
    }
}
