package com.kdu.ibe.dto.bookings;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomIdResponseDTO {

    List<Integer> listRoomIds;
}
