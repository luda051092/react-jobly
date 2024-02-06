import React, { useState } from 'react';
import JoblyApi from './api'; 

const UserProfileEditForm = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault(); // prevent default form submission behavior
        try {
          const updatedUser = await JoblyApi.updateUserProfile(currentUser.username, formData);
          console.log('User profile updated:', updatedUser);
          // Handle the updated user data as needed
        } catch (error) {
          console.error('Error updating user profile:', error);
          // Handle the error
          if (error.response) {
            // request made and returned response was not in 2xx range
            console.error('Server Error:', error.response.data);
          } else if (error.request) {
            // request made but no response received
            console.error('No response from server');
          } else {
            // something occured in the request setup that triggered an error
            console.error('Error setting up request:', error.message);
          }
        } 
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
      <form onSubmit={handleUpdateProfile}>
        {/* Form input fields */}
        {/* Username input */}
        <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        {/* First name input */}
        <label>
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /> 
        </label>

        {/* Last name input */}
        <label>
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>

        {/* Email input */}
        <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} /> 
        </label>

        {/* Password input */}
        <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} /> 
        </label>

        {/* Submit button */}
        <button type="submit">Update Profile</button>
      </form>
    );
};

export default UserProfileEditForm;