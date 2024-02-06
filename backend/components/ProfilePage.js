import React, { useState, useEffect } from 'react';
import JoblyApi from './api'; 

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user profile details from backend
        const fetchUserProfile = async () => {
            const userProfile = await JoblyApi.getUserProfile(); // need getUserProfileMethod
            setUser(userProfile);
        };

        fetchUserProfile();
    }, []);

    if (!user) {
      return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Your Profile</h1>
            <p>Username: {user.username}</p>
        </div>
    );
};

export default ProfilePage;