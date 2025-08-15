package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.ClubMember;
import com.mongodb.client.result.DeleteResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubMemberRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public ClubMember createClubMember(ClubMember clubMember){
        return mongoTemplate.save(clubMember);
    }

    public List<ClubMember> getAllClubMembers(){
        return mongoTemplate.findAll(ClubMember.class);
    }

    public ClubMember findClubMemberById(ObjectId id){
        return mongoTemplate.findById(id,ClubMember.class);
    }

    public DeleteResult deleteClubMember(ClubMember clubMember){
        return mongoTemplate.remove(clubMember);
    }
}
