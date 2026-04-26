package com.crnlab.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
    @NotBlank(message = "Full name is required")
    String fullName,

    @Email(message = "Enter a valid email address")
    @NotBlank(message = "Email is required")
    String email,

    @Size(min = 6, message = "Password must contain at least 6 characters")
    String password
) {
}
