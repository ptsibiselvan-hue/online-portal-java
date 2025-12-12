# Step 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy only pom.xml first for caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/myapp-0.0.1-SNAPSHOT.jar app.jar

# Render default port is 8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
