package com.kdu.ibe.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.dto.reviewsRatings.TenantRatingsDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Data
public class ReviewRatingEntity {

    @Id
    @Column(name = "tenant_id") // Specify the column name explicitly
    private String tenantId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "room_type_ratings", columnDefinition = "jsonb") // Use jsonb column type
    private String roomTypeRatings;

    public TenantRatingsDto toTenantRatings() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(roomTypeRatings, TenantRatingsDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void fromTenantRatingsDto(TenantRatingsDto tenantRatingsDto) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            roomTypeRatings = objectMapper.writeValueAsString(tenantRatingsDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}

