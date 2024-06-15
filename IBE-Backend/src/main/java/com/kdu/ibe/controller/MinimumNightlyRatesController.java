package com.kdu.ibe.controller;

import com.kdu.ibe.dto.rates.RatesRequestDto;
import com.kdu.ibe.dto.response.RoomRatesResponseDTO;
import com.kdu.ibe.service.BasicNightlyRatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller class for handling requests related to minimum nightly rates.
 */
@RestController
@RequestMapping("api/v1")
public class MinimumNightlyRatesController {
    private final BasicNightlyRatesService ratesService;

    /**
     * Constructor for MinimumNightlyRatesController.
     * @param ratesService BasicNightlyRatesService instance for retrieving minimum nightly rates.
     */
    @Autowired
    public MinimumNightlyRatesController(BasicNightlyRatesService ratesService) {
        this.ratesService = ratesService;
    }

    /**
     * Endpoint to retrieve minimum nightly rates.
     * @return ResponseEntity containing a map of room types and their corresponding minimum nightly rates.
     */
    @GetMapping("/nightlyRates")
    public ResponseEntity<Map<String, Integer>> getMinimumRates(){
        Map<String, Integer> result=ratesService.getMinimumNightlyRates();
        return  ResponseEntity.ok(result);
    }

    @PostMapping("/ratesPerDay")
    public ResponseEntity<Map<String,Double>> getRateSPerDay(@RequestBody RatesRequestDto ratesRequestDto){
        Map<String,Double> ratesPerDay = ratesService.getratesPerDay(ratesRequestDto);
        return  ResponseEntity.ok(ratesPerDay);
    }
}
