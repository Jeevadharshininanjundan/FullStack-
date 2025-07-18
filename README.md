# CodeJudge - Full-Stack Online Judge Platform

##  Overview
Code Quest is a full-stack competitive programming platform that allows users to practice coding problems, participate in contests, track progress via heatmaps and leaderboards, and more.

##  Features
- User Authentication (JWT-based)
- Problem Solving (with Docker-based compiler support)
- Contests & Leaderboard
- Submission tracking
- Heatmap streaks visualization
- Admin panel for problem and contest management

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Chart.js
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

### Compiler Server (Dockerized Microservice)
- Node.js
- Docker

##  Installation and Setup

### 1. Clone the repository
```bash
 git clone https://github.com/Jeevadharshininanjundan/fullstack-.git
 cd code-quest
```

### 2. Setup Backend (Server)
```bash
 cd server
 npm install
 npm run dev
```

### 3. Setup Frontend (Client)
```bash
 cd client
 npm install
 npm run dev
```

### 4. Setup Compiler Server (Dockerized)
```bash
 cd compilerServer
 docker build -t compiler-server .
 docker run -d -p 8000:8000 --name compiler-server compiler-server
```

Make sure your backend API calls the compiler service at `http://localhost:8000`.

##  API Endpoints

### Auth
```http
POST   /register
POST   /login
GET    /me
```

### Problems
```http
GET    /problems
POST   /problems      // Admin only
GET    /problems/:id
```

### Submissions
```http
POST   /submit
GET    /submissions/:userId
```

### Contests
```http
GET    /contests
POST   /contests       // Admin only
GET    /contests/:id
GET    /contests/:id/leaderboard
```

### Compiler Server
```http
POST   /run
```
Payload: `{ language: 'cpp', code: 'your_code_here' }`

##  Docker Support

The `compilerServer` is dockerized to ensure secure and isolated code execution.

### Run Manually
```bash
cd compilerServer
docker build -t compiler-server .
docker run -d -p 8000:8000 compiler-server
```

If using `docker-compose` (optional):
```bash
docker-compose up --build
```

##  Usage
- Register/Login to your account
- Solve problems and track your progress
- Participate in contests and climb the leaderboard
- View your heatmap streak and improve your consistency

##  Author
- Jeevadharshini
- [GitHub Profile](https://github.com/Jeevadharshininanjundan)

##  Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
