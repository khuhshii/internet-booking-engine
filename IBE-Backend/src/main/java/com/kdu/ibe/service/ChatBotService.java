package com.kdu.ibe.service;


import com.kdu.ibe.dto.chat.ChatUserDto;
import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatBotService {

    private final RoomDetailsService roomDetailsService;

    @Autowired
    public ChatBotService(RoomDetailsService roomDetailsService){
        this.roomDetailsService = roomDetailsService;
    }


    public List<RoomTypeDTO> getRoomSuggestions(ChatUserDto chatUserDto){
       List<RoomTypeDTO> roomdetails =  roomDetailsService.getRoomDetails();
       if(chatUserDto.getRoomArea().equals("Extra Spacious")){
           roomdetails.removeIf(roomTypeDTO -> roomTypeDTO.getArea()<350);
       }
       if(chatUserDto.getBedType().equals("King")){
           roomdetails.removeIf(roomTypeDTO -> roomTypeDTO.getDoubleBed()<=0);
       }
       else if(chatUserDto.getBedType().equals("Queen")){
            roomdetails.removeIf(roomTypeDTO -> roomTypeDTO.getSingleBed()<=0);
       }
       if(chatUserDto.getAmount()<120){
           roomdetails.removeIf(roomTypeDTO -> roomTypeDTO.getRoomTypeName().split("_")[1].equals("DELUXE"));
       }
        System.out.println(roomdetails);
        return roomdetails;
    }
}
