package com.avinash.HiveMind.repositorys;

import com.avinash.HiveMind.dto.authentication.RegisterUserDto;
import jakarta.ws.rs.core.Response;

public interface KeyCloakRepository {

    int createUser(RegisterUserDto userDto);

    Response deleteUser(String id);
}
