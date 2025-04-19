import express from 'express';
import users from '../data/users.mjs';

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by userId
router.get('/:userId', (req, res) => {
  const user = users.find(u => u.userId === req.params.userId);

  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST a new user
router.post('/', (req, res) => {
  const { name, userId, email } = req.body;

  const existingUser = users.find(u => u.userId === userId);
  if (existingUser) return res.status(409).json({ error: 'UserId already exists' });

  const newUser = {
    id: users.length + 1,
    name,
    userId,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) a user
router.put('/:userId', (req, res) => {
  const user = users.find(u => u.userId === req.params.userId);

  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json(user);
});

// DELETE a user
router.delete('/:userId', (req, res) => {
  const index = users.findIndex(u => u.userId === req.params.userId);

  if (index === -1) return res.status(404).json({ error: 'User not found' });

  const deleted = users.splice(index, 1);
  res.json({ message: 'User deleted', user: deleted[0] });
});

export default router;
