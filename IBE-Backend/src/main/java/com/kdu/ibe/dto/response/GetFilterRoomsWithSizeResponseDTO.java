package com.kdu.ibe.dto.response;

import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetFilterRoomsWithSizeResponseDTO {

    int size;
    List<RoomTypeDTO> roomTypesList;

}
