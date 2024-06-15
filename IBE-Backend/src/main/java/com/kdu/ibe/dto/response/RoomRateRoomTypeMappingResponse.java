package com.kdu.ibe.dto.response;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RoomRateRoomTypeMappingResponse {
    private Data data;

    public List<RoomRateRoomTypeMapping> getListRoomRateRoomTypeMappings() {
        return data.listRoomRateRoomTypeMappings;
    }

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Data {
        private List<RoomRateRoomTypeMapping> listRoomRateRoomTypeMappings;
    }

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class RoomRateRoomTypeMapping {
        @JsonProperty("room_rate")
        private RoomRate roomRate;
        @JsonProperty("room_type")
        private RoomType roomType;
    }

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class RoomRate {
        @JsonProperty("basic_nightly_rate")
        private int basicNightlyRate;
        @JsonProperty("date")
        private String date;
    }
    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class RoomType {
        @JsonProperty("room_type_name")
        private String roomTypeName;
    }
}
