# MERN Admin Task Distribution System

A production-ready MERN stack application that allows an admin to manage agents
and distribute tasks via CSV/Excel upload using round-robin method.

Live Demo: \
Frontend: https://mern-machine-test-frontend.vercel.app \
Backend: https://mern-machine-backend.onrender.com

Demo Admin Credentials (for evaluation purposes only): \
Email: admin@test.com \
Password: password123

---

## Tech Stack

Frontend:

- React (Vite)
- Material UI
- React Router
- Environment-based configuration

Backend:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (File Upload)
- XLSX / CSV parsing

Deployment:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Core Features

- Admin authentication using JWT
- Protected routes
- Agent creation with full validation
- Duplicate email prevention
- CSV / Excel upload
- Round-robin task distribution
- Globally unique phone number enforcement
- Backend validation for duplicate records
- Production-ready CORS configuration
- Environment variable based configuration
- SPA routing fix for Vercel
- Structured error handling

---

## Architecture Overview

Frontend (Vercel) -> Backend API (Render) -> MongoDB Atlas

Authentication Flow: Admin Login → JWT issued → Token stored → Authenticated API
access

Task Distribution Flow: Upload File → Parse Records → Validate → Round Robin
Assign → Insert to DB

---

## Environment-Based Configuration

The application uses environment variables to separate development and
production configurations:

- Frontend reads API base URL using `VITE_API_URL`
- Backend reads allowed CORS origin using `FRONTEND_URL`
- No URLs are hardcoded in production

---

## Project Structure

| mern-machine-test |
| ----------------- |

| Backend           | Frontend          | .gitignore | README.md |
| ----------------- | ----------------- | ---------- | --------- |
| src /             | src /             |
| index.js          | .gitignore        |
| package-lock.json | eslint.config.js  |
| package.json      | index.html        |
|                   | package-lock.json |
|                   | package.json      |
|                   | vercel.json       |
|                   | vite.config.js    |

---

## Running Locally

### 1. Backend Setup

```
cd backend

npm install

Create .env file:
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173

Run: npm run dev
```

### 2. Frontend Setup

```
cd frontend
npm install

Create .env file:
VITE_API_URL=http://localhost:4000

Run: npm run dev
```

---

## Production configuration

Backend Environment Variables ( Render ):

- PORT
- MONGO_URI
- JWT_SECRET
- FRONTEND_URL = https://your-vercel-domain.vercel.app

Frontend Environment Variable ( Vercel ):

- VITE_API_URL = https://your-render-backend-url.onrender.com
