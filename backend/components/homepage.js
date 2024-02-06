import React from 'react';

const Homepage = ({ currentUser }) => {
    return (
        <div>
            <h1>Welcome to Jobly!</h1>
            {currentUser ? (
                <p>You are logged in, {currentUser.username}!</p>
            ) : (
              <p>Your go-to platform for exploring companies and job opportunities!</p>
            )}    
        </div>
    );
};

export default Homepage;