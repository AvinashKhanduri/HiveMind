package com.avinash.HiveMind.services;

import com.avinash.HiveMind.models.Notification;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class NotificationService {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter subscribe(String id){
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.put(id,emitter);
        emitter.onCompletion(()->emitters.remove(id));
        emitter.onTimeout(()-> emitters.remove(id));
        return emitter;
    }

    public void notifiyUser(String userId,String message){
        SseEmitter emitter = emitters.get(userId);
        if(emitter!=null){
            try {
                emitter.send(SseEmitter.event().name("taskUpdate").data(message));
            }catch (IOException e){
                emitters.remove(userId);
            }
        }
    }


}
