package com.kdu.ibe.controller;

import com.kdu.ibe.dto.custompromotions.CustomPromoRequestDto;
import com.kdu.ibe.entity.CustomPromotionsEntity;
import com.kdu.ibe.service.CustomPromotionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class CustomPromotionController {

    private final CustomPromotionService customPromotionService;

    @Autowired
    public CustomPromotionController(CustomPromotionService customPromotionService){
        this.customPromotionService=customPromotionService;
    }

    @PostMapping("/addCustomPromo")
    public ResponseEntity<String> addCustomPromo(@Valid @RequestBody CustomPromoRequestDto customPromoRequestDto){
        customPromotionService.addCustomPromo(customPromoRequestDto);
        return ResponseEntity.ok("Custom Promo added successfully");
    }

    @GetMapping ("/getPromoByPromoCode/{promoCode}")
    public ResponseEntity<CustomPromotionsEntity> getPromoByPromoCode(@PathVariable String promoCode,@RequestParam String roomTypeId){
        return ResponseEntity.ok(customPromotionService.getCustomPromoByPromoCode(promoCode,roomTypeId));
    }

}
