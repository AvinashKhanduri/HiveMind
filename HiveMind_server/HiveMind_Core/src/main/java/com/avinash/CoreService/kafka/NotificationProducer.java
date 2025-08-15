package com.avinash.CoreService.kafka;

import notification.NotificationEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationProducer {

    @Autowired
    private KafkaTemplate<String,byte[]> kafkaTemplate;


    public void sendEvent(NotificationEvent notificationEvent){
        try{
            kafkaTemplate.send("HIVE_MIND",notificationEvent.toByteArray());
        }catch (Exception e){
            System.out.println("Error sending event"+ e.getMessage());
        }
    }

}
