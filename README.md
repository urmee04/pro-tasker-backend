## Project: Full-Stack MERN Application

### Pro-Tasker Backend

Pro-Tasker is a productivity tool API that handles user accounts, project management, and individual tasks. This RESTful API is built with Node.js, Express, and MongoDB.

---

#### Setup Instructions

1. Clone the repository:

```bash
    git clone https://github.com/urmee04/pro-tasker-backend.git

    cd pro-tasker-backend
```

2.  Install dependencies:
    `npm install`
3.  Set up environment variables:
    - Create a .env file in the root directory with the following variables:

```bash
MONGO_URI=mongodb_connection_string
JWT_SECRET=super-secret-jwt-key-here
PORT=3000
```

4. Start the server:
   `npm run dev`

---

#### Project Structure

```bash
├── models/
│   ├── Project.js
│   └── User.js
|   └── Task.js
├── routes/
│   ├── api/
│   │   ├── index.js
│   │   └── projectRoutes.js
|       └── userRoutes.js
|       └── taskRoutes
│   └── index.js
├── Utils/
│   ├── auth.js
|   ├── authorship.js
│
├── config/
│   └── connection.js
├── server.js
└── package.json
```

---

#### Dependencies

- **express:** Web framework for building the backend server and APIs
- **mongoose:** ODM (Object Data Modeling) library for interacting with MongoDB
- **bcrypt:** Library for hashing and securely storing user passwords
- **jsonwebtoken:** For creating and verifying tokens to handle authentication
- **dotenv:** Loads environment variables from a .env file for secure configuration
- **nodemon:** Development tool that automatically restarts the server on code changes
- **cors:** Middleware to enable cross-origin requests between frontend and backend
- **Render** - Platform-as-a-Service for deployment
- **Git** - Version control system

---

#### Deployment

- [Frontend Static Site](https://pro-tasker-frontend-sxmf.onrender.com)
- [Backend Web Service](https://pro-tasker-backend-v3k9.onrender.com)

---

#### Pro-Tasker-Frontend

- [Frontend GitHub Link](https://github.com/urmee04/pro-tasker-frontend)

---

#### Test with Postman

**Step 1: Start server**

- Make sure MongoDB is running and Express server starts without errors: `npm run dev`
- Output should say something like:
  `Server running on http://localhost:3000`

**Step 2: Create a new User (Register)**

- POST http://localhost:3000/api/users/signup

```bash
Request (Body = JSON)
{
"username": "romana",
"email": "romana@example.com",
"password": "password123"
}
```

- Copy the token from the response as we’ll need it for all secure routes

**Step 3: Log in (Get a fresh token if needed)**

- POST http://localhost:3000/api/users/login

```bash
Request (Body = JSON)
{
"email": "romana@example.com",
"password": "password123"
}
```

**Step 4: Create a Project**

- POST http://localhost:3000/api/projects
- Headers- `Authorization: Bearer <paste_token_here>`

```bash
Request (Body = JSON)
{
"name": "First Project",
"description": "This is my first project"
}
```

```bash
Response
{
    "name": "First Project",
    "description": "This is my first project",
    "user": "68b65a58bdf69d5b4f5fac98",
    "_id": "68b90238dbdc8d369a06354e",
    "__v": 0
}
```

- Copy the `id` of the project required for tasks.

**Step 5: Get All Projects**

- GET http://localhost:3000/api/projects
- Headers- `Authorization: Bearer <token>`

```bash
Response
   {
        "_id": "68b90238dbdc8d369a06354e",
        "name": "First Project",
        "description": "This is my first project",
        "user": "68b65a58bdf69d5b4f5fac98",
        "__v": 0
    }
```

**Step 6: Create a Task under Project**

- POST http://localhost:3000/api/projects/projectId/tasks
- Headers - `Authorization: Bearer <token>`

```bash
Request (Body = JSON)
{
"title": "First Task",
"description": "This is my first task",
"status": "To Do"
}
```

```bash
Response
{
    "title": "First Task",
    "description": "This is my first task",
    "status": "To Do",
    "project": "68b90238dbdc8d369a06354e",
    "_id": "68b9059f10fdb78ec3812fd8",
    "__v": 0
}
```

- Copy the id of the task required for updates/deletes.

**Step 7: Get All Tasks for a Project**

- GET http://localhost:3000/api/projects/projectId/tasks
- Headers - `Authorization: Bearer <token>`

```bash
Response
{
        "_id": "68b9059f10fdb78ec3812fd8",
        "title": "First Task",
        "description": "This is my first task",
        "status": "To Do",
        "project": "68b90238dbdc8d369a06354e",
        "__v": 0
}
```

**Step 8: Update a Task**

- PUT http://localhost:3000/api/tasks/taskId
- Headers - `Authorization: Bearer <token>`

```bash
Request (Body = JSON)
{
"status": "Done"
}
```

```bash
Respose
{
    "_id": "68b9059f10fdb78ec3812fd8",
    "title": "First Task",
    "description": "This is my first task",
    "status": "Done",
    "project": "68b90238dbdc8d369a06354e",
    "__v": 0
}
```

**Step 9: Delete a Task**

- DELETE http://localhost:3000/api/tasks/taskId
- Headers - `Authorization: Bearer <token>`

```bash
Response
{
    "message": "Task deleted!"
}
```

**Step 10: Delete a Project**

- DELETE http://localhost:3000/api/projects/projectId
- Headers - `Authorization: Bearer <token>`

```bash
Response
{
    "message": "Project deleted!"
}
```

---

#### References

My primary resource for completing the project was the code from project: Backend Development, class lessons and materials. Additionally, I used the resources mentioned below to deepen my understanding of the concepts and code flow

- [mongoose](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose)

- [mongoDB Bootcamp](https://generalmotors.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065064#overview)

- [express.js Middleware](https://expressjs.com/en/guide/using-middleware.html)

- [render docs](https://render.com/docs/your-first-deploy)
