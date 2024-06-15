package com.kdu.ibe.dto.response;

import com.kdu.ibe.dto.promotion.PromotionTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionResponseDTO {
    private Data data;

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Data {
        private List<PromotionTypeDTO> listPromotions;
//        private List<PromotionType> listPromotions; // Change this line

    }
}