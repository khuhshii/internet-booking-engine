package com.kdu.ibe.controller;

import com.kdu.ibe.dto.promotion.PromotionTypeDTO;
import com.kdu.ibe.dto.promotion.RoomTypeDto;
import com.kdu.ibe.dto.promotion.TenantDto;
import com.kdu.ibe.dto.request.PromotionRequestDto;
import com.kdu.ibe.service.PromotionDetailsService;
import com.kdu.ibe.service.RoomTypeConfigService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class PromotionDetailsController {
    private final PromotionDetailsService promotionDetailsService;

    private final RoomTypeConfigService roomTypeConfigService;
    @Autowired
    public PromotionDetailsController(PromotionDetailsService promotionDetailsService,RoomTypeConfigService roomTypeConfigService) {
        this.promotionDetailsService = promotionDetailsService;
        this.roomTypeConfigService = roomTypeConfigService;
    }
    @GetMapping("/promotionDetails")
    public ResponseEntity<List<PromotionTypeDTO>> getRoomDetailsQL(){
        return new ResponseEntity<>(promotionDetailsService.getPromotionDetails(), HttpStatus.OK);
    }

    @PostMapping("/promotionDetailsRoom")
    public ResponseEntity<List<PromotionTypeDTO>> getPromotionDetails(@Valid @RequestBody PromotionRequestDto promotionRequestDto){
        return ResponseEntity.ok(promotionDetailsService.getValidatedPromotionDetails(promotionRequestDto));
    }

    @PostMapping("/bestPromo")
    public ResponseEntity<PromotionTypeDTO> getBestPromotion(@Valid @RequestBody PromotionRequestDto promotionRequestDto){
        return ResponseEntity.ok(promotionDetailsService.getBestPromotion(promotionRequestDto));
    }

    @PostMapping("/roomTypesConfiguration")
    public ResponseEntity<String> addRoomTypeConfigurations(@RequestBody TenantDto tenantDto){
        roomTypeConfigService.saveRoomTypesConfigData(tenantDto);
        return  ResponseEntity.ok("Room Type details saved successfully");
    }

    @PutMapping("/roomTypesConfiguration")
    public ResponseEntity<String> updateRoomTypeConfigurations(@RequestBody TenantDto tenantDto){
        roomTypeConfigService.updateRoomTypesConfigData(tenantDto);
        return ResponseEntity.ok("Room Type details updated successfully");
    }

    @GetMapping("/getRoomTypeConfigurations/{tenantId}")
    public ResponseEntity<TenantDto> getRoomTypeConfigurations(@PathVariable String tenantId){
        return ResponseEntity.ok(roomTypeConfigService.getRoomTypesConfigData(tenantId));
    }

    @GetMapping("/getRoomConfigById/{tenantId}")
    public ResponseEntity<RoomTypeDto> getRoomTypeConfigurationById(@PathVariable String tenantId, @RequestParam String roomTypeId){
        return ResponseEntity.ok(roomTypeConfigService.getRoomTypeConfigDataById(tenantId,roomTypeId));
    }

}
