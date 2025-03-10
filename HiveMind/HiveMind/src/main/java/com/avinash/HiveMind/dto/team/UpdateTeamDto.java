package com.avinash.HiveMind.dto.team;

import com.avinash.HiveMind.models.Team;

public class UpdateTeamDto {
    private String teamName;
    private Team.TeamStatus teamStatus;
    private String aboutTeam;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Team.TeamStatus getTeamStatus() {
        return teamStatus;
    }

    public void setTeamStatus(Team.TeamStatus teamStatus) {
        this.teamStatus = teamStatus;
    }

    public String getAboutTeam() {
        return aboutTeam;
    }

    public void setAboutTeam(String aboutTeam) {
        this.aboutTeam = aboutTeam;
    }
}
