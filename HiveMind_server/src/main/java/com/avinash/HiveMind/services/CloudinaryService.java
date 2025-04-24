package com.avinash.HiveMind.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public Map upload(MultipartFile image, String folder){

        Map params = ObjectUtils.asMap(
                "asset_folder","Hivemind/"+folder,
                "resource_type","imgae"
        );

        try{
            return  cloudinary.uploader().upload(image.getBytes(),params);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return Collections.emptyMap();
        }
    }

    public void delete(List<String> publicId){
        Map params = ObjectUtils.asMap(
                "type","upload",
                "resource_type","image"
        );
        try{
            cloudinary.api().deleteResources(publicId,params);
            System.out.println("document deleted from cloudinary successfully");
        }catch (Exception e){
            System.out.println(e.getMessage());
        }

    }
}
