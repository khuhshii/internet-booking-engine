package com.kdu.ibe.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatUserDto {
    private String name;
    private String gender;
    private Integer age;
    private Integer amount;
    private Integer people;
    private String roomArea;
    private String bedType;
}
