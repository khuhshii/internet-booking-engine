package com.kdu.ibe.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TenantConfigurationDto {
    private String tenantId;
    private List<String> properties;
    private String tenantName;
    private String tenantLogo;
    private String backgroundImage;
}
