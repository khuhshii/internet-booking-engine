package com.kdu.ibe.dto.roomdetails;

import com.kdu.ibe.dto.response.RoomAvailabilityResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDetailWithAverageDTO {
    List<RoomAvailabilityResponse.RoomAvailability> availabilities;
    List<RoomTypeDTO> roomDetailsArray;
}
