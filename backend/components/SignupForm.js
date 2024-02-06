import React, { useState } from 'react';
import JoblyApi from './api';

const SignupForm = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await JoblyApi.register(formData);
            handleLogin();
        } catch (error) {
            // Handle registration error (display message or redirect)
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />   
            </label>
            <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />  
            </label>
            <button type="submit">Signup</button>
        </form>
    );
};

export default SignupForm;