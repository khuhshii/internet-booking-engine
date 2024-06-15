package com.kdu.ibe.dto.response;

//import com.kdu.ibe.dto.roomdetails.RoomType;
import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraphQLResponse {
    private Data data;


    @lombok.Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Data {
        private List<RoomTypeDTO> listRoomTypes;
    }
}