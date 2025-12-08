# Setup Guide for Online Portal SIBI

## Quick Start

### Step 1: Install MySQL Database

1. Download and install MySQL from https://www.mysql.com/downloads/
2. Create the database:

```sql
CREATE DATABASE `online-portal`;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root@';
GRANT ALL PRIVILEGES ON `online-portal`.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Step 2: Run Both Servers

Double-click **START_ALL.bat** to start both backend and frontend automatically.

Or start them separately:
- **START_BACKEND.bat** - Starts Spring Boot backend on port 8081
- **START_FRONTEND.bat** - Starts React frontend on port 3000

### Step 3: Access the Application

Open your browser and go to: **http://localhost:3000**

---

## Manual Startup (If Batch Files Don't Work)

### Terminal 1 - Backend:
```bash
cd online-portal-backend
set JAVA_HOME=C:\Program Files\Java\jdk-17
mvnw spring-boot:run
```

### Terminal 2 - Frontend:
```bash
cd online-portal-frontend
npm start
```

---

## Project Structure

```
online-portal-sibi/
├── online-portal-backend/          # Spring Boot Backend
│   ├── src/main/java/...          # Backend source code
│   ├── src/main/resources/
│   │   └── application.properties  # Database configuration
│   ├── pom.xml                     # Maven configuration
│   └── mvnw, mvnw.cmd             # Maven wrapper
│
├── online-portal-frontend/         # React Frontend
│   ├── public/                    # Static files
│   ├── src/                       # React source code
│   │   ├── components/
│   │   ├── pages/
│   │   ├── reducers/
│   │   ├── services/
│   │   ├── constants/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json               # NPM dependencies
│
├── START_ALL.bat                  # Start both servers
├── START_BACKEND.bat              # Start backend only
├── START_FRONTEND.bat             # Start frontend only
└── README.md                       # Full documentation
```

---

## Key Technologies

| Component | Technology | Version |
|-----------|-----------|---------|
| Backend Framework | Spring Boot | 2.7.14 |
| Frontend Framework | React | 18.2.0 |
| Database | MySQL | 8.0+ |
| Java Version | JDK | 17 |
| Build Tool | Maven | 3.6+ |
| Package Manager | npm | 8.0+ |

---

## Default Database Configuration

```
Host: localhost
Port: 3306
Database: online-portal
Username: root
Password: root@
```

If you want to use different credentials, update:
`online-portal-backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/online-portal?...
spring.datasource.username=root
spring.datasource.password=root@
```

---

## Available Features

✅ User Registration & Login
✅ Quiz Management
✅ Category Management
✅ Take Quizzes
✅ View Results
✅ Admin Dashboard
✅ User Profiles
✅ Responsive Design

---

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Verify database exists
- Check credentials in application.properties

### Port Already in Use
- Port 8081 (Backend): Kill process using `netstat -ano | findstr :8081`
- Port 3000 (Frontend): Kill process using `netstat -ano | findstr :3000`

### npm install Issues
```bash
npm cache clean --force
rm -r node_modules
npm install --legacy-peer-deps
```

### Maven Build Issues
```bash
set JAVA_HOME=C:\Program Files\Java\jdk-17
mvnw clean install
```

---

## Next Steps After Setup

1. Create an admin account via registration
2. Login to the application
3. Add quiz categories
4. Add quizzes and questions
5. Test with user accounts

---

## Support & Documentation

For detailed API documentation, see: **README.md**

For troubleshooting, check the log files in:
- Backend: `online-portal-backend/target/logs/`
- Frontend: Browser console (F12)

---

**Version:** 1.0.0
**Last Updated:** December 2, 2025
