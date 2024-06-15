package com.kdu.ibe.dto.promotion;

import lombok.Data;

import java.util.List;

@Data
public class RoomTypeDto {
    private String description;
    private List<String> amenities;
}
