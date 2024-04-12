package com.example.gn_holidays.service;

import com.example.gn_holidays.config.JwtService;
import com.example.gn_holidays.dto.AuthenticationRequest;
import com.example.gn_holidays.dto.AuthenticationResponse;
import com.example.gn_holidays.dto.RegisterRequest;
import com.example.gn_holidays.entity.User;
import com.example.gn_holidays.repo.UserRepo;
import com.example.gn_holidays.util.Role;
import com.example.gn_holidays.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo repository;
    private final JwtService jwtService;

    @Autowired
    private ModelMapper modelMapper;

    private final AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public AuthenticationResponse registerAdmin(RegisterRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roleType(Role.ROLE_ADMIN)
                .build();
        var exsitUser = repository.findByEmail(user.getEmail());
        if(exsitUser.isPresent()){
            return null;
        }
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerSales(RegisterRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roleType(Role.ROLE_SALES)
                .build();
        var exsitUser = repository.findByEmail(user.getEmail());
        if(exsitUser.isPresent()){
            return null;
        }
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerAccountant(RegisterRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roleType(Role.ROLE_ACCOUNTANT)
                .build();
        var exsitUser = repository.findByEmail(user.getEmail());
        if(exsitUser.isPresent()){
            return null;
        }
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        if (user != null){
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .code(VarList.RSP_SUCCESS)
                .content(user.getRoleType())
                .message("Success")
                .build();
         }else {
         return null;
        }

    }

}