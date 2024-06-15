package com.kdu.ibe.stash.avgrate;

import com.kdu.ibe.dto.response.RoomAvailabilityResponse;
import com.kdu.ibe.service.avg.RoomAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RoomAvailabilityController {

    private final RoomAvailabilityService roomAvailabilityService;

    @Autowired
    public RoomAvailabilityController(RoomAvailabilityService roomAvailabilityService) {
        this.roomAvailabilityService = roomAvailabilityService;
    }

//    @GetMapping("/roomAvailabilities")
//    public List<RoomAvailabilityResponse.RoomAvailability> getRoomAvailabilities() {
//        return roomAvailabilityService.getRoomAvailabilities();
//    }
//    @GetMapping("/roomAvailabilities")
//    public List<RoomAvailabilityResponse.RoomAvailability> getRoomAvailabilities(
//            @RequestParam int propertyId,
//            @RequestParam String checkInDate,
//            @RequestParam String checkOutDate
//    ) {
//        return roomAvailabilityService.getRoomAvailabilities(propertyId, checkInDate, checkOutDate);
//    }
}
