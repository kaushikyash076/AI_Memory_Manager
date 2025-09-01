const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Get token from the header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Get the user from the DB using the id in the token
      // Attach the user object to the request, but exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Call next() to move on to the next piece of middleware or the route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };