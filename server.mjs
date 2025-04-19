// Imports
import express from 'express';
import fruitRoutes from './routes/fruitRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import favoriteListRoutes from './routes/favoriteListRoutes.mjs';
import fs from 'fs'
import bodyParser from 'body-parser';

// SetUPs (DB or intializing middleware/express)
const app = express();
const PORT = 3000 || 3001;

// Servin static files
app.use(express.static('./styles'));

//Body Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//View Engine
app.engine('file', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    if (options.allFruits) {
      let result = '';

      options.allFruits.forEach((el) => {
        result += `<h2>Name: ${el.name}<h2><h3>color: ${el.color}</h3><a href="/api/fruit/${el.id}"><button>More Info</button></a><br><br>`;
      });

      const rendered = content.toString().replace('#content#', result);

      return callback(null, rendered);
    } else {
      const rendered = content
        .toString()
        .replaceAll('#name#', `${options.name}`)
        .replace('#color#', `${options.color}`)
        .replace('#id#', options.id);

      return callback(null, rendered);
    }
  });
});

app.set('views', './views'); // specify the views directory
app.set('view engine', 'file'); // register the template engine

// Routes
app.use('/api/fruit', fruitRoutes);
//app.use('/user', userRoutes);
//app.use('/favoriteList', favoriteListRoutes);



// Listen
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});