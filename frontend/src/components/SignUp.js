// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; // Import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        favoriteFood: '',
    });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        // Redirect to submit page with form data
        navigate('/submit', { state: { userData: formData } }); // Pass formData as userData
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label className="label">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label className="label">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label className="label">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label className="label">Age</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <label className="label">Favorite Food</label>
                <input
                    type="text"
                    name="favoriteFood"
                    value={formData.favoriteFood}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
                <button type="submit" className="button">Submit</button>
            </form>
            <div className="footer">
                <p>Already have an account? <a href="/signin">Sign in</a></p>
            </div>
        </div>
    );
};

export default Signup;
