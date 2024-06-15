package com.kdu.ibe.controller;

import com.kdu.ibe.dto.chat.ChatUserDto;
import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import com.kdu.ibe.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ChatBotController {

    private final ChatBotService chatBotService;

    @Autowired
    public ChatBotController(ChatBotService chatBotService){
        this.chatBotService=chatBotService;
    }

    @PostMapping("/chat/user")
    public ResponseEntity<List<RoomTypeDTO>> getChatData(@RequestBody ChatUserDto chatUserDto){

        return ResponseEntity.ok(chatBotService.getRoomSuggestions(chatUserDto));
    }

}
