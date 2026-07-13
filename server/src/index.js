// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllFoodTrucks()
async function getAllFoodTrucks() {
  const result = await db.query("SELECT * FROM food_trucks");
  return result.rows;
}

// 2. getFoodTruckById(id)

// 3. getVeganFoodTrucks()

// 4. getFoodTrucksByPrice(price)

// 5. getTopRatedFoodTrucks()

// 6. getFoodTrucksSortedByRating()

// Function to retrieve all food trucks from the database
// sorted by their rating from highest to lowest
async function getFoodTrucksSortedByRating() {

  //  a SQL query to select all food trucks
  // and order the results by the rating column in descending order
  const result = await db.query(
    "SELECT * FROM food_trucks ORDER BY rating DESC"
  );

  // Return only the rows containing the food truck data
  return result.rows;
}
// 7. getFoodTrucksSortedByPrice()

// 8. getFoodTrucksCount()

// 9. addOneFoodTruck(...)
async function addOneFoodTruck(
  name,
  current_location,
  daily_special,
  slogan,
  has_vegan_options,
  price_level,
  rating,
) {
  const result = await db.query(
    `INSERT INTO food_trucks
     (name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      current_location,
      daily_special,
      slogan,
      has_vegan_options,
      price_level,
      rating,
    ],
  );

  return result.rows[0];
}

// 10. deleteOneFoodTruck(id)

// 11. updateFoodTruckLocation(id, newLocation)

// 12. updateFoodTruckRating(id, newRating)

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  const trucks = await getAllFoodTrucks();
  res.json(trucks);
});

// 2. GET /get-food-truck-by-id/:id - Ysabel

// 3. GET /get-vegan-food-trucks - Shirley

// 4. GET /get-food-trucks-by-price/:price - Seth

// 5. GET /get-top-rated-food-trucks - Zesty pepper 


// 6. GET /get-food-trucks-sorted-by-rating -  Morgan
// GET endpoint to retrieve all food trucks sorted by their rating
app.get("/get-food-trucks-sorted-by-rating", async (req, res) => {
  try {
    // Calls the helper function to get food trucks from the database
    // ordered from highest rating to lowest rating
    const foodTrucks = await getFoodTrucksSortedByRating();

    // Send a successful response (HTTP 200) with the food truck data as JSON
    res.status(200).json(foodTrucks);

  } catch (error) {
    // Logs the error in the server console for debugging
    console.error(error);

    // Send an error response (HTTP 500) if something goes wrong
    res.status(500).json({
      error: "Failed to retrieve food trucks."
    });
  }
});
// 7. GET /get-food-trucks-sorted-by-price - Jana

// 8. GET /get-food-trucks-count - Hailey

// 9. POST /add-one-food-truck
app.post("/add-one-food-truck", async (req, res) => {
  const {
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  } = req.body;

  const truck = await addOneFoodTruck(
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  );

  res.send(`Success! ${truck.name} was added!`);
});

// 10. POST /delete-one-food-truck/:id - Carlotta

// 11. POST /update-food-truck-location - Arianne

// 12. POST /update-food-truck-rating - BONUS!

