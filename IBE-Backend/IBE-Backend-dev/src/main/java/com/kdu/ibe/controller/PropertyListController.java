package com.kdu.ibe.controller;

import com.kdu.ibe.dto.property.PropertyResponseDto;
import com.kdu.ibe.service.PropertyListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller class for handling requests related to property lists.
 */
@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "https://calm-bay-0d02db810.4.azurestaticapps.net")
//@CrossOrigin(origins = "http://localhost:5176")

public class PropertyListController {

    PropertyListService propertyListService;

    /**
     * Constructor for PropertyListController.
     * @param propertyListService PropertyListService instance for retrieving property lists.
     */
    @Autowired
    public PropertyListController(PropertyListService propertyListService){
        this.propertyListService = propertyListService;
    }

    /**
     * Endpoint for testing purposes.
     * @return ResponseEntity containing a test message.
     */
    @Value("${graphql.property}")
    private String apiKey;
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        System.out.println(apiKey);
        return ResponseEntity.ok(apiKey);
    }

    /**
     * Endpoint to retrieve property list using GraphQL.
     * @return ResponseEntity containing the property list.
     */
    @GetMapping("/propertyList")
    public ResponseEntity<Map<String,Object>> testGraphql(){

        ResponseEntity<PropertyResponseDto> response =propertyListService.getPropertyByName();
        PropertyResponseDto responseDto = response.getBody();
        Map<String,Object> temp = new HashMap<>();
        temp.put("data",responseDto.getData());

        return ResponseEntity.ok(temp);
    }
}

