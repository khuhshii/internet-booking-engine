package com.kdu.ibe.dto.promotion;

import lombok.Data;

import java.util.Map;


@Data
public class RoomTypesDto {
    private Map<String, RoomTypeDto> roomTypes;
}
