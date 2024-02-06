import React, { useState } from 'react';
import JoblyApi from './api'; 

const AuthPage = ({ type }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
         if (type === 'login') {
            // Make API call for login
            await JoblyApi.login(formData);
         } else if (type === 'signup') {
            // Make API call for signup
            await JoblyApi.signup(formData);
         }

         // Redirect or perform other actions after successful authentication
        } catch (error) {
            // Handle authentication error
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{type === 'login' ? 'Login' : 'Signup'}</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields for username, password, etc. */}
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">{type === 'login' ? 'Login' : 'Signup'}</button>  

            </form>
        </div>
    );
};

export default AuthPage;