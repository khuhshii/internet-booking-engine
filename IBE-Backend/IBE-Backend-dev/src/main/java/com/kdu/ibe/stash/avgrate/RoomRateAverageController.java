package com.kdu.ibe.stash.avgrate;

import com.kdu.ibe.constants.DateFormatter;
import com.kdu.ibe.dto.response.RoomRateAverageResponseDTO;
import com.kdu.ibe.service.avg.RoomRateAverageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class RoomRateAverageController {

    private final RoomRateAverageService roomRateAverageService;

    @Autowired
    public RoomRateAverageController(RoomRateAverageService roomRateAverageService) {
        this.roomRateAverageService = roomRateAverageService;
    }

//    @GetMapping("/roomRateAverages")
//    public RoomRateAverageResponseDTO getRoomRateAverages(@RequestParam int propertyId,
//                                                          @RequestParam String checkInDate,
//                                                          @RequestParam String checkOutDate) {
//
//        Map<String, Double> roomTypeAverages = roomRateAverageService.calculateRoomRateAverages(propertyId, DateFormatter.formatDate(checkInDate),DateFormatter.formatDate(checkOutDate));
//        return new RoomRateAverageResponseDTO(roomTypeAverages);
//    }
}
