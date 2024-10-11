## **Backend REST API - Senior Backend Engineer Test**

### **Overview**

This project is a RESTful API built using Node.js, Express, TypeScript, and PostgreSQL. The API allows users to create users, posts, and comments, and also features a performance-optimized endpoint for fetching the top 3 users with the most posts and their latest comments.

### **Project Features**
- **Database Design**: 
  - Three tables: Users, Posts, and Comments.
  - Relationships: Users can have multiple posts, and each post can have multiple comments.
  - Indexes for optimized query performance.
  
- **API Endpoints**:
  - **Create and retrieve users** (`POST /users`, `GET /users`)
  - **Create posts for a user and retrieve all posts by user** (`POST /users/:id/posts`, `GET /users/:id/posts`)
  - **Add a comment to a post** (`POST /posts/:postId/comments`)
  - **Fetch top 3 users with most posts and their latest comment** (`GET /users/top`)

- **Middleware**:
  - JWT-based token authentication.
  - Error handling for all routes.

### **Running the Project Locally**

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
# .env file
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=backend_test
JWT_SECRET=your_jwt_secret
```

4. Start the database using Docker:

```bash
docker-compose up
```

5. Build the project:

```bash
npm run build
```

6. Run the project:

```bash
npm start
```

7. To run tests:

```bash
npm test
```

### **Docker Setup**

- The project is fully containerized using Docker. The `docker-compose.yml` file spins up both the Node.js application and PostgreSQL database.
  
```bash
docker-compose up --build
```

This will start the app on `http://localhost:3000`.

### **API Endpoints**

| Method | Endpoint                        | Description                                    |
|--------|----------------------------------|------------------------------------------------|
| POST   | `/users`                         | Create a new user                              |
| GET    | `/users`                         | Retrieve all users                             |
| POST   | `/users/:id/posts`               | Create a new post for a user                   |
| GET    | `/users/:id/posts`               | Retrieve all posts by a user                   |
| POST   | `/posts/:postId/comments`        | Add a comment to a post                        |
| GET    | `/users/top`                     | Fetch top 3 users with most posts and comments |

### **Tests**

- **Unit tests** are implemented for both the service and controller layers.
- To run tests, use the command:

```bash
npm test
```

- To generate a coverage report:

```bash
npm run test:coverage
```

### **Postman Documentation**

You can access the Postman collection for this API [here](#).

### **Submission Requirements**
- Repository: [GitHub Repo Link](#)
- Hosted API: [Heroku URL](#)
- Postman Collection: [Public Postman URL](#)

### **License**

This project is licensed under the MIT License.

---

### Final Checklist:

- **API**: All required endpoints are implemented.
- **Performance Challenge**: The `/users/top` endpoint is optimized.
- **Middleware**: JWT authentication is in place.
- **Error Handling**: Handled using `errorHandler` middleware.
- **Tests**: Jest tests are added for controllers and services.
- **Docker**: Both Dockerfile and docker-compose are in place.
- **Postman**: Generate and share Postman collection for all endpoints.
- **GitHub Documentation**: README file covers setup, usage, and testing.

