//package com.kdu.ibe.tests.controller;
//
//import org.hamcrest.Matchers;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.time.LocalDate;
//
//
///**
// * Test class for testing the "nightlyRates" endpoint to ensure minimum nightly rates are returned correctly.
// */
//public class MinimumNightlyRatesTest {
//
//    /**
//     * Test method to verify the correctness of minimum nightly rates returned by the "nightlyRates" endpoint.
//     *
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testMinimumNightlyRates(MockMvc mockMvc) throws Exception {
//        LocalDate startDate = LocalDate.now();
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/nightlyRates")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string(
////                        Matchers.containsString("2024-03-01")
//                        Matchers.containsString(startDate.toString())
//
//                ));
//    }
//}
