package com.kdu.ibe.model.configurablemodel;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class ConfigData {
    private String tenantId;
    private List<String> properties;
    private Map<String, PropertyConfig> propertiesConfig;
    private String tenantName;
    private String tenantLogo;
    private String backgroundImage;

    public ConfigData() {
        this.tenantId = "1"; // Set default tenantId
        this.tenantName = "Kickdrum";
        this.tenantLogo = "https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/444dc209bb532582196d2ccc3ab85970.png";
        this.backgroundImage = "https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/luxury-hotel-2.jpg";

        this.properties = Arrays.asList("Team 15 Hotel", "Team 16 Hotel", "Team 17 Hotel");

        this.propertiesConfig = new HashMap<>();
        for (String property : properties) {
            PropertyConfig propertyConfig = new PropertyConfig();
            propertyConfig.setFields(Arrays.asList(
                    new Field("Guests", true),
                    new Field("Rooms", true),
                    new Field("Accessible", true)
            ));
            propertyConfig.setGuests(Arrays.asList(
                    new Guest("Adults", "Age 18+", true),
                    new Guest("Teens", "Age 13-17", true),
                    new Guest("Kids", "Age 0-12", true),
                    new Guest("Senior Citizens", "Age 60+", true)
            ));
            propertyConfig.setRooms(3);
            propertyConfig.setMaxPeoplePerRoom(3);
            propertyConfig.setMaxLengthOfStay(7);

            // Adding filterTypes for propertyConfig
            propertyConfig.setFilterTypes(Arrays.asList(
                    new FilterType("bedType", true),
                    new FilterType("roomType", true),
                    new FilterType("price", true)
            ));

            // Adding bedType, roomType, and price options for propertyConfig
            propertyConfig.setBedType(Arrays.asList(
                    new Option("Queen", true),
                    new Option("King", true)
            ));
            propertyConfig.setRoomType(Arrays.asList(
                    new Option("Deluxe", true),
                    new Option("Suite", true)
            ));
            propertyConfig.setPrice(Arrays.asList(
                    new Option("150", true),
                    new Option("300", true),
                    new Option("600", true)
            ));

            // Adding roomTypes for propertyConfig
            propertyConfig.setRoomTypes(new HashMap<>());
            propertyConfig.getRoomTypes().put("GRAND_DELUXE", new RoomType(Arrays.asList(
                    "image_url_1", "image_url_2", "image_url_3"
            )));
            propertyConfig.getRoomTypes().put("SUPER_DELUXE", new RoomType(Arrays.asList(
                    "image_url_1", "image_url_2", "image_url_3"
            )));
            propertyConfig.getRoomTypes().put("FAMILY_DELUXE", new RoomType(Arrays.asList(
                    "image_url_1", "image_url_2", "image_url_3"
            )));
            propertyConfig.getRoomTypes().put("COUPLE_SUITE", new RoomType(Arrays.asList(
                    "image_url_1", "image_url_2", "image_url_3"
            )));
            propertyConfig.getRoomTypes().put("GARDEN_SUITE", new RoomType(Arrays.asList(
                    "image_url_1", "image_url_2", "image_url_3"
            )));
            propertyConfig.getRoomTypes().put("STANDARD_SUITE", new RoomType(Arrays.asList(
                    "image_url_1", "image_url_2", "image_url_3"
            )));

            propertiesConfig.put(property, propertyConfig);
        }
    }

    public String toJsonString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }

    @Data
    public static class PropertyConfig {
        private List<Field> fields;
        private List<Guest> guests;
        private int rooms;
        private int maxPeoplePerRoom;
        private int maxLengthOfStay;
        private List<FilterType> filterTypes;
        private List<Option> bedType;
        private List<Option> roomType;
        private List<Option> price;
        private Map<String, RoomType> roomTypes;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Field {
        private String title;
        private boolean active;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Guest {
        private String name;
        private String age;
        private boolean active;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FilterType {
        private String title;
        private boolean active;
    }

    @Data
    @NoArgsConstructor
    public static class Option {
        private String name;
        private boolean active;

        public Option(String name, boolean active) {
            this.name = name;
            this.active = active;
        }
    }

    @Data
    @NoArgsConstructor
    public static class RoomType {
        private List<String> images;

        public RoomType(List<String> images) {
            this.images = images;
        }
    }
}
