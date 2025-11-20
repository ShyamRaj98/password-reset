import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Password reset backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
