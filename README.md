# OptimalFlow - Backend Interview Task

This is a backend interview task for **OptimalFlow**, built using **Node.js**, **Express**, and **TypeScript**. The project demonstrates user management, authentication, and fund transfers between users, following best practices in code organization and security.

## ✨ Features

- Register users with hashed passwords (bcrypt)
- User login with JWT authentication
- View user list (excluding passwords)
- Retrieve individual user data
- Transfer funds between users
- View transfer history
- Zod validation for request inputs
- Security headers via Helmet
- Rate limiting to prevent brute-force attacks
- Sanitized user input to prevent XSS
- Modular codebase with separation of concerns
- Unit/integration tests using Jest and Supertest

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/TerryMinn/optimalflow-interview.git
cd optimalflow-interview
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```
# Database
DATABASE_URL=

# Application
PORT=3000
SALT_ROUNDS=10
JWT_SECRET=
ORIGIN=

# Seeding
SEED_EMAIL=
SEED_PASSWORD=
SEED_NAME=
SEED_EMAIL_S=
SEED_PASSWORD_S=
SEED_NAME_S=
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

### 5. Database Initialization

**Mac (Homebrew)**

```bash
brew install postgresql
brew services start postgresql
```

**Linux (Debian/Ubuntu)**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows (via Installer)**

1. Download the installer from: https://www.postgresql.org/download/windows/
2. Run the setup and remember your username/password.

### 6. Run the project

**Development mode**

```bash
npm run dev
```

**Production mode**

```bash
npm run build
npm start
```

**Running tests**

```bash
npm run seed
npm test
```

## 📬 API Endpoints

All endpoints are available in the provided [Postman Collection]("./app.postman_collection.json").

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/users`              | Register a new user           |
| POST   | `/login`              | Authenticate a user           |
| GET    | `/users`              | List all users (no passwords) |
| GET    | `/users/:id`          | Get user details              |
| POST   | `/transfer`           | Transfer funds                |
| GET    | `/transfer`           | List all transfers            |
| GET    | `/users/:id/transfer` | Transfer history for a user   |

## 🔐 Authentication

Authenticated routes require a `Bearer Token` in headers.

## 🧪 Postman Collection

Use the provided file: app.postman_collection.json

- Set the {{local}} variable to your local server address, e.g., http://localhost:3000

- Make sure to login first to obtain a JWT token

- Use the token in the Bearer Authorization header for protected routes

## 📦 Tech Stack

- Node.js + Express

- Prisma + SQLite (can be swapped with PostgreSQL)

- Zod – for request validation

- Jest + Supertest – testing

- Helmet, CORS, Rate-Limiter – for security

- JWT – authentication

- Docker – optional setup available

## 🧱 Project Structure

```
src/
├── config/           # App-level configurations (env, constants)
├── controllers/      # Route handlers
├── generated/        # Prisma generated files
├── middleware/       # Auth, error handler, rate limiter etc.
├── routes/           # Express route definitions
├── services/         # Business logic
├── tests/            # Jest/Supertest test cases
├── types/            # Custom TypeScript types
│   ├── express/      # Express-specific typings (e.g., request extensions)
│   ├── util/         # Utility types
│   └── validation/   # Zod schema types
├── app.ts            # Express app setup
└── server.ts         # Main server entry point

Other root files:
├── prisma/           # Prisma schema and seed data
├── Dockerfile        # Docker setup
├── docker-compose.yml # Compose setup (optional)
├── app.postman_collection.json # API endpoints for testing
├── .env              # Environment variables
├── jest.config.js    # Test configuration
├── tsconfig.json     # TypeScript config
└── README.md         # Project documentation

```

## 📈 Scalability Thoughts

- **Database**: Add indexes, query optimization, and connection pooling (e.g., PgBouncer).
- **Caching**: Implement caching for frequently accessed data to reduce database load (e.g., redis).
- **Load Balancing**: If the application becomes popular, consider using a load balancer to distribute incoming traffic.
- **Monitoring**: Set up monitoring tools to track application performance and identify potential bottlenecks.
- **Scaling**: If the application needs to handle more users, consider scaling the application horizontally (e.g., adding more servers).
- **Security**: Regularly update dependencies and keep your application secure.
- **Scalability Testing**: Perform scalability testing to ensure the application can handle increased load.
- **Queueing**: If the application needs to handle a large volume of transactions, consider using a queueing system (e.g., RabbitMQ).
- **Containerization**: Containerize the application to make it easier to deploy and scale.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Set up CI/CD pipelines to automate testing and deployment.
- **Microservice**: If the application becomes more complex, consider breaking it down into smaller microservices.

## 🐳 Docker Setup

Make sure you have Docker installed and running.

### Build and run the app

```bash
docker compose build
docker compose up
```

## 📝 Author

Terry Minn
shinthantmin32@gmail.com
