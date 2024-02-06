"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");
const profileRoutes = require('./routes/profileRoutes'); // Adjust path if necessary

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");

const morgan = require("morgan");


// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Routes
app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);
app.use('/api', profileRoutes); 

// Create instance of App with updateCurrentUser function
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: '',
    name: '',
    email: '',
  });

  // Function to update current user state
  const updateCurrentUser = (newUserData) => {
    setLoggedInUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <div>
      <Profile currentUser={loggedInUser} updateCurrentUser={updateCurrentUser} />
    </div>
  );

};

// Render Profile component
app.get("/profile", (req, res) => {
  res.send(<Profile />);
});


/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
