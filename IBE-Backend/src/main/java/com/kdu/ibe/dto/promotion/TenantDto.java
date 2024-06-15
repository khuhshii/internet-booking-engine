package com.kdu.ibe.dto.promotion;

import lombok.Data;

import java.util.Map;

@Data
public class TenantDto {
    private String tenantId;
    private Map<String, RoomTypeDto> roomTypes;
}
