package com.a603.youlangme.service;

import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class WebUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userPk) throws UsernameNotFoundException {
        return userRepository.findById(Long.parseLong(userPk)).orElseThrow(UserNotFoundException::new);
    }
}
