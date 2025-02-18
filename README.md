# Remix Node Spaces App

A web application built with Remix, Node.js, and Docker.

## Project Structure
```
.
├── frontend/        # Remix frontend application
├── backend/         # Node.js backend API
└── docker-compose.yml
```

## Prerequisites
- Docker
- Docker Compose

## Getting Started

### 1. Clone the repository:
```bash
git clone <repository-url>
cd remix-node-spaces-app
```
### 2. Environment Setup:
Create .env file in the backend directory:

```bash
cd backend
cp .env.example .env
```
Create .env file in the frontend directory:

```bash
cd frontend
cp .env.example .env
```
### 3. Build and Run with Docker:
```bash
# Development mode
docker-compose up --build

# Production mode (not yet ready)
NODE_ENV=production docker-compose up --build
```

The application will be available at:

* Frontend: http://localhost:3000
* Backend API: http://localhost:5000 (for testing using Postman or any other tool)

## Development
To install new dependencies:
```bash
# Frontend dependencies
docker-compose exec frontend npm install <package-name>

# Backend dependencies
docker-compose exec backend npm install <package-name>
```
## Docker Commands
Common commands you might need:
```bash
# Stop the containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Run commands in containers
docker-compose exec frontend npm install <package-name>
docker-compose exec backend npm install <package-name>
```