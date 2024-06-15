package com.kdu.ibe.controller;

import com.kdu.ibe.dto.request.TenantConfigDataDTO;
import com.kdu.ibe.dto.response.PropertyConfigDto;
import com.kdu.ibe.dto.response.TenantConfigurationDto;
import com.kdu.ibe.mapper.ConfigDataMapper;
import com.kdu.ibe.model.configurablemodel.ConfigData;
import com.kdu.ibe.service.ConfigDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for handling requests related to configurable data.
 */
@RestController
@RequestMapping("api/v1")
public class ConfigDataController {
    ConfigDataMapper configDataMapper=new ConfigDataMapper();
    private final ConfigDataService configDataService;

    /**
     * Constructor for ConfigDataController.
     * @param configDataService ConfigDataService instance to retrieve configurable data.
     */
    @Autowired
    public ConfigDataController(ConfigDataService configDataService) {
        this.configDataService = configDataService;
    }

    /**
     * Endpoint to retrieve configurable data.
     * @return ResponseEntity containing the JSON data.
     */
    @GetMapping("/configurableData")
    public ResponseEntity<String> getConfigurableData(){
        return ResponseEntity.ok(configDataService.getJsonData());
    }

    /**
     * Endpoint to retrieve configurable data by ID.
     * @param id The ID of the configurable data.
     * @return ResponseEntity containing the tenant configuration data.
     */
//    @GetMapping("/configurableDataById/{id}")
//    public ResponseEntity<ConfigData> getConfigurableDataById(@PathVariable String id){
//        return ResponseEntity.ok(configDataService.getConfigData(id));
//    }
    @GetMapping("/configurableDataById/{id}")
    public ResponseEntity<TenantConfigDataDTO> getConfigurableDataById(@PathVariable String id){
        TenantConfigDataDTO configDataDTO = configDataMapper.mapConfigDataToDTO(configDataService.getConfigData(id));
        return ResponseEntity.ok(configDataDTO);
    }

    /**
     * Endpoint to add tenant configuration.
     * @param configData The tenant configuration data to be added.
     * @return ResponseEntity indicating success or failure of the operation.
     */

    @PostMapping("/addTenantConfig")
    public ResponseEntity<String> addConfiguration(@RequestBody ConfigData configData) {
        TenantConfigDataDTO configDataDTO= configDataMapper.mapConfigDataToDTO(configData);
        try {
            configDataService.saveConfigData(configDataDTO);
            return new ResponseEntity<>("Tenant configuration added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add tenant configuration", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/updateTenantConfig")
    public ResponseEntity<String> updateConfiguration(@RequestBody ConfigData configData) {
        try {
            TenantConfigDataDTO configDataDTO = configDataMapper.mapConfigDataToDTO(configData);
            configDataService.updateConfigData(configDataDTO); // Assuming you have an updateConfigData method
            return new ResponseEntity<>("Tenant configuration updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update tenant configuration", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/globalConfig/{id}")
    public ResponseEntity<TenantConfigurationDto> getGlobalConfigurations(@PathVariable String id){
        ConfigData response = configDataService.getConfigData(id);
        return new ResponseEntity<>(new TenantConfigurationDto(response.getTenantId(), response.getProperties(), response.getTenantName(), response.getTenantLogo(), response.getBackgroundImage()),HttpStatus.ACCEPTED);
    }

    @GetMapping("/propertyConfig/{id}")
    public ResponseEntity<ConfigData.PropertyConfig> getPropertyConfig(@PathVariable String id, @RequestParam String propertyName){
        ConfigData response = configDataService.getConfigData(id);
        return new ResponseEntity<>(response.getPropertiesConfig().get(propertyName),HttpStatus.ACCEPTED);
    }
}