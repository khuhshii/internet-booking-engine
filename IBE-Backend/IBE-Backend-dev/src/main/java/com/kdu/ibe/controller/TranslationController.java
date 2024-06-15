package com.kdu.ibe.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("api/v1")
public class TranslationController {
    @Value("${translation.url}")
    private String translationUrl;

    @GetMapping("/translations")
    public ResponseEntity<String> getTranslations() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(translationUrl, String.class);
        return ResponseEntity.ok(response.getBody());
    }
}
