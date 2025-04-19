
import express from 'express';
import fruits from '../data/fruits.mjs'; // adjust path as needed

const router = express.Router();

// Route to render fruits page
// Create / Read
//  /api/animal - POST
router
  .route('/')
  .post((req, res) => {
    if (req.body.name && req.body.color) {
      let newFruit = {
        id: fruits.length + 1,
        name: req.body.name,
        color: req.body.color,
      };

      fruits.push(newFruit);

      res.render('show', newFruit);
    } else {
      res.send(`Incorrect Info`);
    }
  })
  .get((req, res) => {
    let options = {
      allFruits: fruits,
    };
    res.render('showAll', options);
  });

//   New Animal Form
router.get('/new', (req, res) => {
  res.render('newFruit');
});

// Update / Delete /Show
router
  .route('/:id')
  .patch((req, res) => {
    console.log(req.body);
    const fruit = fruits.find((a, i) => {
      if (a.id == req.params.id) {
        for (const key in req.body) {
          fruits[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (fruit) res.json(fruit);
    else res.send('Incorrect ID');
  })
  .delete((req, res) => {
    const fruit = fruits.find((a, i) => {
      if (a.id == req.params.id) {
        fruits.splice(i, 1);
        return true;
      }
    });

    if (fruit) res.json(fruit);
    else res.send('Incorrect ID');
  })
  .get((req, res) => {
    const fruit = fruits.find((a, i) => {
      if (a.id == req.params.id) {
        return true;
      }
    });

    let options = {
      id: fruit.id,
      name: fruit.name,
      color: fruit.color,
    };

    if (fruit) res.render('show', options);
    else res.send('Incorrect ID');
  });

export default router;