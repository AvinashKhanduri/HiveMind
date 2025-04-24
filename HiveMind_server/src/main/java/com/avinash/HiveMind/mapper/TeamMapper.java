package com.avinash.HiveMind.mapper;


import com.avinash.HiveMind.dto.team.UpdateTaskDto;
import com.avinash.HiveMind.dto.team.UpdateTeamDto;
import com.avinash.HiveMind.models.Task;
import com.avinash.HiveMind.models.Team;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TeamMapper {

    TeamMapper INSTANCE = Mappers.getMapper(TeamMapper.class);

    @Mapping(target = "id", ignore = true)
    default void updateTask(UpdateTaskDto updateTaskDto, @MappingTarget Task task) {
        System.out.println("Before update: " + task);
        Mappers.getMapper(TeamMapper.class).updateTask(updateTaskDto, task);
        System.out.println("After update: " + task);
    }


    @Mapping(target = "id",ignore = true)
    void updateTeamInfo(UpdateTeamDto updateTeamDto, @MappingTarget Team team);
}
