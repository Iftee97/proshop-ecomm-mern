import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // Read JWT from the 'jwt' cookie
  // console.log('token from middleware: >>>>>>>>', token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('decoded: >>>>>>>>', decoded);
      req.user = await User.findById(decoded.userId).select('-password'); // exclude password
      // console.log('req.user: >>>>>>>>', req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export {
  protect,
  admin
};
