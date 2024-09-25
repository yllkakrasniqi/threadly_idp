# threadly_idp

A collection of RESTful API endpoints for user authentication, handling **signup**, **login**, and **signout** as separate services. Built with Node.js and Express.
 
## Description

This project provides a microservice-based approach to user authentication, where each core functionality (signup, login, and signout) is handled by its own dedicated RESTful API endpoint. The APIs implement JSON Web Token (JWT) authentication to secure user sessions. These microservices can be used independently or as part of a larger authentication system in any web or mobile application.

### Key Services:
- **Signup API**: Registers new users securely.
- **Login API**: Authenticates users and issues a JWT for session management.
- **Signout API**: Logs users out by invalidating their JWT.

### Technology Stack:
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: Lightweight and flexible Node.js framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: For hashing and securing user passwords.

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yllkakrasniqi/threadly_idp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd auth-microservices-api
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root of the project:
    ```bash
    PORT=3000
    CORS_ORIGIN=http://localhost:3000 or your deployed server
    DB_HOST='mongodb_host'
    DB_PORT=mongodb_port
    DB_NAME='database_name'
    JWT_SECRET=your_jwt_secret
    ```

5. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### **Signup API**
- **POST** `/user/signup`
    - Description: Registers a new user by collecting their email and password.
    - Example Request:
        ```bash
        POST /user/signup
        Content-Type: application/json

        {
          "firstname": "John", 
          "lastname": "Doe", 
          "email": "user@example.com",
          "password": "password123",
          "country": "Kosova"
        }
        ```

### **Login API**
- **POST** `/user/login`
    - Description: Authenticates the user, checks their credentials, and issues a JWT.
    - Example Request:
        ```bash
        POST /user/login
        Content-Type: application/json

        {
          "email": "user@example.com",
          "password": "password123"
        }
        ```

### **Signout API**
- **POST** `/user/logout`
    - Description: Logs the user out by invalidating their JWT.
    - Example Request:
        ```bash
        POST /user/logout
        Authorization: Bearer <your_jwt_token>
        ```

## Usage

Each API can be accessed at `http://localhost:3000` or on your deployed server. You can interact with the APIs using HTTP clients like Postman or cURL. Ensure to pass the JWT token in the `Authorization` header for accessing the signout functionality.
