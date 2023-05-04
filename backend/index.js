"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create instance of express app
const app = (0, express_1.default)();
// Port number is set in the .env file
const port = process.env.PORT || 3000;
// Middleware & Enable CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/build")));
// Welcome route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the restaurant finder API",
    });
});
// Routes
app.use("/api/v1/restaurants", restaurant_routes_1.default);
// Listen on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/build/index.html"));
});
