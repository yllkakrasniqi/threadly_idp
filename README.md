# threadly_idp

A collection of RESTful API endpoints for user authentication, handling **signup**, **login**, and **signout** as separate services. Built with Node.js and Express.
 
## Description

This project provides a microservice-based approach to user authentication, where each core functionality (signup, login, and signout) is handled by its own dedicated RESTful API endpoint. The APIs implement JSON Web Token (JWT) authentication to secure user sessions. These microservices can be used independently or as part of a larger authentication system in any web or mobile application.

### Key Services:
- **/user/signup**: Registers new users securely.
- **/user/login**: Authenticates users and issues a JWT for session management.
- **/user/logout**: Logs users out by invalidating their JWT.

### Technology Stack:
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: Lightweight and flexible Node.js framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: For hashing and securing user passwords.

