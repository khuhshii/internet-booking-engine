package com.kdu.ibe.dto.reviewsRatings;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TenantRatingsDto {
    private String tenantId;
    private Map<String,PropertyDto> properties;
}