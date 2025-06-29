import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import adminProductsRouter from "./routes/productRoutes.js";
import shopProductsRouter from "./routes/shopProductRoutes.js";
import shopCartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import adminOrderRouter from "./routes/adminOrderRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGODB_KEY = process.env.MONGODB_KEY;

mongoose
  .connect(MONGODB_KEY)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => {
    console.log(`Error in MongoDB connection : ${error}`);
  });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/order", orderRouter);
app.use("/api/admin", adminOrderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
