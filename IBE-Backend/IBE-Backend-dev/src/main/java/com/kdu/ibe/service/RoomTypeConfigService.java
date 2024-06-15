package com.kdu.ibe.service;

import com.kdu.ibe.dto.promotion.RoomTypeDto;

import com.kdu.ibe.dto.promotion.TenantDto;

import com.kdu.ibe.entity.RoomTypeAmenitiesEntity;
import com.kdu.ibe.exception.customExceptions.RoomNotFoundException;
import com.kdu.ibe.exception.customExceptions.TenantNotFoundexception;
import com.kdu.ibe.repository.RoomTypeConfigDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class RoomTypeConfigService {

    RoomTypeConfigDataRepository roomTypeConfigDataRepository;
    @Autowired
    public RoomTypeConfigService(RoomTypeConfigDataRepository roomTypeConfigDataRepository){
        this.roomTypeConfigDataRepository=roomTypeConfigDataRepository;
    }


    @CacheEvict(value = "roomTypeCache", allEntries = true)
    public void saveRoomTypesConfigData(TenantDto tenantRoomTypeConfigData) {
        RoomTypeAmenitiesEntity roomTypeAmenitiesEntity = new RoomTypeAmenitiesEntity();
        roomTypeAmenitiesEntity.setTenantId(tenantRoomTypeConfigData.getTenantId());
        roomTypeAmenitiesEntity.fromRoomTypeTenantConfigurations(tenantRoomTypeConfigData);
        roomTypeConfigDataRepository.save(roomTypeAmenitiesEntity);
    }

    @CacheEvict(value = "roomTypeCache", allEntries = true)
    public void updateRoomTypesConfigData(TenantDto tenantRoomTypeConfigData) {
        RoomTypeAmenitiesEntity existingEntity = roomTypeConfigDataRepository.findById(tenantRoomTypeConfigData.getTenantId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.fromRoomTypeTenantConfigurations(tenantRoomTypeConfigData);
            roomTypeConfigDataRepository.save(existingEntity);
        } else {
            throw new TenantNotFoundexception();
        }
    }

    @Cacheable(value = "roomTypeCache", key = "#tenantId")
    public TenantDto getRoomTypesConfigData(String tenantId) {
        RoomTypeAmenitiesEntity roomTypeAmenitiesEntity = roomTypeConfigDataRepository.findById(tenantId).orElse(null);
        if(roomTypeAmenitiesEntity==null){
            throw new TenantNotFoundexception();
        }
        return roomTypeAmenitiesEntity.toRoomTypeTenantConfigurations();
    }

    @Cacheable(value = "roomTypeCache", key = "#tenantId + '-' + #roomTypeId")
    public RoomTypeDto getRoomTypeConfigDataById(String tenantId, String roomTypeId){
        RoomTypeAmenitiesEntity roomTypeAmenitiesEntity = roomTypeConfigDataRepository.findById(tenantId).orElse(null);
        if(roomTypeAmenitiesEntity==null){
            throw new TenantNotFoundexception();
        }
        TenantDto tenantDto = roomTypeAmenitiesEntity.toRoomTypeTenantConfigurations();

        if(tenantDto.getRoomTypes().get(roomTypeId)!=null){
            return tenantDto.getRoomTypes().get(roomTypeId);
        }
        else{
            throw new RoomNotFoundException();
        }
    }

}
