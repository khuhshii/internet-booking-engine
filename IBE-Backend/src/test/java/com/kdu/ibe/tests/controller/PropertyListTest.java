//package com.kdu.ibe.tests.controller;
//
//import org.hamcrest.Matchers;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
///**
// * Test class for testing the "propertyList" endpoint to ensure property data is returned correctly.
// */
//public class PropertyListTest {
//
//    /**
//     * Test method to verify the correctness of data returned by the "propertyList" endpoint.
//     *
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//
//    public static void testGraphqlEndPoint(MockMvc mockMvc) throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/propertyList")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string(
//                        Matchers.containsString("Team 15 Hotel")
//                ));
//    }
//}
