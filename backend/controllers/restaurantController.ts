import { Request, Response } from "express";
import { db } from "../database";

// @desc Get all restaurants with reviews
// @route GET /api/v1/restaurants
// @access Public
const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurantRatingsData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id"
    );

    res.status(200).json({
      success: true,
      length: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData["rows"], // results.rows is an array of objects (each object is a restaurant)
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc Get a single restaurant with reviews
// @route GET /api/v1/restaurants/:id
// @access Public
const getRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // $1 is a placeholder for the first value in the array passed as the second argument to query()
    // const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [id]
    );

    // we get an array of reviews here instead of making another route
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [id]
    );
    res.status(200).json({
      success: true,
      data: {
        // restaurant: restaurant.rows[0], // restaurant.rows[0] is an object (a restaurant)
        restaurant: restaurant["rows"][0],
        reviews: reviews.rows, // reviews.rows is an array of objects (each object is a review)
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc Create a restaurant
// @route POST /api/v1/restaurants
// @access Public
const createRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  try {
    // RETURNING * returns the newly created restaurant because by default it will not return anything
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    res.status(201).json({
      success: true,
      data: {
        restaurant: results["rows"][0],
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc Update a restaurant
// @route PUT /api/v1/restaurants/:id
// @access Public
const updateRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      success: true,
      data: {
        restaurant: results["rows"][0],
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc Delete a restaurant
// @route DELETE /api/v1/restaurants/:id
// @access Public
const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [id]);
    res.status(204).json({
      success: true,
      message: "Restaurant deleted",
      data: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc Create a review
// @route POST /api/v1/restaurants/:id/addReview
// @access Public
const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;
  try {
    const results = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, review, rating]
    );
    res.status(201).json({
      success: true,
      data: {
        review: results["rows"][0],
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

//@desc Delete a review
//@route DELETE /api/v1/restaurants/:id/deleteReview
//@access Public
const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM reviews WHERE id = $1", [id]);
    res.status(204).json({
      success: true,
      message: "Review deleted",
      data: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};


export {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addReview,
  deleteReview,
};
