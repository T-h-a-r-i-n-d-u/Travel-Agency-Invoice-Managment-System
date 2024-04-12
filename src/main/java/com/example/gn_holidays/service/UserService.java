package com.example.gn_holidays.service;

import com.example.gn_holidays.dto.UserDto;
import com.example.gn_holidays.entity.User;
import com.example.gn_holidays.repo.UserRepo;
import com.example.gn_holidays.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {

   @Autowired
    private UserRepo  userRepo;

   @Autowired
   private ModelMapper modelMapper;

   public String addUser(UserDto userDto){
       if(userRepo.existsById(userDto.getEmail())){
           return VarList.RSP_DUPLICATED;
       }else {
            userRepo.save(modelMapper.map(userDto, User.class));
           return VarList.RSP_SUCCESS;
       }
   }

    public List<UserDto> getAllUser(){
        List<User> usersList = userRepo.findAll();
        return modelMapper.map(usersList,new TypeToken<ArrayList<UserDto>>(){
        }.getType());
    }

    public UserDto getuserById(String email){
        if(userRepo.existsById(email)){
            User user = userRepo.findById(email).orElse(null);
            return modelMapper.map(user,UserDto.class);
        }else {
            return  null;
        }
    }

}
