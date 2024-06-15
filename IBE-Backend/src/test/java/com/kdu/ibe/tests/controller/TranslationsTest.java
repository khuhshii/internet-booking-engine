//package com.kdu.ibe.tests.controller;
//
//import org.hamcrest.Matchers;
//import org.skyscreamer.jsonassert.JSONAssert;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.time.LocalDate;
//
//public class TranslationsTest {
//
//    public static void testTranslationApi(MockMvc mockMvc) throws Exception {
//        String expectedJson = "{\"en\":{\"subheading\":\"Internet Booking Engine\",\"myBookings\":\"MY BOOKINGS\",\"en\":\"En\",\"it\":\"Ita\",\"usd\":\"USD\",\"inr\":\"INR\",\"eur\":\"EUR\",\"login\":\"LOGIN\",\"price\":\"Price\",\"propertyName\":\"Property name*\",\"allProperties\":\"Search all properties\",\"selectRates\":\"Select Rates\",\"selectDates\":\"Select Dates\",\"checkIn\":\"Check In\",\"checkOut\":\"Check Out\",\"guests\":\"Guests\",\"rooms\":\"Rooms\",\"access\":\"I need an Accesible Room\",\"search\":\"Search\",\"footer\":\"All rights reserved.\",\"applyDates\":\"APPLY DATES\",\"datemsg\":\"Please select end date. Max. length of stay : \",\"day\":\" days\"},\"it\":{\"subheading\":\"Motore di prenotazione Internet\",\"myBookings\":\"LE MIE PRENOTAZIONI\",\"en\":\"En\",\"it\":\"Ita\",\"usd\":\"USD\",\"inr\":\"INR\",\"eur\":\"EUR\",\"login\":\"ACCEDI\",\"price\":\"Prezzo\",\"propertyName\":\"Nome della proprietà*\",\"allProperties\":\"Cerca tutte le proprietà\",\"selectRates\":\"Seleziona Tariffe\",\"selectDates\":\"Seleziona Date\",\"checkIn\":\"Registrare\",\"checkOut\":\"Guardare\",\"guests\":\"Ospiti\",\"rooms\":\"Camere\",\"access\":\"Mi serve una stanza accessibile\",\"search\":\"Ricerca\",\"footer\":\"Tutti i diritti riservati.\",\"applyDates\":\"APPLICARE LE DATE\",\"datemsg\":\"Seleziona la data di fine. Massimo. durata del soggiorno : \",\"day\":\" giorni\"}}";
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/translations")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(result -> {
//                    String actualJson = result.getResponse().getContentAsString();
//                    JSONAssert.assertEquals(expectedJson, actualJson, false);
//                });
//    }
//}
