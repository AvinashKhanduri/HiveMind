package com.avinash.HiveMind.cofig;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary getCloudinary(){
         return new Cloudinary(
                 ObjectUtils.asMap(
                         "cloud_name","dca2jiiqv",
                         "api_key","497958519767937",
                         "api_secret","JL2qXHrUWsoBVrN_ftunivMrEYI",
                         "secure",true
                 )
         );
    }
}
