import authRoutes from "./routes/authRoutes.js";
import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.middleware.js';

//Load environment variables
dotenv.config();

const app = express();


//Middleware
app.use(cors());
app.use(express.json());

//Connect to Database
connectDB();

//Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

//Error Handling Middleware
app.use(errorHandler);

app.get("/api/health", (req, res) => { 
    res.json({ 
        success: true, 
        message: "Todo API is running" 
    }); 
});

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0" , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});