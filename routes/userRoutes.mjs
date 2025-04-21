import express from 'express';
import users from '../data/users.mjs'; // make sure this path is correct

const router = express.Router();

// GET all users + POST new user
router
  .route('/')
  .get((req, res) => {
    res.render('showAllUsers', { allUsers: users });
  })
  .post((req, res) => {
    const { name, userId, email } = req.body;
    if (name && userId && email) {
      const newUser = {
        id: users.length + 1,
        name,
        userId,
        email,
      };
      users.push(newUser);
      res.render('userForm', newUser);
    } else {
      res.send('Incomplete User Info');
    }
  });

// Form to add new user
router.get('/new', (req, res) => {
  res.render('newUser');
});

// GET / PATCH / DELETE user by ID
router
  .route('/:id')
  .get((req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.render('userForm', user);
    else res.send('User not found');
  })
  .patch((req, res) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else res.send('User not found');
  })
  .delete((req, res) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else res.send('User not found');
  });

export default router;