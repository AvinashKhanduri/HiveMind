package com.example.HiveMind.HiveMind_Notification.repository;

import com.example.HiveMind.HiveMind_Notification.models.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Notification saveNotification(Notification notification){
        return mongoTemplate.save(notification);
    }

//    public Notification findNotificationByFromIdToIdAndType(User from,User to,Notification.NotificationType type){
//        Query query = new Query();
//        query.addCriteria(Criteria.where("from.id").is(from.getId())
//                .and("to.id").is(to.getId())
//                .and("type").is(type));
//        return mongoTemplate.findOne(query,Notification.class);
//    }

    public void deleteNotification(Notification notification){
        mongoTemplate.remove(notification);
    }

    public List<Notification> getAllNotifications(){
        return mongoTemplate.findAll(Notification.class);
    }

}
