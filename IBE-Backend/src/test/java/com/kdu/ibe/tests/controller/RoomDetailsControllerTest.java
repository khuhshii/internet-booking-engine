//package com.kdu.ibe.tests.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.kdu.ibe.controller.RoomDetailsController;
//import com.kdu.ibe.dto.request.RoomDetailsRequestDTO;
//import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
//import com.kdu.ibe.service.RoomDetailsService;
//import org.hamcrest.Matchers;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//public class RoomDetailsControllerTest {
//
//
//    //    public static void testGetRoomDetailsPag_Success() throws Exception {
////         RoomDetailsService roomDetailsService;
////        RoomDetailsController roomDetailsController;
////        ObjectMapper objectMapper = new ObjectMapper();
////        // Mock data
////        List<RoomTypeDTO> roomTypes = Arrays.asList(
////                new RoomTypeDTO(88, "COUPLE_SUITE", 310, 0, 1, 2, 70.0, 20),
////                new RoomTypeDTO(90, "STANDARD_SUITE", 210, 0, 1, 2, 50.0, 20)
////        );
////
////        // Mocking service method
////        when(roomDetailsService.getRoomDetailsPag(anyInt(), anyInt(), anyInt(), any(), any(), any())).thenReturn(roomTypes);
////
////        // Setting up MockMvc
////        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(roomDetailsController).build();
////
////        // Request body
////        RoomDetailsRequestDTO requestDTO = new RoomDetailsRequestDTO();
////        requestDTO.setPropertyId(15);
////        requestDTO.setCheckInDate("2024-03-22");
////        requestDTO.setCheckOutDate("2024-04-05");
////        requestDTO.setMinRate(0);
////        requestDTO.setMaxRate(600);
////        requestDTO.setBedType(new String[]{"king"});
////        requestDTO.setRoomType(new String[]{"king"});
////
////        // Performing POST request and verifying the response
////        mockMvc.perform(post("/api/v1/roomDetailsPag")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .content(objectMapper.writeValueAsString(requestDTO)))
////                .andExpect(status().isOk())
////                .andExpect(jsonPath("$.length()").value(roomTypes.size()))
////                .andExpect(jsonPath("$[0].room_type_id").value(roomTypes.get(0).getRoomTypeId()))
////                .andExpect(jsonPath("$[1].room_type_id").value(roomTypes.get(1).getRoomTypeId()));
////
////        // Verify that service method was called
////        verify(roomDetailsService, times(1)).getRoomDetailsPag(anyInt(), anyInt(), anyInt(), any(), any(), any());
////    }
//    public static void testGraphqlEndPoint(MockMvc mockMvc) throws Exception {
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        List<RoomTypeDTO> roomTypes = Arrays.asList(
//                new RoomTypeDTO(88, "COUPLE_SUITE", 310, 0, 1, 2, 70.0, 20),
//                new RoomTypeDTO(90, "STANDARD_SUITE", 210, 0, 1, 2, 50.0, 20)
//        );
//
//        RoomDetailsRequestDTO requestDTO = new RoomDetailsRequestDTO();
//        requestDTO.setPropertyId(15);
//        requestDTO.setCheckInDate("2024-03-22");
//        requestDTO.setCheckOutDate("2024-04-05");
//        requestDTO.setMinRate(0);
//        requestDTO.setMaxRate(600);
//        requestDTO.setBedType(new String[]{"king"});
//        requestDTO.setRoomType(new String[]{"suite"});
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/roomDetailsPag?pageSize=10&page=1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(requestDTO)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(jsonPath("$.length()").value(roomTypes.size()))
//                .andExpect(jsonPath("$[0].room_type_id").value(roomTypes.get(0).getRoomTypeId()))
//                .andExpect(jsonPath("$[1].room_type_id").value(roomTypes.get(1).getRoomTypeId()));
//        ;
//
//    }
//}