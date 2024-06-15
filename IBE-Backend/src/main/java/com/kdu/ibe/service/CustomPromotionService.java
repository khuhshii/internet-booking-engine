package com.kdu.ibe.service;

import com.kdu.ibe.dto.custompromotions.CustomPromoRequestDto;
import com.kdu.ibe.entity.CustomPromotionsEntity;
import com.kdu.ibe.exception.customExceptions.InvalidPromotionException;
import com.kdu.ibe.repository.CustomPromotionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CustomPromotionService {

    private final CustomPromotionRepository customPromotionRepository;
    public CustomPromotionService(CustomPromotionRepository customPromotionRepository){
        this.customPromotionRepository=customPromotionRepository;
    }

    public void addCustomPromo(CustomPromoRequestDto customPromoRequestDto){
        CustomPromotionsEntity customPromotionsEntity = new CustomPromotionsEntity();
        customPromotionsEntity.setPromotionTitle(customPromoRequestDto.getPromotionTitle());
        customPromotionsEntity.setDeactivated(customPromoRequestDto.isDeactivated());
        customPromotionsEntity.setPromotionDescription(customPromoRequestDto.getPromotionDescription());
        customPromotionsEntity.setPromoCode(customPromoRequestDto.getPromoCode());
        customPromotionsEntity.setPriceFactor(customPromoRequestDto.getPriceFactor());
        customPromotionsEntity.setMinimumDaysOfStay(customPromoRequestDto.getMinimumDaysOfStay());

        customPromotionsEntity.setRoomTypeId(customPromoRequestDto.getRoomTypeId());
        customPromotionsEntity.setValidDate(customPromoRequestDto.getValidDate());

        customPromotionRepository.save(
                customPromotionsEntity
        );
    }

    public CustomPromotionsEntity getCustomPromoByPromoCode(String promoCode, String roomTypeId){
        CustomPromotionsEntity customPromotionsEntity = customPromotionRepository.findById(promoCode).orElse(null);

        if(customPromotionsEntity == null){
            throw new InvalidPromotionException();
        }

        // Check if the promotion is applicable to the specified room type or all room types
        if(customPromotionsEntity.getRoomTypeId().equals(roomTypeId) || customPromotionsEntity.getRoomTypeId().equals("all")) {
            // Check if the promotion is deactivated
            if (customPromotionsEntity.isDeactivated()) {
                throw new InvalidPromotionException();
            }
            // Check if the valid date is before today's date
            LocalDate today = LocalDate.now();
            LocalDate validDate = LocalDate.parse(customPromotionsEntity.getValidDate());
            if (validDate.isBefore(today)) {
                throw new InvalidPromotionException();
            }
            return customPromotionsEntity;
        }

        throw new InvalidPromotionException();
    }



}
