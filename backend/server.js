import express from 'express';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// connect to database
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/products', productRoutes);

// home route
app.get('/', (req, res) => {
  res.json({ message: 'API is up and running' });
});

// error middlewares
app.use(notFound);
app.use(errorHandler);

// start server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
  add to package.json maybe:
  "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
*/
