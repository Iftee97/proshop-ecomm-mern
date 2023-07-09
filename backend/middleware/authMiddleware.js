import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('authorization: >>>>>>>>', authorization);
  if (!authorization) {
    return res.status(401).json({ error: 'authorization token required' })
  }
  const token = authorization.split(' ')[1];
  // console.log('token: >>>>>>>>', token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // exclude password from user object
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "request is not authorized" })
    }
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
