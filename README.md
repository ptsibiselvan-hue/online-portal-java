# Online Portal SIBI - Exam Management System

A complete exam portal application built with **Spring Boot**, **React.js**, **MySQL**, **HTML**, **CSS**, and **JavaScript**.

## Project Structure

```
online-portal-sibi/
├── online-portal-backend/     (Spring Boot Backend)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/project/onlineportal/
│   │   │   │   ├── controller/
│   │   │   │   ├── entity/
│   │   │   │   ├── repository/
│   │   │   │   └── OnlinePortalApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── online-portal-frontend/    (React Frontend)
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── reducers/
    │   ├── services/
    │   ├── constants/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Technologies Used

### Backend
- **Java 17**
- **Spring Boot 2.7.14**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **JWT Authentication**
- **Maven**

### Frontend
- **React 18.2.0**
- **Redux (State Management)**
- **React Router v6**
- **Bootstrap 5**
- **Axios**
- **HTML5**
- **CSS3**
- **JavaScript ES6+**

### Database
- **MySQL**

## Prerequisites

Before running the project, make sure you have installed:

1. **Java JDK 17** or higher
2. **Node.js** and **npm** (v14 or higher)
3. **MySQL Server** (v8.0 or higher)
4. **Maven** (v3.6 or higher)

## Setup Instructions

### 1. Database Setup

First, create the MySQL database:

```sql
CREATE DATABASE online-portal;

-- Create MySQL user (if needed)
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root@';
GRANT ALL PRIVILEGES ON online-portal.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Setup

Navigate to the backend folder and build the project:

```bash
cd online-portal-backend

# Build with Maven
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`

**Configure Database Connection:**

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/online-portal?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=root@
```

### 3. Frontend Setup

Navigate to the frontend folder and install dependencies:

```bash
cd online-portal-frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

The frontend will start on `http://localhost:3000` and automatically proxy API calls to `http://localhost:8081/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/{id}` - Get user profile
- `PUT /api/auth/profile/{id}` - Update user profile

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/{id}` - Update category (Admin)
- `DELETE /api/categories/{id}` - Delete category (Admin)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/{id}` - Get quiz details
- `GET /api/quizzes/category/{categoryId}` - Get quizzes by category
- `POST /api/quizzes` - Create quiz (Admin)
- `PUT /api/quizzes/{id}` - Update quiz (Admin)
- `DELETE /api/quizzes/{id}` - Delete quiz (Admin)

## Project Features

### User Features
- User Registration
- User Login
- View All Quizzes
- View Quizzes by Category
- Take Quizzes
- View Results

### Admin Features
- Manage Categories
- Manage Quizzes
- Manage Questions
- View User Results
- User Management

## Running the Complete Application

### Terminal 1 - Backend
```bash
cd online-portal-backend
set JAVA_HOME=C:\Program Files\Java\jdk-17
mvn spring-boot:run
```

### Terminal 2 - Frontend
```bash
cd online-portal-frontend
npm start
```

Access the application at: `http://localhost:3000`

## Default Credentials

After setting up the database and running both servers, you can register a new account or use test accounts (based on initial data).

## Project Files Description

### Backend Entity Classes
- `User.java` - User model with authentication info
- `Category.java` - Quiz categories
- `Quiz.java` - Quiz details
- `Question.java` - Quiz questions
- `QuizResult.java` - User quiz results

### Backend Controllers
- `AuthController.java` - User authentication endpoints
- `CategoryController.java` - Category management endpoints
- `QuizController.java` - Quiz management endpoints

### Frontend Components
- `Header.js` - Navigation bar
- `LoginPage.js` - User login form
- `RegisterPage.js` - User registration form
- `UserDashboardPage.js` - User dashboard with available quizzes

### Frontend State Management
- Redux for state management
- Action types in `constants/`
- Reducers for auth, categories, and quizzes

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL is running
- Check credentials in `application.properties`
- Verify database exists

### Backend Build Issues
- Set `JAVA_HOME` environment variable correctly
- Ensure Java 17 is installed
- Run `mvn clean install` to resolve dependencies

### Frontend Dependencies Issues
- Use `npm install --legacy-peer-deps` for compatibility
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

### Port Already in Use
- Backend (8081): Kill process on port 8081
- Frontend (3000): Kill process on port 3000
- Or change ports in configuration

## Future Enhancements

- JWT token-based authentication
- Email verification
- Quiz timer functionality
- Question shuffling
- Detailed analytics and reports
- Payment integration for premium quizzes
- Mobile app using React Native

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**Created for:** Online Portal SIBI - Exam Management System
**Version:** 1.0.0
**Last Updated:** December 2, 2025
