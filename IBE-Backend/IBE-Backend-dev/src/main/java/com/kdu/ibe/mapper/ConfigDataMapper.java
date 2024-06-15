package com.kdu.ibe.mapper;

import com.kdu.ibe.dto.request.TenantConfigDataDTO;
import com.kdu.ibe.model.configurablemodel.ConfigData;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ConfigDataMapper {

    public ConfigData mapDTOToConfigData(TenantConfigDataDTO tenantConfigDataDTO) {
        ConfigData configData = new ConfigData();
        configData.setTenantId(tenantConfigDataDTO.getTenantId());
        configData.setProperties(tenantConfigDataDTO.getProperties());

        // Mapping propertiesConfig
        Map<String, ConfigData.PropertyConfig> propertiesConfig = tenantConfigDataDTO.getPropertiesConfig().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            TenantConfigDataDTO.PropertyConfigDTO propertyConfigDTO = entry.getValue();
                            ConfigData.PropertyConfig propertyConfig = new ConfigData.PropertyConfig();
                            propertyConfig.setFields(mapFieldDTOListToFieldList(propertyConfigDTO.getFields()));
                            propertyConfig.setGuests(mapGuestDTOListToGuestList(propertyConfigDTO.getGuests()));
                            propertyConfig.setRooms(propertyConfigDTO.getRooms());
                            propertyConfig.setMaxPeoplePerRoom(propertyConfigDTO.getMaxPeoplePerRoom());
                            propertyConfig.setMaxLengthOfStay(propertyConfigDTO.getMaxLengthOfStay());
                            propertyConfig.setFilterTypes(mapFilterTypeDTOListToFilterTypeList(propertyConfigDTO.getFilterTypes()));
                            propertyConfig.setBedType(mapBedTypeDTOListToOptionList(propertyConfigDTO.getBedType()));
                            propertyConfig.setRoomType(mapRoomTypeDTOListToOptionList(propertyConfigDTO.getRoomType()));
                            propertyConfig.setPrice(mapPriceDTOListToOptionList(propertyConfigDTO.getPrice()));
                            propertyConfig.setRoomTypes(mapRoomTypeInfoDTOListToRoomTypeInfoMap(propertyConfigDTO.getRoomTypes()));
                            return propertyConfig;
                        }
                ));
        configData.setPropertiesConfig(propertiesConfig);

        configData.setTenantName(tenantConfigDataDTO.getTenantName());
        configData.setTenantLogo(tenantConfigDataDTO.getTenantLogo());
        configData.setBackgroundImage(tenantConfigDataDTO.getBackgroundImage());
        return configData;
    }

    public TenantConfigDataDTO mapConfigDataToDTO(ConfigData configData) {
        TenantConfigDataDTO dto = new TenantConfigDataDTO();
        dto.setTenantId(configData.getTenantId());
        dto.setProperties(configData.getProperties());

        // Mapping propertiesConfig
        Map<String, TenantConfigDataDTO.PropertyConfigDTO> propertiesConfig = configData.getPropertiesConfig().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            ConfigData.PropertyConfig propertyConfig = entry.getValue();
                            TenantConfigDataDTO.PropertyConfigDTO propertyConfigDTO = new TenantConfigDataDTO.PropertyConfigDTO();
                            propertyConfigDTO.setFields(mapFieldListToFieldDTOList(propertyConfig.getFields()));
                            propertyConfigDTO.setGuests(mapGuestListToGuestDTOList(propertyConfig.getGuests()));
                            propertyConfigDTO.setRooms(propertyConfig.getRooms());
                            propertyConfigDTO.setMaxPeoplePerRoom(propertyConfig.getMaxPeoplePerRoom());
                            propertyConfigDTO.setMaxLengthOfStay(propertyConfig.getMaxLengthOfStay());
                            propertyConfigDTO.setFilterTypes(mapFilterTypeListToFilterTypeDTOList(propertyConfig.getFilterTypes()));
                            propertyConfigDTO.setBedType(mapOptionListToBedTypeDTOList(propertyConfig.getBedType()));
                            propertyConfigDTO.setRoomType(mapOptionListToRoomTypeDTOList(propertyConfig.getRoomType()));
                            propertyConfigDTO.setPrice(mapOptionListToPriceDTOList(propertyConfig.getPrice()));
                            propertyConfigDTO.setRoomTypes(mapRoomTypeInfoMapToRoomTypeInfoDTOList(propertyConfig.getRoomTypes()));
                            return propertyConfigDTO;
                        }
                ));
        dto.setPropertiesConfig(propertiesConfig);

        dto.setTenantName(configData.getTenantName());
        dto.setTenantLogo(configData.getTenantLogo());
        dto.setBackgroundImage(configData.getBackgroundImage());
        return dto;
    }

    private List<ConfigData.Field> mapFieldDTOListToFieldList(List<TenantConfigDataDTO.FieldDTO> fieldDTOList) {
        return fieldDTOList.stream()
                .map(fieldDTO -> new ConfigData.Field(fieldDTO.getTitle(), fieldDTO.isActive()))
                .collect(Collectors.toList());
    }

    private List<ConfigData.Guest> mapGuestDTOListToGuestList(List<TenantConfigDataDTO.GuestDTO> guestDTOList) {
        return guestDTOList.stream()
                .map(guestDTO -> new ConfigData.Guest(guestDTO.getName(), guestDTO.getAge(), guestDTO.isActive()))
                .collect(Collectors.toList());
    }

    private List<ConfigData.FilterType> mapFilterTypeDTOListToFilterTypeList(List<TenantConfigDataDTO.FilterTypeDTO> filterTypeDTOList) {
        return filterTypeDTOList.stream()
                .map(filterTypeDTO -> new ConfigData.FilterType(filterTypeDTO.getTitle(), filterTypeDTO.isActive()))
                .collect(Collectors.toList());
    }

    private List<ConfigData.Option> mapBedTypeDTOListToOptionList(List<TenantConfigDataDTO.BedTypeDTO> bedTypeDTOList) {
        return bedTypeDTOList.stream()
                .map(bedTypeDTO -> new ConfigData.Option(bedTypeDTO.getName(), bedTypeDTO.isActive()))
                .collect(Collectors.toList());
    }

    private List<ConfigData.Option> mapRoomTypeDTOListToOptionList(List<TenantConfigDataDTO.RoomTypeDTO> roomTypeDTOList) {
        return roomTypeDTOList.stream()
                .map(roomTypeDTO -> new ConfigData.Option(roomTypeDTO.getName(), roomTypeDTO.isActive()))
                .collect(Collectors.toList());
    }

    private List<ConfigData.Option> mapPriceDTOListToOptionList(List<TenantConfigDataDTO.PriceDTO> priceDTOList) {
        return priceDTOList.stream()
                .map(priceDTO -> new ConfigData.Option(priceDTO.getName(), priceDTO.isActive()))
                .collect(Collectors.toList());
    }

    private Map<String, ConfigData.RoomType> mapRoomTypeInfoDTOListToRoomTypeInfoMap(Map<String, TenantConfigDataDTO.RoomTypeInfoDTO> roomTypeInfoDTOList) {
        return roomTypeInfoDTOList.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> new ConfigData.RoomType(entry.getValue().getImages())
                ));
    }

    private List<TenantConfigDataDTO.FieldDTO> mapFieldListToFieldDTOList(List<ConfigData.Field> fieldList) {
        return fieldList.stream()
                .map(field -> {
                    TenantConfigDataDTO.FieldDTO fieldDTO = new TenantConfigDataDTO.FieldDTO();
                    fieldDTO.setTitle(field.getTitle());
                    fieldDTO.setActive(field.isActive());
                    return fieldDTO;
                })
                .collect(Collectors.toList());
    }

    private List<TenantConfigDataDTO.GuestDTO> mapGuestListToGuestDTOList(List<ConfigData.Guest> guestList) {
        return guestList.stream()
                .map(guest -> {
                    TenantConfigDataDTO.GuestDTO guestDTO = new TenantConfigDataDTO.GuestDTO();
                    guestDTO.setName(guest.getName());
                    guestDTO.setAge(guest.getAge());
                    guestDTO.setActive(guest.isActive());
                    return guestDTO;
                })
                .collect(Collectors.toList());
    }


    private List<TenantConfigDataDTO.FilterTypeDTO> mapFilterTypeListToFilterTypeDTOList(List<ConfigData.FilterType> filterTypeList) {
        return filterTypeList.stream()
                .map(filterType -> {
                    TenantConfigDataDTO.FilterTypeDTO filterTypeDTO = new TenantConfigDataDTO.FilterTypeDTO();
                    filterTypeDTO.setTitle(filterType.getTitle());
                    filterTypeDTO.setActive(filterType.isActive());
                    return filterTypeDTO;
                })
                .collect(Collectors.toList());
    }

    private List<TenantConfigDataDTO.BedTypeDTO> mapOptionListToBedTypeDTOList(List<ConfigData.Option> optionList) {
        return optionList.stream()
                .map(option -> {
                    TenantConfigDataDTO.BedTypeDTO bedTypeDTO = new TenantConfigDataDTO.BedTypeDTO();
                    bedTypeDTO.setName(option.getName());
                    bedTypeDTO.setActive(option.isActive());
                    return bedTypeDTO;
                })
                .collect(Collectors.toList());
    }

    private List<TenantConfigDataDTO.RoomTypeDTO> mapOptionListToRoomTypeDTOList(List<ConfigData.Option> optionList) {
        return optionList.stream()
                .map(option -> {
                    TenantConfigDataDTO.RoomTypeDTO roomTypeDTO = new TenantConfigDataDTO.RoomTypeDTO();
                    roomTypeDTO.setName(option.getName());
                    roomTypeDTO.setActive(option.isActive());
                    return roomTypeDTO;
                })
                .collect(Collectors.toList());
    }

    private List<TenantConfigDataDTO.PriceDTO> mapOptionListToPriceDTOList(List<ConfigData.Option> optionList) {
        return optionList.stream()
                .map(option -> {
                    TenantConfigDataDTO.PriceDTO priceDTO = new TenantConfigDataDTO.PriceDTO();
                    priceDTO.setName(option.getName());
                    priceDTO.setActive(option.isActive());
                    return priceDTO;
                })
                .collect(Collectors.toList());
    }

    private Map<String, TenantConfigDataDTO.RoomTypeInfoDTO> mapRoomTypeInfoMapToRoomTypeInfoDTOList(Map<String, ConfigData.RoomType> roomTypeInfoMap) {
        return roomTypeInfoMap.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            TenantConfigDataDTO.RoomTypeInfoDTO roomTypeInfoDTO = new TenantConfigDataDTO.RoomTypeInfoDTO();
                            roomTypeInfoDTO.setImages(entry.getValue().getImages());
                            return roomTypeInfoDTO;
                        }
                ));
    }
}
