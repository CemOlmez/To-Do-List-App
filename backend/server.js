import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js"

import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);



app.listen(PORT, () => {
    console.log(`Server runnıng at http://localhost:${PORT}`)
    connectMongoDB();
})