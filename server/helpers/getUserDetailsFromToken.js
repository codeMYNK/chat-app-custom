const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session Out",
      logout: true,
    };
  }

  try {
    // Verify the token
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by decoded ID
    const user = await userModel.findById(decode.id).select('-password');

    // If user not found, return null
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log('Error verifying token: ', error.message);
    // Return null or handle error based on your logic
    return {
      message: 'Invalid or expired token',
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
