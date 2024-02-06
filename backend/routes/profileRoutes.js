const express = require('express');
const router = express.Router();
const { requireAuth } = require('./middleware/authMiddleware'); // import authentication middleware
const User = require('./models/User'); // Import user model

// Route to handle profile updates
router.patch('/profile/:username', requireAuth, async (req, res, next) => {
  try {
    const { username } = req.params;
    const { name, email } = req.body;

    // Check if the user making the request is the same as the one being updated
    const updatedUser = await User.findOneAndUpdate(
        { username },
        { $set: { name, email } },
        { new: true: runValidatiors: true }
    );

    // Return the updated user profile
    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }  
});

module.exports = router;