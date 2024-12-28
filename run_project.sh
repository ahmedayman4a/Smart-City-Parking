#!/bin/bash

# Set your database credentials and SQL file path
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="*d9Mku9h%^JI#LeG"
DB_NAME="parking"
SQL_FILE="database/scripts/init.sql"

# Paths to backend and frontend directories
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# Function to run SQL file into the database
run_sql_file() {
    echo "Running SQL file: $SQL_FILE"
    if mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$SQL_FILE"; then
        echo "SQL file executed successfully."
    else
        echo "Error running SQL file."
        exit 1
    fi
}

# Function to run the Spring Boot backend
run_backend() {
    echo "Starting Spring Boot backend..."
    cd "$BACKEND_DIR" || { echo "Backend directory not found"; exit 1; }
    mvn spring-boot:run &
    BACKEND_PID=$!
    echo "Spring Boot backend is running with PID $BACKEND_PID"
}

# Function to run the Vue.js frontend
run_frontend() {
    echo "Starting Vue.js frontend with Vite..."
    cd -
    cd "$FRONTEND_DIR" || { echo "Frontend directory not found"; exit 1; }
    npm install
    npm run dev &
    FRONTEND_PID=$!
    echo "Vue.js frontend is running with PID $FRONTEND_PID"
}

# Main script execution
echo "Starting project setup..."

# Run SQL file
run_sql_file

# Run backend
run_backend

# Run frontend
run_frontend

# Wait for the user to stop the script
echo "Project is running. Press Ctrl+C to stop."
trap "kill $BACKEND_PID $FRONTEND_PID; echo 'Project stopped.'" INT
wait
