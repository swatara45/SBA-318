// Imports
import express from 'express';
import fruitRoutes from './routes/fruitRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import path from 'path';
import favoriteListRoutes from './routes/favoriteListRoutes.mjs';
import fs from 'fs'
import bodyParser from 'body-parser';
import error from './error.mjs';

// SetUPs (DB or intializing middleware/express)
const app = express();
const PORT = 3000 || 3001;


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
app.use('api/user', userRoutes);
app.use('api/favoriteList', favoriteListRoutes);



// Error-handling middleware.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});