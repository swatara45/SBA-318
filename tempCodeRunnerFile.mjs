// Imports
import express from 'express';
import fruitRoutes from './routes/fruitRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import favoriteListRoutes from './routes/favoriteListRoutes.mjs';
import fs from 'fs'

// SetUPs (DB or intializing middleware/express)
const app = express();
const PORT = 3000 || 3001;

// middleware for error handling
//const error = require('./error')

// Middleware

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
//app.use(express.static('/style.css')); // for CSS

// Set view engine
app.engine('template', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    let render;

    switch (options.page) {
      case 'main':
        render = content.toString().replaceAll('#title#', options.title);
        break;
      case 'image':
        render = content.toString();
        break;
    }

    return callback(null, render);
  });
});

app.set('views', './views');
app.set('view engine', 'template');
// Routes
app.use('/fruit', fruitRoutes);
//app.use('/user', userRoutes);
//app.use('/favoriteList', favoriteListRoutes);



// Listen
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});