// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import RegistrationForm from './RegistrationForm';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="/" element={<Signup />} /> {/*  Default route */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;