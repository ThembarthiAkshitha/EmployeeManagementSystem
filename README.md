# Employee Management System (EMS)

## About the Project

The Employee Management System is a web application developed using React.js, Node.js, Express.js, and SQLite. It helps administrators manage employee information and supports secure login and role-based access for administrators and employees.

## Features

- User authentication using JWT
- Protected routes
- Role-based access control
- Employee management
- Add and update employee details
- Department management
- SQLite database integration

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Context API

### Backend
- Node.js
- Express.js
- REST APIs
- JWT authentication
- bcrypt password hashing
- SQLite database

## Project Structure

```text
EMS/
├── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── backend/
    ├── server.js
    ├── package.json
    └── ems.db
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd EMS
```

### 2. Run the Backend

```bash
cd backend
npm install
node server.js
```

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

## Local URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Author

Akshitha Thembarthi
