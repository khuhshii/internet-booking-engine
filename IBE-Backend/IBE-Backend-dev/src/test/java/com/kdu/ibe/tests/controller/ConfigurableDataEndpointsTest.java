//package com.kdu.ibe.tests.controller;
//
//import org.hamcrest.Matchers;
//import org.springframework.http.MediaType;
//
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import static org.hamcrest.MatcherAssert.assertThat;
///**
// * Test class for testing the endpoints related to configurable data.
// */
//
//public class ConfigurableDataEndpointsTest {
//    /**
//     * Test method to verify the response of the "configurableData" endpoint.
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testConfigurableDataEndpoints(MockMvc mockMvc) throws Exception {
//        String jsonResponse = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/configurableData")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andReturn().getResponse().getContentAsString();
//
//        assertThat(jsonResponse, Matchers.containsString("tenantId"));
//        assertThat(jsonResponse, Matchers.containsString("properties"));
//        assertThat(jsonResponse, Matchers.containsString("fields"));
//        assertThat(jsonResponse, Matchers.containsString("guests"));
//        assertThat(jsonResponse, Matchers.containsString("rooms"));
//        assertThat(jsonResponse, Matchers.containsString("maxPeoplePerRoom"));
//        assertThat(jsonResponse, Matchers.containsString("tenantName"));
//        assertThat(jsonResponse, Matchers.containsString("tenantLogo"));
//        assertThat(jsonResponse, Matchers.containsString("backgroundImage"));
//    }
//
//    /**
//     * Test method to verify the successful addition of configuration via the "addTenantConfig" endpoint.
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testAddConfiguration_Success(MockMvc mockMvc) throws Exception {
//        String requestBody = "{ \"tenantId\": \"123\", \"properties\": [\"Property 1\", \"Property 2\"], \"fields\": [{\"title\": \"Guests\", \"active\": true}], \"guests\": [{\"name\": \"Adults\", \"age\": \"Age 18+\", \"active\": true}], \"rooms\": 3, \"maxPeoplePerRoom\": 3, \"tenantName\": \"Example Tenant\", \"tenantLogo\": \"https://example.com/logo.png\", \"backgroundImage\": \"https://example.com/background.jpg\" }";
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/addTenantConfig")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(requestBody))
//                .andExpect(MockMvcResultMatchers.status().isCreated());
//    }
//
//    /**
//     * Test method to verify the failure scenario when adding configuration via the "addTenantConfig" endpoint.
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testAddConfiguration_Failure(MockMvc mockMvc) throws Exception {
//        String requestBody = "{ \"tenantId\": \"123\", \"properties\": [\"Property 1\", \"Property 2\"], \"fields\": [{\"title\": \"Guests\", \"active\": true}], \"guests\": [{\"name\": \"Adults\", \"age\": \"Age 18+\", \"active\": true}], \"rooms\": 3, \"maxPeoplePerRoom\": 3, \"tenantName\": \"Example Tenant\", \"tenantLogo\": \"https://example.com/logo.png\", \"backgroundImage\": \"https://example.com/background.jpg\" }";
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/addTenantConfig")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(requestBody))
//                .andExpect(MockMvcResultMatchers.status().isCreated()) // Expecting creation response
//                .andExpect(MockMvcResultMatchers.content().string("Failed to add tenant configuration")); // Add your expected failure message here
//    }
//
//    /**
//     * Test method to verify the successful retrieval of configurable data by ID via the "configurableDataById" endpoint.
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testGetConfigurableDataById_Success(MockMvc mockMvc) throws Exception {
//        String tenantId = "123";
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/configurableDataById/{id}", tenantId)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//
//    /**
//     * Test method to verify the scenario when attempting to retrieve configurable data by an invalid ID via the "configurableDataById" endpoint.
//     * @param mockMvc The MockMvc instance for performing requests.
//     * @throws Exception if an error occurs during the test execution.
//     */
//    public static void testGetConfigurableDataById_NotFound(MockMvc mockMvc) throws Exception {
//        String tenantId = "1234";
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/configurableDataById/{id}", tenantId)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isNotFound());
//    }
//}
