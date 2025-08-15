# === Stage 1: Build the application ===
FROM maven:3.9.9-eclipse-temurin-24 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies first (caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the actual source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# === Stage 2: Run the application ===
FROM openjdk:24-jdk AS runner

WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/CoreService-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 4000

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

