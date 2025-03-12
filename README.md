# Blood Donor Registration System

A web application for managing blood donor registration, built with Node.js, React, and PostgreSQL.

## Features

*   User Registration: Allows new users to create accounts.
*   User Login: Authenticates existing users.
*   Location-Based Donor Search: Finds available blood donors near a user's location using geolocation and the OpenCage Geocoding API.
*   [Planned] Secure Authentication: JWT or similar for secure session management.

## Technologies Used

*   **Frontend:**
    *   React.js
    *   React Router DOM: For navigation and routing.
    *   HTML
    *   CSS (Custom): For styling components.
*   **Backend:**
    *   Node.js
    *   Express.js: For creating the API endpoints.
    *   CORS: For handling Cross-Origin Resource Sharing.
    *   dotenv: For managing environment variables.
    *   PostgreSQL: As the database.
    *   pg: PostgreSQL client for Node.js.
    *   bcrypt: For hashing passwords.
    *   opencage-api-client: To reverse geocode latitude and longitude into city names.

## Setup Instructions

### Prerequisites

*   Node.js (v16 or higher)
*   npm (Node Package Manager)
*   PostgreSQL Database
*   OpenCage API Key

### Backend Setup

1.  **Clone the repository:**

```bash
git clone [repository-url]
cd Blood_Bridge-main/Backend
```

2. ***In dependencies:***

```bash
npm install
```

3. ***Configure environment variables:***

Create a .env file in the Backend directory based on the .env.example file. Set the following variables:

```bash
PORT=5001
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
OPENCAGE_API_KEY=your_opencage_api_key
```

4. ***Set up the PostgreSQL database:***

Install PostgreSQL if you don't have it.

Create a database named your_db_name.

Create the users table using the following SQL:

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE bloodbankdata (
    id INT PRIMARY KEY,
    blood_type VARCHAR(10),
    quantity DECIMAL,
    compatibility TEXT,
    donor_name VARCHAR(255),
    donor_age INT,
    donor_location VARCHAR(255),
    donor_phone VARCHAR(20)
);
```

Optionally, import the BloodBankDataset.csv data into the bloodbankdata table (see previous responses for the COPY command example).

5. ***Start the backend server:***

```bash
npm start
```

### Frontend Setup

1. ***Navigate to the frontend directory:***

```bash
cd Blood_Bridge-main/Frontend
```

2. ***Install dependencies:***

```bash
npm install
```

3. ***Configure API endpoint:***

Update the base url according to your requirement inside every fetch API request call of components..

4. ***Start the frontend development server:***

```bash
npm start
```
### Screenshot 

<img width="1440" alt="Screenshot 2025-03-12 at 10 22 57 PM" src="https://github.com/user-attachments/assets/c54ccefd-422f-4e5d-8df0-22b30c31ceee" />

<img width="1440" alt="Screenshot 2025-03-12 at 10 23 08 PM" src="https://github.com/user-attachments/assets/cffd3129-e624-4b04-87f1-b574f18ac3e0" />

<img width="1440" alt="Screenshot 2025-03-13 at 12 59 02 AM" src="https://github.com/user-attachments/assets/5a2b4699-2acf-4f66-b095-f49062fbdcd9" />



### Usage

1. Open the application in your browser at http://localhost:5173 (or the port your React development server is running on).

2. Sign up for a new account or log in with existing credentials.

3. If login succeeds, it will take you to the registration page.

4. Complete the registration form, providing name, age, phone, date of birth, latitude, and longitude.

5. Click the "Register" button to search for nearby blood donors.

### API Endpoints

POST /signup: Registers a new user.

Request body: { username, password }

POST /login: Authenticates a user.

Request body: { username, password }

POST /register - Recipient registration after successful login.

GET /users- Shows the user details

### Important Notes

1. Security: This is a basic demonstration. Do not use it directly in production without implementing proper security measures (input validation, authentication tokens, protection against SQL injection, etc.).

2. Database Credentials: Never store your database credentials directly in the code. Use environment variables.

3. Error Handling: Implement comprehensive error handling and user-friendly messages.

4. Licensing: Specify the license for your project in the LICENSE file.

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them with descriptive messages.

4. Submit a pull request.
