package com.example.gn_holidays.controller;


import com.example.gn_holidays.dto.AuthenticationRequest;
import com.example.gn_holidays.dto.AuthenticationResponse;
import com.example.gn_holidays.dto.RegisterRequest;
import com.example.gn_holidays.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthanticationController {

    @Autowired
    private  AuthenticationService service;




    @PostMapping("/registerAdmin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody RegisterRequest request){
        return  ResponseEntity.ok(service.registerAdmin(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        try {
            AuthenticationResponse response = service.authenticate(request);
            if(response !=null) {
                return new ResponseEntity(response, HttpStatus.ACCEPTED);
            }else {
                return new ResponseEntity(null,HttpStatus.BAD_REQUEST);
            }

        }catch (Exception ex){
            return new ResponseEntity(ex, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
