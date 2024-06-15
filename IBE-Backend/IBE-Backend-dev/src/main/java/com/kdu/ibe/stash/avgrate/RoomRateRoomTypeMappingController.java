package com.kdu.ibe.stash.avgrate;

import com.kdu.ibe.dto.response.RoomRateRoomTypeMappingResponse;
import com.kdu.ibe.service.avg.RoomRateRoomTypeMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class RoomRateRoomTypeMappingController {
    private final RoomRateRoomTypeMappingService service;
    @Autowired
    public RoomRateRoomTypeMappingController(RoomRateRoomTypeMappingService service) {
        this.service = service;
    }
    @GetMapping("/roomRateRoomTypeMappings")
    public RoomRateRoomTypeMappingResponse getRoomRateRoomTypeMappings(
            @RequestParam int propertyId,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate
    ) {
        return service.fetchRoomRateRoomTypeMappings(propertyId,checkInDate,checkOutDate);
    }
}
