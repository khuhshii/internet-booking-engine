package com.kdu.ibe.service;

import com.kdu.ibe.dto.request.TenantConfigDataDTO;
import com.kdu.ibe.entity.ConfigDataEntity;
import com.kdu.ibe.exception.customExceptions.TenantNotFoundexception;
import com.kdu.ibe.model.configurablemodel.ConfigData;
import com.kdu.ibe.repository.ConfigDataRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing configuration data.
 */
@Service
@Getter
public class ConfigDataService {

    @Autowired
    private ConfigDataRepository configDataRepository;

    /**
     * Saves configuration data to the database.
     * @param configData The configuration data to be saved.
     */

    public void saveConfigData(TenantConfigDataDTO configData) {
        ConfigDataEntity configDataEntity = new ConfigDataEntity();
        configDataEntity.setTenantId(configData.getTenantId());
        configDataEntity.fromConfigData(configData);
        configDataRepository.save(configDataEntity);
    }

    /**
     * Retrieves configuration data based on the tenant ID.
     * @param tenantId The ID of the tenant.
     * @return ConfigData object representing the configuration data.
     */

    @Cacheable(value = "configData", key = "#tenantId")
    public ConfigData getConfigData(String tenantId) {
        ConfigDataEntity configDataEntity = configDataRepository.findById(tenantId).orElse(null);
        if(configDataEntity==null){
            throw new TenantNotFoundexception();
        }
        return configDataEntity != null ? configDataEntity.toConfigData() : null;
    }

    @Transactional
    @CacheEvict(value = "configData", key = "#configData.tenantId")
    public void updateConfigData(TenantConfigDataDTO configData) {
        ConfigDataEntity configDataEntity = configDataRepository.findById(configData.getTenantId())
                .orElseThrow(TenantNotFoundexception::new);
        configDataEntity.fromConfigData(configData);
        configDataRepository.save(configDataEntity);
    }

    /**
     * Retrieves JSON data representing the default configuration.
     * @return JSON data representing the default configuration.
     */
    private final ConfigData configData = new ConfigData();
    public String getJsonData(){
        return configData.toJsonString();
    }
}
