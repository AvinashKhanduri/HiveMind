package com.avinash.CoreService.repositorys;

import com.avinash.CoreService.models.Team;
import com.mongodb.client.result.DeleteResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class TeamRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Team createTeam(Team team){
        return mongoTemplate.save(team);
    }

    public DeleteResult deleteTeamById(Team team){
        return mongoTemplate.remove(team);
    }

    public void deleteTeamMemberById(String userId, Team _team) {
        Team team = _team;

        if (team == null) {
            throw new RuntimeException("Team not found");
        }

        System.out.println("Before removal, team members: " + team.getTeamMembers());

        // Attempt to remove the user
        boolean removed = team.getTeamMembers().removeIf(user -> {
            System.out.println("Checking user: " + user.getId());
            return user.getId().equals(userId);
        });

        if (!removed) {
            System.out.println("User with ID " + userId + " not found in team: " + team.getId());
            throw new RuntimeException("User not found in the team");
        }

        System.out.println("After removal, team members: " + team.getTeamMembers());

        mongoTemplate.save(team);
    }


    public Team findTeamById(ObjectId id){
        return mongoTemplate.findById(id,Team.class);
    }

}
