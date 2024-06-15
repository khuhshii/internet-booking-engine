package com.kdu.ibe.constants;

/**
 * Constants class containing GraphQL queries.
 */
public class Constants {

    /**
     * GraphQL query for retrieving a list of properties.
     */
    public static final String PROPERTY_LIST_QUERY = "{ listProperties { property_id, property_name } }";
    /**
     * GraphQL query for retrieving nightly rates for a specific property.
     * Note: This query is specific to property_id 15.
     */
    public static final String NIGHTLY_RATES_QUERY = "{getProperty(where: {property_id:15}) {property_id room_type { room_type_id room_type_name room_rates { room_rate { basic_nightly_rate date } } } }}";
    public static final String ROOM_DETAILS_QUERY="{ listRoomTypes(" +
            "    where: {property_id: {equals: 15}, room: {some: {room_available: {some: {booking_id: {equals: 0}}}}}}"+
            "take: 1000) { room_type_id room_type_name area_in_square_feet single_bed double_bed max_capacity }}";
    public static final String PROMOTIONS_QUERY="{ listPromotions{ promotion_id promotion_title promotion_description minimum_days_of_stay is_deactivated price_factor } }";

    public static final String RATESBYDATE = "{ listRoomRates(where: {room_types: {some: {room_type_id: {equals: %d}}}, date: {lte: \\\"%sT00:00:00.000Z\\\", gte: \\\"%sT00:00:00.000Z\\\"}}) { basic_nightly_rate date }}";


}
