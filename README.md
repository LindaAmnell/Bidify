# Bidify

Bidify is a fullstack auction platform built with:

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- React (TypeScript)
- JWT Authentication

This project is part of a fullstack development course and demonstrates how to build a layered Web API with authentication and a modern frontend.

---

## 📌 Features

- User registration and login with JWT
- Role-based authorization (User / Admin)
- Create and manage auctions
- Search auctions
- Place and manage bids
- Soft delete using `IsActive`
- Clean architecture (Controller → Service → Repository)

---

## 🏗 Architecture

The backend follows a structured layered architecture:

- Controllers (API endpoints)
- Service layer (business logic)
- Repository layer (data access)
- Entity Framework Core
- Dependency Injection

The frontend communicates with the API using JWT-based authentication.
