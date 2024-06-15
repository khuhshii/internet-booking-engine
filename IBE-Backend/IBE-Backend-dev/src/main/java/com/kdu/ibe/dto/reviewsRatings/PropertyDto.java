package com.kdu.ibe.dto.reviewsRatings;

import lombok.Data;
import java.util.List;
import java.util.Map;
@Data
public class PropertyDto {
        private Map<String, List<RoomTypeDto>> roomTypes;
}
