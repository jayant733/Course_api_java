# 📚 Course Platform API — Spring Boot Backend Assignment

This project is a **production-style backend API** built as part of the Spring Boot Backend Internship Assignment.

It demonstrates secure REST API design, role-based access control, JWT authentication, database integration, and deployment readiness.

🔗 **Live API:** https://your-deployed-link-here  
🔗 **Swagger Docs:** https://your-deployed-link-here/swagger-ui.html

---

## 🚀 Tech Stack

- **Java 17**
- **Spring Boot 3**
- **Spring Security + JWT Authentication**
- **Role-Based Authorization (USER / ADMIN)**
- **Spring Data JPA (Hibernate)**
- **PostgreSQL (Render Deployment)**
- **H2 Database (Local Development)**
- **Swagger / OpenAPI Documentation**
- **Docker Support**
- **Maven**

---

## 🔐 Authentication & Security

This API uses **JWT-based authentication**.

### Roles Implemented:
| Role | Access |
|------|--------|
| USER | Browse courses, enroll, track progress |
| ADMIN | Create courses and manage platform |

Security Features:
- Password hashing using **BCrypt**
- Stateless JWT authentication
- Role-based route protection
- Global exception handling (no stack traces exposed)
- Input validation

---

## 📦 API Features Implemented

### 👤 Authentication
- Register user
- Login user (returns JWT)
- Role stored inside JWT

### 📚 Courses
- View all courses (summary)
- View full course structure (topics + subtopics)

### 🎓 Enrollment
- Enroll logged-in user in a course
- Prevent duplicate enrollments
- View user dashboard enrollments

### 📖 Progress Tracking
- Mark subtopics as completed
- Prevent duplicate progress entries

### 🔍 Search
- Search within course subtopics
- Returns grouped course-level matches with snippets

### 👑 Admin Features
- Create new courses (ADMIN only)

---

## 🧠 Architecture Highlights

- DTO-based response design
- Clean service-layer architecture
- Custom exception handling with proper HTTP status codes
- Validation using `@Valid`
- Separation of concerns (Controller / Service / Repository)
- JWT filter for authentication context injection

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/yourusername/course-platform-api.git
cd course-platform-api



mvn spring-boot:run -Dspring-boot.run.profiles=local
http://localhost:8080/swagger-ui.html
docker-compose up --build


The application is deployed on Render using:

Managed PostgreSQL Database

Environment variables for DB & JWT

Production-ready configuration

🧪 Testing Strategy

Validation errors return structured responses

Authentication & role restrictions tested via Swagger

Edge cases handled with custom exceptions

💡 Notes on Approach

I focused on building a real-world backend architecture rather than just CRUD APIs.
Security, clean error handling, scalable structure, and deployability were prioritized.

Key decisions:

JWT over sessions for scalability

Role inside token for efficient authorization

DTOs to avoid entity exposure

Global exception handler for consistent API responses


👨‍💻 Author

Jayant Sharma
Backend Developer (Spring Boot)


![alt text](image-1.png)
![alt text](image.png)

