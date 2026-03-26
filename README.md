# Pawsome - Pet Care & Adoption Platform

A full-stack microservices-based application built with React, Node.js, Express, and MongoDB.

## Architecture

This application strictly follows a microservices architecture:

1. **Frontend (Port 3000):** React (Vite) Single Page Application featuring a premium glassmorphism UI.
2. **API Gateway (Port 5000):** Routes incoming frontend requests to correct backend services.
3. **User Service (Port 5001):** Handles auth (JWT) and user profiles.
4. **Pet Service (Port 5002):** Manages pet listings and adoptions.
5. **Booking Service (Port 5003):** Handles vet appointment bookings.
6. **Notification Service (Port 5004):** Mocks sending emails and system notifications.

## Prerequisites

- **Node.js** (v16+)
- **MongoDB** (Running locally on 27017 or via the included docker-compose)
- **Docker** (Optional, for database)

## Setup & Running

1. **Start MongoDB via Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Install Dependencies and Start Services:**
   You will need to open terminal windows for each service and the frontend.

   **API Gateway:**
   ```bash
   cd api-gateway
   npm install
   npm start
   ```

   **User Service:**
   ```bash
   cd user-service
   npm install
   npm start
   ```

   **Pet Service:**
   ```bash
   cd pet-service
   npm install
   npm start
   ```

   **Booking Service:**
   ```bash
   cd booking-service
   npm install
   npm start
   ```

   **Notification Service:**
   ```bash
   cd notification-service
   npm install
   npm start
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the App:**
   Open your browser to `http://localhost:3000` to interact with the Pawsome platform.
