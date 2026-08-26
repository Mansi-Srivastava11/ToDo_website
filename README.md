# ToDo_website

Keep Notes is a full-stack note management application built with the MERN stack. It provides a clean and professional interface for creating, managing, and organizing notes with persistent data storage.

## 🚀 Live Project

**Live Website:**  
https://mansi-srivastava11.github.io/ToDo_website/

The frontend is deployed using **GitHub Pages**, while the backend REST API is deployed separately.

---

## 📸 Project Screenshots

### Create Note

![Create Note](./frontend/public/createTaskPage.png)

### My Notes

![My Notes](./frontend/public/myNotesPage.png)

### Dashboard

![Dashboard](./frontend/public/dashboardPage.png)

---

## ✨ Features

### 📝 Todo / Notes Management

- Create new notes
- Edit existing notes
- Delete notes
- Mark notes as completed or pending
- Set note priority
- Add due dates
- Search notes
- Sort notes
- View detailed note information
- Dashboard with note statistics
- Responsive layout

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing with bcryptjs
- Protected Todo APIs
- User-specific Todo data
- JWT token stored on the client
- Logout functionality

### 👤 User Experience

- Personalized welcome message
- User name stored using Local Storage
- Login/Register flow
- User-specific workspace
- Clean and professional interface
- Mobile-responsive design

### 🗄️ Database

- MongoDB database
- Mongoose ODM
- Persistent Todo storage
- User collection
- User-to-Todo relationship using `userId`

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript (ES6+)
- CSS3
- Fetch API
- React Hooks
- Local Storage

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- bcryptjs
- CORS
- dotenv

### Deployment & Tools

- Git
- GitHub
- GitHub Actions
- GitHub Pages
- Render
- MongoDB Atlas
- VS Code
- Postman

---

## 🏗️ Project Architecture

ToDo_website/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todo.controller.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── asyncHandler.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── todo.model.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todo.routes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTask/
│   │   │   ├── Dashboard/
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── TaskCard/
│   │   │   ├── TaskDetails/
│   │   │   ├── TaskList/
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── todoService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── vite.config.js
│   ├── package.json
│   └── .env.production
│
├── public/
│   ├── createTaskPage.png
│   ├── myNotesPage.png
│   ├── dashboardPage.png
│   ├── login.png
│   └── register.png
│
└── README.md

## 🔐 Authentication Flow

User
  │
  ├── Register
  │      ↓
  │   Password hashed with bcryptjs
  │      ↓
  │   User saved in MongoDB
  │      ↓
  │   JWT token generated
  │
  └── Login
         ↓
      Credentials verified
         ↓
      JWT token generated
         ↓
      Token stored in Local Storage
         ↓
      Token sent with Todo API requests
         ↓
      Backend identifies req.user
         ↓
      User sees only their own Todos

### 📌 API Endpoints

## Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

## Todos

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/todos`            | Get logged-in user's Todos |
| GET    | `/api/todos/:id`        | Get a Todo by ID           |
| POST   | `/api/todos`            | Create a Todo              |
| PUT    | `/api/todos/:id`        | Update a Todo              |
| PATCH  | `/api/todos/:id/toggle` | Toggle completion          |
| DELETE | `/api/todos/:id`        | Delete a Todo              |

### 💻 Installation & Setup

1. Clone the repository
        git clone https://github.com/Mansi-Srivastava11/ToDo_website.git
        cd ToDo_website
2. Install backend dependencies
        cd backend
        npm install
3. Configure backend environment variables
    Create backend/.env:

        PORT=3001
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
4. Start backend
        npm run dev

The backend will run locally on:    http://localhost:3001
        
5. Install frontend dependencies

Open another terminal:
        cd frontend
        npm install
6. Configure frontend
    Create:
        frontend/.env

    Add:
        VITE_API_URL=http://localhost:3001

7. Start frontend
        npm run dev


### 🔒 Security

        - Passwords are hashed before being stored.
        - JWT is used for authentication.
        - Todo routes are protected with authentication middleware.
        - Each Todo stores the corresponding userId.
        - Users can access only their own Todo data.
        - Environment secrets are kept outside the source code.

### Clone the Repository

    git clone https://github.com/Mansi-Srivastava11/ToDo_website.git
    cd ToDo_website

## 🧠 Key Concepts Demonstrated

This project demonstrates practical knowledge of:

React component architecture
React Hooks
State management
Controlled forms
REST API integration
CRUD operations
Express.js routing
Express middleware
JWT authentication
Password hashing
MongoDB CRUD
Mongoose schemas and models
MongoDB relationships using ObjectId
Error handling
Async/await
Fetch API
Local Storage
Environment variables
CORS
Git/GitHub
GitHub Actions
GitHub Pages deployment
Render deployment
Responsive UI development

## 👩‍💻 Author

**Mansi Srivastava**

MERN Stack Developer

GitHub: https://github.com/Mansi-Srivastava11

---

⭐ If you like this project, consider giving it a star on GitHub.