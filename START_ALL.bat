@echo off
REM Start Both Backend and Frontend
echo ========================================
echo  Online Portal SIBI - Startup Script
echo ========================================
echo.
echo This will start both the Backend and Frontend servers
echo.
echo Prerequisites:
echo - MySQL Server must be running
echo - Database 'online-portal' must be created
echo - Database credentials: root / root@
echo.
echo.
echo Opening Backend Terminal...
start cmd /k "cd /d C:\Users\DELL\Desktop\Exam-Portal-master\online-portal-sibi\online-portal-backend && set JAVA_HOME=C:\Program Files\Java\jdk-17 && call mvnw spring-boot:run"

timeout /t 3 /nobreak

echo Opening Frontend Terminal...
start cmd /k "cd /d C:\Users\DELL\Desktop\Exam-Portal-master\online-portal-sibi\online-portal-frontend && call npm start"

echo.
echo ========================================
echo  Servers Starting...
echo ========================================
echo Backend will be available at: http://localhost:8081
echo Frontend will be available at: http://localhost:3000
echo.
pause
