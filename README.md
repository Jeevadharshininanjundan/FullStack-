💻 FullStack Coding Platform
A full-stack coding practice and contest platform with user authentication, submission tracking, calendar heatmap streaks, and AI-powered answer review. Built using the MERN stack and deployed on Azure.

📌 Features
✅ User Authentication (JWT)

📚 Problem Bank (Add/Edit/View)

🧠 AI Answer Review

🧮 Submission Tracker

📅 Heatmap Calendar for Streaks

🏆 Contest System & Leaderboard

🛠️ Admin Panel

🛠️ Tech Stack
🔷 Frontend
React.js + React Router

Tailwind CSS

Axios

react-calendar-heatmap

🔶 Backend
Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

☁️ Deployment
Frontend: Azure Static Web Apps

Backend: Azure App Service

Database: MongoDB Atlas (Cloud-hosted)

📂 Folder Structure
bash
Copy
Edit
project-root/
├── client/       # React Frontend
├── server/          # Express Backend
├── README.md
└── ...
🚀 Local Development
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Jeevadharshininanjundan/fullstack-.git
cd fullstack-coding-platform
2. Setup Backend
bash
Copy
Edit
cd server
npm install
touch .env
# Add environment variables (see below)
npm run dev
3. Setup Frontend
bash
Copy
Edit
cd ../client
npm install
npm run dev
🔐 Backend .env File
env
Copy
Edit
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000


🔷 Use MongoDB Atlas
Go to https://www.mongodb.com/cloud/atlas

Create a cluster and database

Whitelist your Azure IP in Network Access

Replace MONGO_URI in .env with the connection string

🧪 Testing API (Postman)
Test API routes like:

POST /signup

POST /login

POST /problems

POST /submissions

GET /calendar/streak

📊 Heatmap Calendar
Implemented using react-calendar-heatmap. It shows streaks based on daily submission counts.

🎯 AI Answer Review (Optional)
Integrate with OpenAI or a custom model:

bash
Copy
Edit
POST /ai-review
{
  "question": "What is AI?",
  "answer": "AI is the simulation of human intelligence..."
}
🙋‍♀️ Author
Jeevadharshini Nanjundan
2nd Year – Computer Science and Business Systems
Rajalakshmi Institute of Technology
