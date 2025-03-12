// server.js
import express from "express";
import cors from "cors";
import pg from 'pg'; // Correct way to import the pg module
const { Client, Pool } = pg; // Destructure Client and Pool
import dotenv from "dotenv";
import opencage from 'opencage-api-client';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "BloodBankDataset",
    password: "subhojeet",
    port: process.env.DB_PORT || 5434,
});

//  API endpoint for user registration and blood donor data retrieval
app.post('/register', async (req, res) => {
    try {
        const { name, age, phone, dob, latitude, longitude } = req.body;

        // Geocoding using OpenCage API
        const geoResult = await opencage.geocode({ q: `${latitude},${longitude}`, key: "9f0b9e43e0e5448cbf16106e51a0e82c" });

        if (!geoResult.results || geoResult.results.length === 0) {
            return res.status(400).json({ error: 'Could not determine location from coordinates.' });
        }

        const city = geoResult.results[0].components.city || geoResult.results[0].components.town || geoResult.results[0].components.village;
        if (!city) {
          return res.status(400).json({ error: 'City not found in geocoding results.' });
        }

        // SQL Query to find matching donors
        const query = `
            SELECT blood_type, quantity, compatibility, donor_name, donor_age, donor_location, donor_phone
            FROM bloodbankdataset
            WHERE donor_location = $1;
        `;

        const dbResult = await pool.query(query, [city]);

        if (dbResult.rows.length > 0) {
            res.json(dbResult.rows);  // Send the donor data
        } else {
            res.status(404).json({ message: "There is no Blood Donor available near your location" });
        }

    } catch (error) {
        console.error("Error processing registration:", error);
        res.status(500).json({ error: 'Registration failed.', details: error.message });
    }
});

// Extra
//  API endpoint for user registration
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password
        const saltRounds = 10; // Adjust as needed
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // SQL Query to insert the user
        const query = `
            INSERT INTO users (username, password_hash)
            VALUES ($1, $2)
            RETURNING id, username;
        `;

        const values = [username, passwordHash];
        const dbResult = await pool.query(query, values);

        res.status(201).json({ message: "User registered successfully", user: dbResult.rows[0] }); // 201 Created

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: 'Signup failed.', details: error.message });
    }
});

//  API endpoint for user login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieve user from the database
        const query = `SELECT id, username, password_hash FROM users WHERE username = $1`;
        const dbResult = await pool.query(query, [username]);

        if (dbResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
        }

        const user = dbResult.rows[0];

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {
            // Passwords match!
            res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
        } else {
            // Passwords don't match
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Login failed.', details: error.message });
    }
});
// Extra


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});