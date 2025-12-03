# 🚀 Task Management API - NestJS Backend

A robust and secure **Task Management API** built with **NestJS**, following best practices for modular, scalable, and maintainable applications. This backend handles user authentication and full CRUD operations for tasks, utilizing **JWT** for authorization and **PostgreSQL** as the primary database.

## ✨ Features

* **Secure Authentication:** User registration and login protected by JSON Web Tokens (**JWT**).
* **Password Hashing:** Passwords secured using the industry-standard **bcrypt** hashing algorithm.
* **Task Management:** Full **CRUD (Create, Read, Update, Delete)** operations for user-specific tasks.
* **Guarded Endpoints:** All task operations are protected using **NestJS `AuthGuard`** to ensure proper authorization.
* **Database:** Persistent data storage using **PostgreSQL** with **TypeORM** for object-relational mapping.
* **Robust Testing:** Comprehensive **unit and end-to-end test cases** for all controllers and services.

## 🔗 Deployment Status

| Component | Platform | Status |
| :--- | :--- | :--- |
| **Backend API** | Render | Deployed (Link/Status Here) |
| **Frontend** | Vercel | Deployed (Link/Status Here) |

> **Note:** Please replace `(Link/Status Here)` with your actual deployment links and status.

---

## 💻 Local Setup and Installation

### Prerequisites

* Node.js (LTS recommended)
* npm or yarn
* PostgreSQL database instance

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd [Your Project Folder]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your configuration details. This format is preferred for deployment platforms like Render.

    ```dotenv
    # Database Configuration (PostgreSQL URI format used by Render/TypeORM)
    DATABASE_URL="postgres://user:password@host:port/database_name?ssl=true"
    
    # JWT Configuration
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRATION_TIME=3600s
    
    # Application Port
    PORT=3001
    ```

4.  **Run the application:**
    ```bash
    # Run in development mode
    npm run start:dev
    ```
    The application will be accessible at `http://localhost:3001`.

---

## 🧪 Running Tests

The project includes thorough testing to ensure reliability and stability.

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run tests with coverage report
npm run test:cov
```

| Method   | Endpoint             | Description         | Details                                                               |
| -------- | -------------------- | ------------------- | --------------------------------------------------------------------- |
| **POST** | `/api/auth/register` | Register a new user | Uses bcrypt for password hashing and returns a JWT token upon success |
| **POST** | `/api/auth/login`    | Authenticate a user | Validates user credentials and generates a JWT token                  |

Task Routes (Protected — Require JWT Bearer Token)

Include header:
Authorization: Bearer <YOUR_JWT_TOKEN>

| Method     | Endpoint          | Description                                  | Requires Auth |
| ---------- | ----------------- | -------------------------------------------- | ------------- |
| **POST**   | `/api/tasks`      | Create a new task for the authenticated user | Yes           |
| **GET**    | `/api/tasks/user` | Fetch all tasks of the authenticated user    | Yes           |
| **PATCH**  | `/api/tasks/:id`  | Update a task by ID                          | Yes           |
| **DELETE** | `/api/tasks/:id`  | Delete a task by ID                          | Yes           |



🧑‍💻 Built With
NestJS: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

TypeORM: ORM used for interacting with the database.

PostgreSQL: Robust open-source object-relational database system.

TypeScript: Primary language for type safety and scalability.

JWT & bcrypt: For secure authentication and password management.

Jest: Testing framework for unit and E2E tests.

🤝 Contribution
Contributions are welcome! Please open an issue or submit a pull request for any features, bug fixes, or improvements.

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
