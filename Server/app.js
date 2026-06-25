import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routers/authRoutes.js";
import adminRoutes from "./src/routers/adminRoutes.js";
import shopRoutes from './src/routers/productRoutes.js'
import cartRoutes from './src/routers/cartRoutes.js';
import addressRoutes from './src/routers/addressRoutes.js';
import orderRoutes from './src/routers/orderRoutes.js'
import AdminRouter from './src/routers/adminorderRoutes.js';
import SearchRouter from './src/routers/searchRoutes.js';
import ReviewRouter from './src/routers/review.Routes.js';
import featureRouter from './src/routers/featureRoutes.js'
import errorHandler from "./src/middleware/errorHandler.js";
dotenv.config();

const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN;

if (!clientOrigin) {
  throw new Error("CLIENT_ORIGIN is required in Server/.env");
}


app.use(cors({
  origin: clientOrigin,
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
app.use('/api/shop/order',orderRoutes)
app.use('/api/admin/order',AdminRouter)
app.use('/api/shop/search',SearchRouter)
app.use('/api/shop/review',ReviewRouter)
app.use("/api/admin/feature",featureRouter)
app.use(errorHandler);

export default app;
