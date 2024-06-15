package com.kdu.ibe.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomAvailabilityResponse {
    private Data data;

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Data {
        @JsonProperty("listRoomAvailabilities")
        private List<RoomAvailability> listRoomAvailabilities;
    }

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomAvailability {
        private String date;
        private Room room;
    }

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Room {
        @JsonProperty("room_id")
        private int roomId;
        @JsonProperty("room_type")
        private RoomType roomType;

    }

    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomType {
        @JsonProperty("room_type_name")
        private String roomTypeName;
    }
}

