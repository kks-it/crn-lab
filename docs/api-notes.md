# API Notes

## Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

## MedTests

- `GET /api/med-tests`
- `GET /api/med-tests/categories`

## Bookings

- `GET /api/bookings/slots?date=YYYY-MM-DD`
- `GET /api/bookings/my`
- `POST /api/bookings`

## Development Wiring

- Frontend runs on `5173`
- Backend runs on `8080`
- Vite proxy forwards `/api` to Spring Boot
- Spring Security CORS also allows `http://localhost:5173`
