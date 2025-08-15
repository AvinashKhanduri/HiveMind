package com.example.HiveMind.HiveMind_Notification.service;
import com.example.HiveMind.HiveMind_Notification.models.Notification;
import com.example.HiveMind.HiveMind_Notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter subscribe(String userId) {
        SseEmitter emitter = new SseEmitter(0L);
        emitters.put(userId, emitter);


        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));
        emitter.onError((ex) -> emitters.remove(userId));

        try {

            emitter.send(SseEmitter.event()
                    .name("INIT")
                    .data("Connected to notification stream."));
        } catch (IOException e) {
            emitters.remove(userId);
        }

        return emitter;
    }


    public void notifyUser(String userId, String message) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("taskUpdate")
                        .data(message));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        }
    }


    public void broadcast(String message) {
        emitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("broadcast")
                        .data(message));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        });
    }

    public void saveNotification(Notification notification){
        notificationRepository.saveNotification(notification);
    }
}