// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css'; // Import CSS

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Signup successful! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login'); // Redirect after a short delay
                }, 1500);
            } else {
                setMessage(data.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setMessage("An error occurred during signup.");
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Sign Up</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Signup;