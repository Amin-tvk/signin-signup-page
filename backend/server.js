require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Use CORS middleware
app.use(cors({
  origin: "*", 
  methods: "GET, POST, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}));

app.use(bodyParser.json());

// Set up PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Check database connection on startup
(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

// Root route
app.get("/", (req, res) => {
  console.log("Request received on / (Root route)");
  res.send("Welcome to the User Signup and Login API!");
});

// Signup route
app.post("/signup", async (req, res) => {
  console.log("Request received on /signup route with data:", req.body);
  const { name, email, password, age, favoriteFood } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, age, favorite_food) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, age, favoriteFood]
    );
    res.status(201).json({ message: "User created successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Error saving user data:", err);
    res.status(500).json({ message: "Error saving user data" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  console.log("Request received on /login route with data:", req.body);
  const { email, password } = req.body;

  try {
    // Query the database to find the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    // If user not found, return error
    if (result.rows.length === 0) {
      console.log("Invalid email or password attempt");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Verify the password directly (not recommended)
    if (password !== user.password) {
      console.log("Invalid password attempt for user:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, return user details (excluding password)
    console.log("User logged in successfully:", user.email);
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: "Login successful", user: userWithoutPassword });
  } catch (err) {
    console.error("Error checking user data:", err);
    res.status(500).json({ message: "Error checking user data" });
  }
});

// Listen on the specified port
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
