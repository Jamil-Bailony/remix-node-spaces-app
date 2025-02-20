# Remix Node Spaces App

A web application built with Remix, Node.js, and Docker.

## Project Details
### Project Structure
```
.
├── frontend/        # Remix frontend application
├── backend/         # Node.js backend API
└── docker compose.yml
```

### Tech Stack
- Node.js and Express.js
- DynamoDB Local
- Docker
- Remix

## Prerequisites
- Docker
- Docker Compose

## Getting Started

### 1. Clone the repository:
```bash
git clone git@github.com:Jamil-Bailony/remix-node-spaces-app.git
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
### 3. Database Setup
The application uses DynamoDB for data storage. The following tables will be created:
- Users
- Spaces
- Feeds
- Comments
- Reactions

To set up the database, we need to create those tables first:
```bash
# Start the containers
## for the first time
docker compose up --build -d
## after building them
docker compose up -d

# Run database migrations
docker compose exec backend npm run migrate

# Seed the database with sample data (optional for development)
docker compose exec backend npm run seed

# Alternative: Run both migration and seeding
docker compose exec backend npm run setup-db
```

### 4. Build and Run with Docker:
```bash
# Development mode
docker compose up --build

# Production mode (not yet ready), images for DEV now
NODE_ENV=production docker compose up --build
```

The application will be available at:

* Frontend: http://localhost:3000
* Backend API: http://localhost:5000 (for testing using Postman or any other tool)

Note: change the ports if there's any conflict.

### 5. Database Reset:
To reset the database and start fresh:
```bash
# Stop containers and remove volumes
docker compose down -v

# Start containers
docker compose up -d

# Run migrations and seed
docker compose exec backend npm run setup-db
```

### 6. Development
To install new dependencies:
```bash
# Frontend dependencies
docker compose exec frontend npm install <package-name>

# Backend dependencies
docker compose exec backend npm install <package-name>
```

## Troubleshooting
### Database Connection Issues
If you encounter database connection issues:
```bash
# Check if DynamoDB container is running
docker compose ps

# Check DynamoDB logs
docker compose logs database

# Restart the database container
docker compose restart database

# Reset database and run setup again
docker compose down -v
rm -rf database
docker compose up -d
docker compose exec backend npm run migrate
docker compose exec backend npm run seed

```

## Additional Resources (TODO add links)
- DynamoDB Local Documentation
- Node and Express Documentation
- Remix Documentation
- Docker Documentation
