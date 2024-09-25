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
