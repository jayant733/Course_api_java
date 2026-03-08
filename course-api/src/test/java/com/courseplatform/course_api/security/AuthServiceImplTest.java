// package com.courseplatform.course_api.security;

// import com.courseplatform.course_api.model.User;
// import com.courseplatform.course_api.repository.UserRepository;
// import com.courseplatform.course_api.security.JwtUtil;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.*;

// import org.springframework.security.crypto.password.PasswordEncoder;

// import java.util.Optional;

// import static org.mockito.Mockito.*;
// import static org.junit.jupiter.api.Assertions.*;

// @ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
// class AuthServiceImplTest {

//     @Mock private UserRepository userRepository;
//     @Mock private PasswordEncoder passwordEncoder;
//     @Mock private JwtUtil jwtUtil;

//     @InjectMocks private AuthServiceImpl authService;

//     @Test
//     void login_shouldReturnTokenIfValidCredentials() {

//         User user = new User();
//         user.setEmail("test@mail.com");
//         user.setPassword("encoded");

//         when(userRepository.findByEmail("test@mail.com"))
//                 .thenReturn(Optional.of(user));
//         when(passwordEncoder.matches("password", "encoded"))
//                 .thenReturn(true);
//         when(jwtUtil.generateToken(anyString(), anyString()))
//                 .thenReturn("mock-token");

//         String token = authService.login("test@mail.com", "password");

//         assertEquals("mock-token", token);
//     }
// }