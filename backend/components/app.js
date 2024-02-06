// App.js (React component)

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JoblyApi from './api';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/AuthPage';
import Homepage from './components/homepage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/nav';
import Profile from './components/profile';
import ProfilePage from './components/ProfilePage';
import UpdateUserProfile from './components/updateUserProfile';
import CompanyDetails from './components/companydetails';
import CompanyCard from './components/companyCard';
import CompanyList from './components/companylist';
import JobCard from './components/JobCard';
import JobList from './components/joblist';




const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');

  useEffect(() => {
    // Load user information when the component mounts or when the token changes
    const loadUserInformation = async () => {
      try {
        const user = await JoblyApi.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading user information:', error);
      }
    };

    loadUserInformation();
  }, []); // Only run this effect once on component mount

  const handleLogin = (token) => {
    // Set the token in the JoblyApi class and update the current user
    JoblyApi.token = token;
    loadUserInformation();
  };

  const handleLogout = () => {
    // Clear the token in the JoblyApi class and reset the current user
    JoblyApi.token = null;
    setCurrentUser(null);
  };

  return (
    <Router>
      <Navigation currentUser={currentUser} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
        </Route>
        <Route path="/login">
          <LoginForm handleLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <SignupForm handleLogin={handleLogin} />
        </Route>
        <Route path="/profile">
          <Profile currentUser={currentUser} />
        </Route>
        <Route path="/update-profile">
          <UpdateUserProfile />
        </Route>
        <Route path="/companies">
          <CompanyList />
        </Route>
        <Route path="/company/:handle">
          <CompanyDetails />
        </Route>
        <Route path="/jobs">
          <JobList />
        </Route>
        <Route path="/job/:id">
          <JobCard />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
