# Bidify

Bidify is a fullstack auction platform built with:

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- React (TypeScript)
- JWT Authentication

This project was developed as part of a fullstack development course and demonstrates how to build a modern auction platform using a layered Web API and a React frontend.

## 📌 Features

- User registration and login with JWT authentication
- Role-based authorization (User / Admin)
- Create, update and manage auctions
- Search auctions by title
- Place and manage bids
- Prevent users from bidding on their own auctions
- Only higher bids than the current highest bid are allowed
- Soft delete using `IsActive`
- Admin can deactivate auctions and users
- Responsive frontend

## 🏗 Architecture

The backend follows a structured layered architecture:

- Controllers (API endpoints)
- Service layer (business logic)
- Repository layer (data access)
- Entity Framework Core
- Dependency Injection

The React frontend communicates with the API using REST endpoints and JWT-based authentication.
