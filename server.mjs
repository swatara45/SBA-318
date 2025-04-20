// Imports
import express from 'express';
import fruitRoutes from './routes/fruitRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import path from 'path';
import favoriteListRoutes from './routes/favoriteListRoutes.mjs';
import fs from 'fs'
import bodyParser from 'body-parser';

// SetUPs (DB or intializing middleware/express)
const app = express();
const PORT = 3000 || 3001;

// middleware for error handling
const error = require('./error')

// Serving static files
app.use(express.static('./public'));

//Body Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//View Engine
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

// Routes
app.use('/api/fruit', fruitRoutes);
app.use('/user', userRoutes);
app.use('/favoriteList', favoriteListRoutes);



// Listen
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});