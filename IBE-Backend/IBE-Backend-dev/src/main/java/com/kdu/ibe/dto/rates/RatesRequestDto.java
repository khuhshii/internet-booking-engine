package com.kdu.ibe.dto.rates;

import lombok.Data;

@Data
public class RatesRequestDto {
    String roomTypeId;
    String startDate;
    String endDate;
}
