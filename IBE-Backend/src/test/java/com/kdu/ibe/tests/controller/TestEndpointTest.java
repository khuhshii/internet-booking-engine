//package com.kdu.ibe.tests.controller;
//
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
///**
// * Test class for testing the "test" endpoint to ensure it returns the expected response.
// */
//public class TestEndpointTest {
//
//    /**
//     * Test method to verify the correctness of the response returned by the "test" endpoint.
//     *
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testEndpoint(MockMvc mockMvc) throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/test")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string("Hello This is test!!"));
//    }
//}
