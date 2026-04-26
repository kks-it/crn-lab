package com.crnlab.service;

import com.crnlab.dto.auth.AuthResponse;
import com.crnlab.dto.auth.LoginRequest;
import com.crnlab.dto.auth.SignupRequest;
import com.crnlab.entity.User;
import com.crnlab.enums.UserRole;
import com.crnlab.repository.UserRepository;
import com.crnlab.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email().trim().toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account already exists with this email");
        }

        User user = userRepository.save(
            User.builder()
                .fullName(request.fullName().trim())
                .email(request.email().trim().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .role(UserRole.PATIENT)
                .build()
        );

        return toAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password())
        );

        User user = userRepository.findByEmail(request.email().trim().toLowerCase())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return toAuthResponse(user);
    }

    public AuthResponse me(User user) {
        return toAuthResponse(user);
    }

    private AuthResponse toAuthResponse(User user) {
        return new AuthResponse(
            jwtService.generateToken(user),
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole().name()
        );
    }
}
