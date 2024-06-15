package com.kdu.ibe.dto.request;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TenantConfigDataDTO {
    private String tenantId;
    private String tenantName;
    private String tenantLogo;
    private String backgroundImage;
    private List<String> properties;
    private Map<String, PropertyConfigDTO> propertiesConfig;

    @Data
    public static class PropertyConfigDTO {
        private List<FieldDTO> fields;
        private List<GuestDTO> guests;
        private int rooms;
        private int maxPeoplePerRoom;
        private int maxLengthOfStay;
        private List<FilterTypeDTO> filterTypes;
        private List<BedTypeDTO> bedType;
        private List<RoomTypeDTO> roomType;
        private List<PriceDTO> price;
        private Map<String, RoomTypeInfoDTO> roomTypes;
    }

    @Data
    public static class FieldDTO {
        private String title;
        private boolean active;
    }

    @Data
    public static class GuestDTO {
        private String name;
        private String age;
        private boolean active;
    }

    @Data
    public static class FilterTypeDTO {
        private String title;
        private boolean active;
    }

    @Data
    public static class BedTypeDTO {
        private String name;
        private boolean active;
    }

    @Data
    public static class RoomTypeDTO {
        private String name;
        private boolean active;
    }

    @Data
    public static class PriceDTO {
        private String name;
        private boolean active;
    }

    @Data
    public static class RoomTypeInfoDTO {
        private List<String> images;
    }
}
