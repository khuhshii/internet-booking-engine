package com.kdu.ibe.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.constants.Constants;
import com.kdu.ibe.dto.property.PropertyResponseDto;
import com.kdu.ibe.entity.Properties;
import com.kdu.ibe.repository.PropertiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class PropertyListService {
    @Value("${graphql.url}")
    private String url;

    @Value("${graphql.api-key}")
    private String apiKey;

    @Value("${graphql.x-api-key}")
    private String xApiKey;
    RestTemplate restTemplate = new RestTemplate();

    PropertiesRepository propertiesRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

//    private static final String QUERY = "{ listProperties { property_id, property_name } }";
    @Autowired
    public PropertyListService(PropertiesRepository propertiesRepository){
        this.propertiesRepository=propertiesRepository;
    }

    public ResponseEntity<PropertyResponseDto> getPropertyByName(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        String requestBody = "{ \"query\": \"" + Constants.PROPERTY_LIST_QUERY + "\" }";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
//        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        ResponseEntity<PropertyResponseDto> responseEntity1 = restTemplate.exchange(url, HttpMethod.POST, requestEntity, PropertyResponseDto.class);

//        uncomment below lines to add properties to database
//        if (responseEntity.getStatusCode().is2xxSuccessful()) {
//            try {
//                PropertyResponseDto propertyResponse = objectMapper.readValue(responseEntity.getBody(), PropertyResponseDto.class);
//                propertyResponse.getData().getListProperties().forEach(property->{
//                    Properties properties = new Properties();
//                    properties.setPropertyId(property.getPropertyId());
//                    properties.setPropertyName(property.getPropertyName());
//                    propertiesRepository.save(properties);
//                });
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
        return responseEntity1;
    }
}
