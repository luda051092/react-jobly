import React, { useState, useEffect } from 'react';
import JoblyApi from './api'; 
import UserProfileEditForm from './updateUserProfile';
import JobList from './joblist';

const Profile = ({ currentUser, updateCurrentUser }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
    });

    // State to track whether the profile was successfully updated
    const [updated, setUpdated] = useState(false);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          // Make an API call to update user profile
          const updatedUser = await JoblyApi.updateProfile(formData);
          // Update current user state in the parent component
          updateCurrentUser(updatedUser);

          // Show message of success or redirect to another page 
          setUpdated(true);
        } catch (error) {
          // Handle errors (display error message)
          console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        // Reset updated state after a certain period if necessary
        const timeout = setTimeout(() => setUpdated(false), 5000);
        return () => clearTimeout(timeout);
    }, [updated]);

    // Function to handle job applications
    const handleApply = async (jobId) => {
      try {
        // Apply for a job
        await JoblyApi.applyToJob(jobId);
        // Update user's applied jobs
        const updatedUser = await JoblyApi.getUser(currentUser.username);
        updateCurrentUser(updatedUser);
      } catch (error) {
        // Handle errors (display error message)
        console.error('Error applying for job:', error);
      }
    };

    return (
      <div>
        <h1>EditProfile</h1>
        {/* Display a success message if profile was successfully updated*/}
        {updated && <p>Profile updated successfully!</p>}

          {/* Display profile edit form */}
          <UserProfileEditForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        {/* Display user information */}
        <p>Username: {currentUser.username}</p>
        <p>First Name: {currentUser.firstName}</p>
        <p>Last Name: {currentUser.lastName}</p>
        <p>Email: {currentUser.email}</p>

        {/* Display applied jobs list */}
        <h2>Applied Jobs</h2>
        <JobList jobs={currentUser.applications} handleApply={handleApply} applications={currentUser.applications} />
      </div>  
    );
};

export default Profile;