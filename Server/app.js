import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routers/authRoutes.js";
import adminRoutes from "./src/routers/adminRoutes.js";
import shopRoutes from './src/routers/productRotues.js'
import cartRoutes from './src/routers/cartRoutes.js';
import addressRoutes from './src/routers/addressRoutes.js';
import orderRotues from './src/routers/orderRotues.js'
import AdminRouter from './src/routers/adminorderRoutes.js';
import SearchRouter from './src/routers/searchRoutes.js';
import ReviewRouter from './src/routers/review.Routes.js';
import FeatureRotuer from './src/routers/featureRoutes.js'
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
app.use('/api/shop/cart',cartRoutes)
app.use('/api/shop/address',addressRoutes)
app.use('/api/shop/order',orderRotues)
app.use('/api/admin/order',AdminRouter)
app.use('/api/shop/search',SearchRouter)
app.use('/api/shop/review',ReviewRouter)
app.use("/api/admin/feature",FeatureRotuer)

export default app;
