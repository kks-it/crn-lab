# CRN Lab

CRN Lab is a full-stack pathology lab website with a Spring Boot backend and a React + Vite frontend. Patients can browse a professional MedTest catalog, add tests to a cart, sign up or log in, and complete bookings for a lab visit or home sample collection.

## Stack

- Backend: Java 21, Spring Boot, Spring Security with JWT, Spring Data JPA
- Frontend: React, Vite, Tailwind CSS, Lucide React
- Database: H2 for development, PostgreSQL-ready dependency included

## Project Structure

- `backend/`: Spring Boot API for auth, MedTests, slots, and bookings
- `frontend/`: React application with the patient-facing UI

## Run Backend

```bash
cd backend
mvn spring-boot:run
```

The API runs on `http://localhost:8080`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` requests to the backend.

## Core Features

- Patient sign-up and login with JWT-based authentication
- Public MedTest catalog with categories, prices, and special instructions
- Cart and checkout workflow for multiple MedTests
- Booking form with lab visit and home collection options
- Two-hour booking slots from `09:00 AM` to `09:00 PM`
- Booking summary that prominently surfaces all special instructions
- Configurable logo source in `frontend/src/config/appConfig.js`
