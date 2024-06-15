package com.kdu.ibe.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.dto.promotion.TenantDto;
import com.kdu.ibe.dto.request.TenantConfigDataDTO;
import com.kdu.ibe.model.configurablemodel.ConfigData;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


@Entity
@Data
@Table(name = "tenant_room_types_config_data")
public class RoomTypeAmenitiesEntity {

    @Id
    @Column(name = "tenant_id") // Specify the column name explicitly
    private String tenantId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "room_type_data", columnDefinition = "jsonb") // Use jsonb column type
    private String roomTypeConfigurations;


    public TenantDto toRoomTypeTenantConfigurations() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(roomTypeConfigurations, TenantDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void fromRoomTypeTenantConfigurations(TenantDto tenantRoomTypeConfiguration) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            roomTypeConfigurations = objectMapper.writeValueAsString(tenantRoomTypeConfiguration);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }}
