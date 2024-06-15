package com.kdu.ibe.dto.response;

import com.kdu.ibe.dto.request.TenantConfigDataDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PropertyConfigDto {
    private List<TenantConfigDataDTO.FieldDTO> fields;
    private List<TenantConfigDataDTO.GuestDTO> guests;
    private int rooms;
    private int maxPeoplePerRoom;
    private int maxLengthOfStay;
}
