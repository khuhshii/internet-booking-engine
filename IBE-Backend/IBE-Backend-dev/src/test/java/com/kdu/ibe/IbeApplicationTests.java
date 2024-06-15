//package com.kdu.ibe;
//
//import com.kdu.ibe.tests.controller.*;
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.test.web.servlet.MockMvc;
//
//@SpringBootTest
//@ComponentScan("com.kdu.ibe.tests.controller")
//@AutoConfigureMockMvc
//class IbeApplicationTests {
//    @Autowired
//    private MockMvc mockMvc;
//
//    /**
//     * Test method to verify the correctness of the "test" endpoint.
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(1)
//    void testEndpoint() throws Exception {
//        TestEndpointTest.testEndpoint(mockMvc);
//    }
//
//    /**
//     * Test method to verify the correctness of the minimum nightly rates endpoint.
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(2)
//    void testMinNightlyRates() throws Exception {
//        MinimumNightlyRatesTest.testMinimumNightlyRates(mockMvc);
//    }
//
//    /**
//     * Test method to verify the correctness of the property list endpoint.
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(3)
//    void testPropertyList() throws Exception {
//        PropertyListTest.testGraphqlEndPoint(mockMvc);
//    }
//
//    /**
//     * Test method to verify the correctness of the configurable data endpoints.
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(4)
//    void testConfigData() throws Exception {
//        ConfigurableDataEndpointsTest.testConfigurableDataEndpoints(mockMvc);
//    }
//
//    /**
//     * Test method to verify the successful addition of configuration.
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(5)
//    void testAddConfiguration_Success() throws Exception {
//        ConfigurableDataEndpointsTest.testAddConfiguration_Success(mockMvc);
//    }
//
////    /**
////     * Test method to verify the failure of adding configuration.
////     *
////     * @throws Exception if an error occurs during the test execution.
////     */
////    @Test
////    @Order(6)
////    void testAddConfiguration_Failure() throws Exception {
////        ConfigurableDataEndpointsTest.testAddConfiguration_Failure(mockMvc);
////    }
//
//    /**
//     * Test method to verify the success of fetching configurable data by ID.
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(7)
//    void testGetConfigurableDataById_Success() throws Exception {
//        ConfigurableDataEndpointsTest.testGetConfigurableDataById_Success(mockMvc);
//    }
//
//    /**
//     * Test method to verify the failure of fetching configurable data by ID (not found).
//     *
//     * @throws Exception if an error occurs during the test execution.
//     */
//    @Test
//    @Order(8)
//    void testGetConfigurableDataById_NotFound() throws Exception {
//        ConfigurableDataEndpointsTest.testGetConfigurableDataById_NotFound(mockMvc);
//    }
//
//    @Test
//    @Order(9)
//    void testTranslationDetails() throws Exception {
//        TranslationsTest.testTranslationApi(mockMvc);
//    }

//@Test
//@Order(10)
//void testGetPromotionDetails() throws Exception {
//    PromotionDetailsControllerTest.testGetPromotionDetails(mockMvc);
//}
//
//@Test
//@Order(11)
//void testRoomDetailsControlled() throws Exception{
//    RoomDetailsControllerTest.testGraphqlEndPoint(mockMvc);
//}
//}