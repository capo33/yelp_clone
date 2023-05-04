"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.addReview = exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurant = exports.getRestaurants = void 0;
const database_1 = require("../database");
// @desc Get all restaurants with reviews
// @route GET /api/v1/restaurants
// @access Public
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantRatingsData = yield database_1.db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id");
        res.status(200).json({
            success: true,
            length: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData["rows"], // results.rows is an array of objects (each object is a restaurant)
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.getRestaurants = getRestaurants;
// @desc Get a single restaurant with reviews
// @route GET /api/v1/restaurants/:id
// @access Public
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // $1 is a placeholder for the first value in the array passed as the second argument to query()
        // const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
        const restaurant = yield database_1.db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1", [id]);
        // we get an array of reviews here instead of making another route
        const reviews = yield database_1.db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [id]);
        res.status(200).json({
            success: true,
            data: {
                // restaurant: restaurant.rows[0], // restaurant.rows[0] is an object (a restaurant)
                restaurant: restaurant["rows"][0],
                reviews: reviews.rows, // reviews.rows is an array of objects (each object is a review)
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.getRestaurant = getRestaurant;
// @desc Create a restaurant
// @route POST /api/v1/restaurants
// @access Public
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, price_range } = req.body;
    try {
        // RETURNING * returns the newly created restaurant because by default it will not return anything
        const results = yield database_1.db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [name, location, price_range]);
        res.status(201).json({
            success: true,
            data: {
                restaurant: results["rows"][0],
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.createRestaurant = createRestaurant;
// @desc Update a restaurant
// @route PUT /api/v1/restaurants/:id
// @access Public
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    try {
        const results = yield database_1.db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [name, location, price_range, id]);
        res.status(200).json({
            success: true,
            data: {
                restaurant: results["rows"][0],
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.updateRestaurant = updateRestaurant;
// @desc Delete a restaurant
// @route DELETE /api/v1/restaurants/:id
// @access Public
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.db.query("DELETE FROM restaurants WHERE id = $1", [id]);
        res.status(204).json({
            success: true,
            message: "Restaurant deleted",
            data: null,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.deleteRestaurant = deleteRestaurant;
// @desc Create a review
// @route POST /api/v1/restaurants/:id/addReview
// @access Public
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, review, rating } = req.body;
    try {
        const results = yield database_1.db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [id, name, review, rating]);
        res.status(201).json({
            success: true,
            data: {
                review: results["rows"][0],
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.addReview = addReview;
//@desc Delete a review
//@route DELETE /api/v1/restaurants/:id/deleteReview
//@access Public
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.db.query("DELETE FROM reviews WHERE id = $1", [id]);
        res.status(204).json({
            success: true,
            message: "Review deleted",
            data: null,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
});
exports.deleteReview = deleteReview;
