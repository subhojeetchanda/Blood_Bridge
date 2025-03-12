// RegistrationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import opencage from 'opencage-api-client';
import './RegistrationForm.css'; // Import CSS

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [message, setMessage] = useState('');
    const [donorData, setDonorData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    setMessage("Error getting location: " + error.message);
                }
            );
        } else {
            setMessage("Geolocation is not supported by this browser.");
        }
    };
        

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!latitude || !longitude) {
            setMessage("Please enable location or enter coordinates.");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch('http://localhost:3000/register', { // Adjust URL if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    age,
                    phone,
                    dob,
                    latitude,
                    longitude,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful!");
                setDonorData(data); // Store donor data
            } else {
                setMessage(data.message || "Registration failed.");
                setDonorData(null); // Clear any previous data
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occurred during registration.");
            setDonorData(null); // Clear any previous data
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-title">Blood Bridge</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button">Search</button>
                </div>
            </nav>

            <div className="content-container">
            <h2 className="page-title">Blood Recipient Registration</h2>
                <form className="main-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                    </div>
                    <div className="form-group location-inputs">
                        <div>
                            <label htmlFor="latitude">Latitude:</label>
                            <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitude:</label>
                            <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        </div>
                    </div>
                    <div className="location-button">
                        <button type="button" onClick={getLocation}>Get My Location</button>
                    </div>
                    <button type="submit" disabled={loading} className="main-button">
                        {loading ? 'Registering...' : 'Search'}
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
                {donorData && (
                    <div className="donor-data-container">
                        <h3 className="donor-data-title">Available Blood Donors:</h3>
                        <table className="donor-table">
                            <thead>
                                <tr>
                                    <th>Blood Type</th>
                                    <th>Quantity</th>
                                    <th>Compatibility</th>
                                    <th>Donor Name</th>
                                    <th>Donor Age</th>
                                    <th>Donor Location</th>
                                    <th>Donor Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donorData.map((donor, index) => (
                                    <tr key={index}>
                                        <td>{donor.blood_type}</td>
                                        <td>{donor.quantity}</td>
                                        <td>{donor.compatibility}</td>
                                        <td>{donor.donor_name}</td>
                                        <td>{donor.donor_age}</td>
                                        <td>{donor.donor_location}</td>
                                        <td>{donor.donor_phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default RegistrationForm;