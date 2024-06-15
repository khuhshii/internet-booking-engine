package com.kdu.ibe.dto.roomdetails;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RoomAverageMinRoomsDTO {

    Map<String,Double> roomTypeAverages;
    Map<String, Integer> minAvailableRooms;
    List<RoomTypeDTO> roomTypeDetails;
}
