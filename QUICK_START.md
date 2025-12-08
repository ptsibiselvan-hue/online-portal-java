# 🚀 QUICK START - Online Portal SIBI

## ⚡ In 5 Minutes

### 1. Database Setup (2 minutes)
```sql
CREATE DATABASE `online-portal`;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root@';
GRANT ALL PRIVILEGES ON `online-portal`.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Start Servers (2 minutes)
```bash
# In Project Root: C:\Users\DELL\Desktop\Exam-Portal-master\online-portal-sibi\

# Just double-click this file:
START_ALL.bat

# OR manually in two terminals:

# Terminal 1:
cd online-portal-backend
set JAVA_HOME=C:\Program Files\Java\jdk-17
mvnw spring-boot:run

# Terminal 2:
cd online-portal-frontend
npm start
```

### 3. Access Application (1 minute)
```
Open: http://localhost:3000
Register → Login → Enjoy! 🎉
```

---

## 📍 Project Root Directory

```
C:\Users\DELL\Desktop\Exam-Portal-master\online-portal-sibi\
```

---

## 🎯 What's Running

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:8081/api | 8081 |
| MySQL Database | localhost | 3306 |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Complete documentation |
| **SETUP_GUIDE.md** | Detailed setup instructions |
| **CONFIGURATION.md** | Configuration options |
| **INSTALLATION_SUMMARY.md** | Full project summary |
| **QUICK_START.md** | This file (you are here) |

---

## 🔧 Key Technologies

- **Backend**: Java 17 + Spring Boot 2.7.14
- **Frontend**: React 18 + Redux
- **Database**: MySQL 8.0
- **Build**: Maven + npm

---

## 📁 Folder Structure

```
online-portal-sibi/
├── online-portal-backend/     ← Spring Boot Backend
├── online-portal-frontend/    ← React Frontend
├── START_ALL.bat              ← Start Everything!
├── START_BACKEND.bat          ← Backend Only
├── START_FRONTEND.bat         ← Frontend Only
└── *.md                       ← Documentation
```

---

## ✅ Pre-requisites Check

Before starting, ensure you have:

```powershell
# Check Java
java -version              # Should show Java 17+

# Check Node.js
node --version             # Should show v14+
npm --version              # Should show v8+

# Check MySQL (If running locally)
# MySQL should be running as a service
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| MySQL connection failed | Ensure MySQL is running and credentials are correct |
| Port 8081 already in use | Change backend port in `application.properties` |
| npm install failed | Run `npm install --legacy-peer-deps` again |
| JAVA_HOME not found | Set Java path: `set JAVA_HOME=C:\Program Files\Java\jdk-17` |
| Frontend won't load | Check backend is running on port 8081 |

---

## 🎓 Default Test Account

After setting up, register a new account or use:
- **Username**: admin
- **Password**: admin123
- **Role**: USER (or ADMIN if configured)

---

## 🔒 Database Credentials

```
Host: localhost
Port: 3306
Database: online-portal
Username: root
Password: root@
```

---

## 📱 Features Ready to Use

✅ User Registration & Login
✅ User Profiles
✅ Quiz Management
✅ Category Management
✅ Responsive Design
✅ Redux State Management

---

## 🔄 Common Commands

### Backend
```bash
cd online-portal-backend

# Build
mvnw clean install

# Run
mvnw spring-boot:run

# View logs
tail -f target/logs/application.log
```

### Frontend
```bash
cd online-portal-frontend

# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 🌐 API Endpoints (Quick Reference)

```
GET    /api/categories              - List all categories
POST   /api/categories              - Create category
GET    /api/quizzes                 - List all quizzes
POST   /api/auth/register           - Register user
POST   /api/auth/login              - Login user
GET    /api/auth/profile/{id}       - Get user profile
```

---

## 💡 Next Steps After Setup

1. ✅ Start both servers
2. ✅ Register a new user
3. ✅ Login to the app
4. ✅ Create categories (as admin)
5. ✅ Add quizzes
6. ✅ Add questions to quizzes
7. ✅ Take quizzes as user
8. ✅ View results

---

## 📊 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB |
| Storage | 2 GB | 5 GB |
| Java | JDK 11+ | JDK 17+ |
| Node.js | v12+ | v16+ |
| MySQL | 5.7+ | 8.0+ |

---

## 🆘 Need Help?

1. Read **README.md** for detailed documentation
2. Check **SETUP_GUIDE.md** for installation steps
3. Review **CONFIGURATION.md** for config options
4. Check browser console (F12) for frontend errors
5. Check backend console for server errors

---

## 🎉 You're All Set!

Your complete exam portal system is ready to:
- ✅ Register users
- ✅ Manage quizzes
- ✅ Take exams
- ✅ Track results
- ✅ And much more!

**Happy Learning! 🚀**

---

**Quick Start Guide - December 2, 2025**
