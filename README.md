# 🏥 HealthWell - Student Wellness platform

HealthWell is a modern, full-stack student wellness portal designed to provide students with resources, personalized health tracking, and professional-led wellness programs. The platform features robust JWT-based authentication, role-based access control, and dynamic dashboards.

---

## 🚀 Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Modern, Responsive Design)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth transitions & Micro-interactions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Networking**: [Axios](https://axios-http.com/) (with JWT interceptors)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [Spring Boot 3.3.4](https://spring.io/projects/spring-boot)
- **Security**: Spring Security 6 + **JWT** (JSON Web Tokens)
- **Database**: [MySQL 8.0](https://www.mysql.com/)
- **Persistence**: Spring Data JPA (Hibernate)
- **Email**: Spring Boot Starter Mail (Gmail SMTP Integration)
- **Utils**: BCrypt Password Encoding

---

## 📁 Project Structure

### Backend (`/backend`)
```text
src/main/java/com/klu/sdp36BE/
├── config/             # Security & JWT configuration
├── controller/         # REST Endpoints (Auth, User, Admin)
├── filter/             # JWT Authentication Filter
├── model/              # JPA Entities (User, Program, Resource, Token)
├── repository/         # Data Access Layer (Spring Data JPA)
├── service/            # Business Logic (Auth, Email, User Activity)
└── util/               # JWT Utilities
```

### Frontend (`/frontend`)
```text
src/
├── api/                # Axios Client & Interceptors
├── components/         # Reusable UI Components (Navbar, Skeleton, ProtectedRoute)
├── context/            # Auth & Health Data Contexts
├── pages/              # Routing Pages (Home, Auth, Dashboards, Library)
└── App.jsx             # Main Routing & Lazy Loading
```

---

## ✨ Core Features

### 🔐 Authentication & Security
- **Secure Registration**: Password hashing with BCrypt.
- **JWT Auth**: Stateless authentication stored in `localStorage`.
- **Protected Routes**: Role-based access for `Student` and `Admin`.
- **Password Recovery**: Token-based password reset via email integration.

### 👤 Student Dashboard
- **Profile Overview**: View registered details and activity stats.
- **Program Enrollment**: Join wellness programs and track progress.
- **Resource History**: Automatic tracking of accessed library resources.

### 🛡️ Admin Panel
- **Global Statistics**: Real-time counts of users, programs, and library engagement.
- **User Management**: Complete list of registered users.
- **User Auditing**: "View History" modal to inspect student journey and activities.

---

## 🛠️ Setup & Execution

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL Server

### 1. Database Setup
1. Create a database named `healthwell_db` in MySQL.
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials.

### 2. Backend Start
```bash
cd backend
./mvnw clean spring-boot:run
```
*Runs on `http://localhost:9090`*

### 3. Frontend Start
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

---

## 👥 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@university.edu | admin123 |
| **Student** | student@university.edu | student123 |

---
*Developed as part of SDP36 Project.*
