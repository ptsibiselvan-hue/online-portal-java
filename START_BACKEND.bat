@echo off
REM Start Online Portal Backend
echo Starting Online Portal Backend...
cd /d "C:\Users\DELL\Desktop\Exam-Portal-master\online-portal-sibi\online-portal-backend"
set JAVA_HOME=C:\Program Files\Java\jdk-17
call mvnw spring-boot:run
pause
