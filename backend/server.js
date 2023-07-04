import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// connect to database
connectDB();

// middlewares
app.use(express.json()); // allows us to accept JSON data in the body
app.use(express.urlencoded({ extended: true })); // allows us to accept form data in the body
app.use(cookieParser()); // allows us to accept cookies
app.use(cors({
  origin: 'http://localhost:3000' || 'https://proshop-ecomm-mern.vercel.app' || '*', // frontend development | production server
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// home route
app.get('/', (req, res) => {
  res.json({ message: 'API is up and running' });
});

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
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
