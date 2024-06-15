package com.kdu.ibe.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.dto.request.TenantConfigDataDTO;
import com.kdu.ibe.model.configurablemodel.ConfigData;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Entity class representing tenant configuration data.
 */

@Entity
@Table(name = "tenant_config_data")
@Data
public class ConfigDataEntity {
    /**
     * The ID of the tenant.
     */
    @Id
    @Column(name = "tenant_id") // Specify the column name explicitly
    private String tenantId;

    /**
     * The JSON data representing the tenant configuration.
     */

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "json_data", columnDefinition = "jsonb") // Use jsonb column type
    private String jsonData;

    /**
     * Converts the entity to a ConfigData object.
     * @return ConfigData object representing the tenant configuration.
     */
    public ConfigData toConfigData() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonData, ConfigData.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Converts TenantConfigDataDTO object to JSON and sets it to jsonData field.
     * @param configData The TenantConfigDataDTO object representing the tenant configuration.
     */

    public void fromConfigData(TenantConfigDataDTO configData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonData = objectMapper.writeValueAsString(configData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
