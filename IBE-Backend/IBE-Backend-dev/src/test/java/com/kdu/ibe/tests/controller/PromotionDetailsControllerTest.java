//package com.kdu.ibe.tests.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.kdu.ibe.dto.promotion.PromotionTypeDTO;
//import org.hamcrest.Matchers;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//
//@ExtendWith(MockitoExtension.class)
//public class PromotionDetailsControllerTest {
//    public static void testGetPromotionDetails(MockMvc mockMvc) throws Exception {
//        ObjectMapper objectMapper = new ObjectMapper();
//        List<PromotionTypeDTO> promotions = Arrays.asList(
//                new PromotionTypeDTO(1, "SENIOR_CITIZEN_DISCOUNT", "SENIOR_CITIZEN_DISCOUNT", 1, false, 0.85),
//                new PromotionTypeDTO(2, "KDU Membership Discount", "KDU Membership Discount", 1, false, 0.8),
//                new PromotionTypeDTO(3, "Long weekend discount", "Applies only if trip more than 2 days and across weekends", 3, false, 0.75),
//                new PromotionTypeDTO(4, "Military personnel discount", "Military personnel discount", 1, false, 0.85),
//                new PromotionTypeDTO(5, "Upfront payment discount", "Pay 100% while booking and get a discount of 10%", 1, false, 0.9),
//                new PromotionTypeDTO(6, "Weekend discount", "Applies only if trip falls around a Saturday and Sunday", 2, false, 0.9)
//        );
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/promotionDetails")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string(
//                        Matchers.containsString("SENIOR_CITIZEN_DISCOUNT")
//                ))
//                .andExpect(content().json(objectMapper.writeValueAsString(promotions)));;
//    }
//}