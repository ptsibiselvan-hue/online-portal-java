# Online Portal SIBI - Configuration Guide

## Database Setup

### MySQL Installation

1. Download MySQL Community Server from: https://www.mysql.com/downloads/mysql/
2. Install with default settings
3. Start MySQL Service

### Create Database

Run the following SQL commands:

```sql
-- Create Database
CREATE DATABASE `online-portal`;

-- Create User
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root@';

-- Grant Privileges
GRANT ALL PRIVILEGES ON `online-portal`.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Verify Connection
SELECT * FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = 'online-portal';
```

### Verify MySQL Connection (Optional)

```bash
mysql -h localhost -u root -p
# Enter password: root@
# Type: USE online-portal;
```

---

## Backend Configuration

### File: `online-portal-backend/src/main/resources/application.properties`

```properties
# Application Configuration
spring.application.name=online-portal-app
server.port=8081
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/online-portal?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=root@
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8InnoDBDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging Configuration
logging.level.root=INFO
logging.level.com.project.onlineportal=DEBUG
```

### Custom Configuration (Optional)

To change database credentials, modify these properties:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://[HOST]:[PORT]/[DATABASE_NAME]?createDatabaseIfNotExist=true
spring.datasource.username=[USERNAME]
spring.datasource.password=[PASSWORD]
```

Example with custom settings:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/my-exam-portal?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=admin
spring.datasource.password=admin123
```

---

## Frontend Configuration

### File: `online-portal-frontend/.env` (Optional)

Create a `.env` file in the frontend root directory:

```
REACT_APP_API_URL=http://localhost:8081/api
REACT_APP_APP_NAME=Online Portal
```

### Proxy Configuration

The proxy is configured in `setupProxy.js`:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8081',
      changeOrigin: true,
    })
  );
};
```

To change the backend URL, modify `target` property.

---

## Environment Variables

### Backend (Java/Spring Boot)

Set these before running:

```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17
set MAVEN_HOME=C:\Program Files\apache-maven-3.8.1

# Linux/Mac
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export MAVEN_HOME=/usr/local/maven
```

### Frontend (Node.js)

The frontend uses default Node.js environment. No special variables needed.

---

## Port Configuration

### Backend Port

To change backend port, edit `application.properties`:

```properties
server.port=8081  # Change to any available port
```

### Frontend Port

To change frontend port, run:

```bash
cd online-portal-frontend
PORT=3001 npm start  # Runs on port 3001 instead of 3000
```

---

## CORS Configuration

The backend has CORS enabled for local development.

Edit `OnlinePortalApplication.java` to modify:

```java
registry.addMapping("/**")
    .allowedOrigins("http://localhost:3000", "http://localhost:4200")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    .allowedHeaders("*")
    .allowCredentials(true)
    .maxAge(3600);
```

---

## Security Configuration (Future Enhancement)

### JWT Token Configuration

To enable JWT authentication, update:

1. `AuthController.java` - Generate JWT tokens
2. `JwtAuthenticationFilter.java` - Validate tokens (to be created)
3. `SecurityConfig.java` - Configure spring security (to be created)

---

## Logging Configuration

### Backend Logging

Edit `application.properties`:

```properties
# Log Level
logging.level.root=INFO
logging.level.com.project.onlineportal=DEBUG

# Log File
logging.file.name=logs/application.log
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
```

### Frontend Logging

Browser console logs are automatically displayed when you open DevTools (F12).

---

## Development vs Production

### Development Configuration

```properties
# Backend
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Frontend
REACT_APP_DEBUG=true
```

### Production Configuration

```properties
# Backend
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Frontend
REACT_APP_DEBUG=false
```

---

## Verification Checklist

After setup, verify:

- [ ] MySQL database is running
- [ ] Database `online-portal` is created
- [ ] User `root` with password `root@` can connect
- [ ] Java 17 is installed
- [ ] Maven is installed
- [ ] Node.js and npm are installed
- [ ] Backend builds successfully with `mvn clean install`
- [ ] Frontend dependencies installed with `npm install`
- [ ] Backend starts on port 8081
- [ ] Frontend starts on port 3000
- [ ] Can access http://localhost:3000 in browser
- [ ] API calls proxy correctly to http://localhost:8081/api

---

## Troubleshooting Configuration Issues

### MySQL Not Found

```bash
# Windows - Check MySQL Service
sc query MySQL80

# Start MySQL Service
net start MySQL80
```

### Java Not Found

```bash
# Set JAVA_HOME
set JAVA_HOME=C:\Program Files\Java\jdk-17

# Verify
java -version
```

### Maven Not Found

```bash
# Use Maven Wrapper instead
./mvnw clean install
```

### npm Packages Conflict

```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

---

**For more help, check README.md and SETUP_GUIDE.md**
