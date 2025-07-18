import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';   
import problemRoutes from './routes/problemRoutes.js';
import { submitSolution } from './controllers/ProblemController.js';
import submissionRoutes from './routes/submissionRoutes.js';
import dashboardRoute from './routes/dashboardRoutes.js'
import reviewRoute from'./routes/review.js';
import contestRoute from'./routes/contest.js';

dotenv.config();

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true, // This allows cookies to be sent with requests
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use('/', userRoutes);
app.use('/problems',problemRoutes);
app.post('/submit/:id',submitSolution);
app.use('/submissions',submissionRoutes);
app.use('/dashboard-stats',dashboardRoute);
app.use('/ai-review', reviewRoute);
app.use('/contests',contestRoute);
app.get('/test', (req, res) => {
  console.log("Test route hit");
  res.send("Test route working");
});


mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000,() => console.log(`Server is running on port ${process.env.PORT || 5000 }`));
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


