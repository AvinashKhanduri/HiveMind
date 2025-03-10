package com.avinash.HiveMind.services.auth;

import com.avinash.HiveMind.models.User;
import com.avinash.HiveMind.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("email from front end is ---> " + email);
        User user = userRepository.findByEmail(email);

        if (user != null) {
            return org.springframework.security.core.userdetails.User
                    .builder()
                    .username(user.getName())
                    .password(user.getPassword())
                    .roles(
                            user.getRoles().stream()
                                    .map(Enum::name)
                                    .toArray(String[]::new)
                    )
                    .build();
        }

        throw new UsernameNotFoundException("Cannot find user: " + email);
    }
}
