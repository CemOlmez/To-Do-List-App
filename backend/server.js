import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js"

import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server runnıng at http://localhost:${PORT}`)
    connectMongoDB();
})