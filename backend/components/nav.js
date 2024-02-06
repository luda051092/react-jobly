import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ currentUser, handleLogout }) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            {currentUser ? (
              <>
                <p>Welcome {currentUser.username}!</p>
                <button onClick={handleLogout}>Logout</button>    
              </>
            
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </> 
            )}
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/profile">Profile</Link>

        </nav>
    );
};

export default Navigation;