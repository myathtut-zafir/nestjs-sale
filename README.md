# NestJS Project Boilerplate

This is a robust backend project built with NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It includes a complete setup for authentication, database management, validation, and API documentation.

---

## ✨ Features

* **Framework**: [NestJS](https://nestjs.com/)
* **Authentication**: JWT-based authentication using `@nestjs/jwt`.
* **Authorization**: Secure endpoints with Guards for role-based access control.
* **Database**: TypeORM with PostgreSQL for production/development and SQLite for testing.
* **Data Validation**:
    * **DTOs**: Strictly-typed data transfer objects for API requests and responses.
    * **ValidationPipe**: Automatic request payload validation.
    * **Custom Validators**: Business-specific validation logic.
* **API Documentation**: Automatic API documentation generation with Swagger (OpenAPI).
* **Request/Response Handling**: Global interceptors for transforming response data.
* **Testing**: End-to-end (e2e) tests configured to run against an in-memory SQLite database for fast and isolated testing.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn
* PostgreSQL database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

---

## ⚙️ Configuration

1.  **Create an environment file:**
    Copy the `.env.example` file to a new file named `.env`.

    ```bash
    cp .env.example .env
    ```

2.  **Update environment variables in `.env`:**
    Fill in the necessary values for your PostgreSQL database and JWT configuration.

    ```env
    # Application Port
    PORT=3000

    # PostgreSQL Database Configuration
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_user
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name

    # JWT Configuration
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRATION_TIME=3600s
    ```
---

## ▶️ Running the App

### Development Mode

To run the application in development mode with file watching:

```bash
npm run start:dev