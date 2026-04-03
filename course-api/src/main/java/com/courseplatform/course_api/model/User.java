package com.courseplatform.course_api.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column
private String phoneNumber;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubtopicProgress> progressRecords = new ArrayList<>();

    protected User() {}

    private User(String email, String password, Role role, String phoneNumber) {
    this.email = Objects.requireNonNull(email);
    this.password = Objects.requireNonNull(password);
    this.role = role;
    this.phoneNumber = phoneNumber;
}

    public static User createUser(String email, String encodedPassword) {
    return new User(email, encodedPassword, Role.ROLE_USER, null);
}

public static User createAdmin(String email, String encodedPassword, String phoneNumber) {
    return new User(email, encodedPassword, Role.ROLE_ADMIN, phoneNumber);
}

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public Role getRole() { return role; }

    public void changePassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    public String getPhoneNumber() {
    return phoneNumber;
}

    public void updateProfile(String email, String phoneNumber) {
        if (email != null && !email.isBlank()) {
            this.email = email.trim().toLowerCase();
        }

        this.phoneNumber = phoneNumber == null || phoneNumber.isBlank()
                ? null
                : phoneNumber.trim();
    }

    public void softDelete() {
        this.markDeleted();
    }
}
