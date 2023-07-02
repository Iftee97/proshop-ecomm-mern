import express from 'express';
import { products } from './data/products.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// connect to database
connectDB();

// routes
app.get('/', (req, res) => {
  res.json({ message: 'API is up and running' });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});


// start server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*
  add to package.json maybe:
  "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
*/