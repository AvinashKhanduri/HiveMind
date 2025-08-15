package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.User;
import com.mongodb.client.result.DeleteResult;
//import org.keycloak.jose.jwk.JWK;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<User> findAll(){
        return mongoTemplate.findAll(User.class);
    }

    public User findById(String id){
        return mongoTemplate.findById(id,User.class);
    }

    public User findByEmail(String email){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        return mongoTemplate.findOne(query,User.class);
    }

    public User findByUserName(String username){
        Query query = new Query();
        query.addCriteria(Criteria.where("name").is(username));
        return mongoTemplate.findOne(query,User.class);
    }

    public User findByVerificationCode(String code){
        Query query = new Query();
        query.addCriteria(Criteria.where("verificationCode").is(code));
        return mongoTemplate.findOne(query,User.class);
    }

    public User findByPasswordResetOtp(String code){
        Query query = new Query();
        query.addCriteria(Criteria.where("resetPasswordCode").is(code));
        return mongoTemplate.findOne(query,User.class);
    }


    public List<User> getAllUsers(){
        return mongoTemplate.findAll(User.class);
    }

    public User saveUser(User user){
        return mongoTemplate.save(user);
    }

    public User updateUserForActivateAccount(User user) {
        Query query = new Query(Criteria.where("id").is(user.getId()));

        Update update = new Update()
                .set("enable", true)
                .unset("verificationCodeExpireAt")  // This removes the field
                .unset("verificationCode");         // This removes the field

        return mongoTemplate.findAndModify(query, update, User.class);
    }

    public DeleteResult deleteUserByEmail(String email){
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        return mongoTemplate.remove(query,User.class);
    }

    public DeleteResult deleteByUsername(String username){
        Query query = new Query();
        query.addCriteria(Criteria.where("name").is(username));
        return mongoTemplate.remove(query);
    }

    public DeleteResult deleteAllUsers(){
        return (DeleteResult) mongoTemplate.remove(User.class);
    }

    public List<User> findUserBySkills(String skill){
       String regexPattern = String.format("(?i)^%s$",skill);
       Query query = new Query();
       query.addCriteria(Criteria.where("skills").regex(regexPattern));
       return mongoTemplate.find(query,User.class);
    }

}
