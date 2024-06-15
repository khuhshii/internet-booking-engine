package com.kdu.ibe.dto.rates;

import lombok.Data;

import java.util.Date;


@Data
public class RoomRateDto {
    private double basicNightlyRate;
    private Date date;
}
