import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routers/authRoutes.js";
import adminRoutes from "./src/routers/adminRoutes.js";
import shopRoutes from './src/routers/productRotues.js'
dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminRoutes);
app.use('/api/shop/products',shopRoutes)

export default app;
