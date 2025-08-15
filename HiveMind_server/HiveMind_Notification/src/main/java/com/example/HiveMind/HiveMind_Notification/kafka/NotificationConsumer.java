package com.example.HiveMind.HiveMind_Notification.kafka;

import com.example.HiveMind.HiveMind_Notification.models.Notification;
import com.example.HiveMind.HiveMind_Notification.service.NotificationService;
import com.example.HiveMind.HiveMind_Notification.util.Emails;
import com.google.protobuf.InvalidProtocolBufferException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private Emails emails;

    @KafkaListener(topics="HIVE_MIND",groupId = "notification-service")
    public void handleEvent(byte[] event){
        try {

            notification.NotificationEvent notificationEvent = notification.NotificationEvent.parseFrom(event);
            System.out.println("-----------------------------new event received------------------------------------"+ notificationEvent);

            if(notificationEvent.getType().toString().equals(Notification.NotificationType.AUTH.toString())){
                emails.sendVerificationEmail(notificationEvent.getReceiverEmail(),notificationEvent.getMessage());
                return;
            }
            if(notificationEvent.getType().toString().equals(Notification.NotificationType.PASSWORD_RESET.toString())){
                emails.sendPasswordResetOtpMail(notificationEvent.getReceiverEmail(),notificationEvent.getMessage());
                return;
            }

            if(notificationEvent.getType().toString().equals(Notification.NotificationType.CONNECTION_REQUEST_ACCEPTED.toString()) || notificationEvent.getType().toString().equals(Notification.NotificationType.CONNECTION_REQUEST_REJECTED.toString())){
                notificationService.notifyUser(notificationEvent.getFrom(),notificationEvent.getMessage());
                return;
            }

            Notification notification = new Notification();
            ObjectId from = new ObjectId(notificationEvent.getFrom());
            ObjectId to = new ObjectId(notificationEvent.getTo());
            notification.setType(Notification.NotificationType.valueOf(notificationEvent.getType().toString()));
            notification.setFrom(from);
            notification.setTo(to);
            notification.setMessage(notificationEvent.getMessage());
            notification.setStatus(Notification.Status.valueOf(notificationEvent.getStatus().toString()));
            notification.setTitle(notificationEvent.getTitle());
            notificationService.notifyUser(notificationEvent.getFrom(),notificationEvent.getMessage());
            notification.setSenderEmail(notificationEvent.getSenderEmail());
            notification.setSenderName(notificationEvent.getSenderName());
            notification.setReceiverEmail(notificationEvent.getReceiverEmail());
            notification.setReceiverName(notificationEvent.getReceiverName());
            notificationService.saveNotification(notification);
        } catch (InvalidProtocolBufferException e) {
            System.out.println("Error deserializing event"+ e.getMessage());
        }
    }

//    @KafkaListener(topics="HIVE_MIND",groupId = "notification-service")
//    public void listlner(String e){
//        System.out.println("--------------------------------------------new event received----------------------------------------------------d");
//        System.out.println(e);
//    }


}
