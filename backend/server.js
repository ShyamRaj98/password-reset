import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";

dotenv.config();

const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: [
    "https://login-password-reset.netlify.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Handle OPTIONS preflight requests safely
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"] || "*"
    );
    return res.sendStatus(204);
  }
  next();
});

// ✅ Connect MongoDB
connectDB(process.env.MONGO_URI);

// ✅ Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => res.send("Password reset backend is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
