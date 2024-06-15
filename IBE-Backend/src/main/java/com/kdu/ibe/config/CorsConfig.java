/**
 * Configuration class for Cross-Origin Resource Sharing (CORS).
 */
package com.kdu.ibe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    /**
     * Configures CORS mappings.
     * @param registry CorsRegistry instance to configure CORS mappings.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("https://calm-bay-0d02db810.4.azurestaticapps.net")
                .allowedOrigins("https://calm-bay-0d02db810.4.azurestaticapps.net",
                        "http://localhost:5173","https://team-15-ibe-b5averevakhagghw.z02.azurefd.net")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
