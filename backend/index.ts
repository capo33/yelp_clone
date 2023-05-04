import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import restaurantRoutes from "./routes/restaurant.routes";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Create instance of express app
const app = express();

// Port number is set in the .env file
const port = process.env.PORT || 3000;

// Middleware & Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the restaurant finder API",
  });
});

// Routes
app.use("/api/v1/restaurants", restaurantRoutes);

// Listen on port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
