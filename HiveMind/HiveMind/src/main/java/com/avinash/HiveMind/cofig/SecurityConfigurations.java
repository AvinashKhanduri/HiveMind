package com.avinash.HiveMind.cofig;


import com.avinash.HiveMind.services.auth.UserDetailServiceImpl;
import com.avinash.HiveMind.utils.JwtAuthConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

//    if keycloak will work i will use it again____________________

//    @Autowired
//    private JwtAuthConverter jwtAuthConverter;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers( "/auth/**").permitAll() // Allow unauthenticated access to /auth/**
//                        .requestMatchers("/admin/**").hasRole("ADMIN")
//                        .requestMatchers("/team/**").hasRole("TEAM_LEADER")
//                        .anyRequest().authenticated()  // Secure all other requests
//                )
//                .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF if you're using REST APIs
//                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigure -> jwtConfigure.jwtAuthenticationConverter(jwtAuthConverter)))
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));  // Use OAuth2 JWT authentication
//
//        return http.build();
//    }

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                                .requestMatchers( "/auth/**","/healthCheck/**").permitAll() // Allow unauthenticated access to /auth/**
                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                .requestMatchers("/team/**").hasRole("TEAM_LEADER")
                                .requestMatchers("/club/**").hasRole("CLUB_HEAD")
                                .anyRequest().authenticated()  // Secure all other requests
                )
                .httpBasic(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return  new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

}
