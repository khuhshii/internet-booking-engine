package com.kdu.ibe.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRateAverageResponseDTO {
    private Map<String, Double> roomTypeAverages;
}
