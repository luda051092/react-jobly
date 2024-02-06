import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Homepage from './routes/Homepage';
import CompanyList from './routes/CompanyList';
import JobList from './routes/JobList';
import AuthPage from './routes/Authpoage';
import ProfilePage from './routes/ProfilePage';
import Profile from './Profile';

const Routes = ({ currentUser, handleLogout }) => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <ProtectedRoute
        path="/companies"
        component={Companies}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <ProtectedRoute
        path="/jobs"
        component={() => (
          <JobList
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
        )}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <ProtectedRoute
        path="/profile"
        component={() => (
          <ProfilePage
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
        )}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
    </Switch>
  );
};

export default Routes;
