import express from 'express';
import favoriteList from '../data/favoriteList.mjs';
import fruits from '../data/fruits.mjs';
import users from '../data/users.mjs';

const router = express.Router();

router.get('/', (req, res) => {
  const fullList = favoriteList.map((entry) => {
    const user = users.find((u) => u.userId === entry.userId);
    const favoriteFruitDetails = (entry.favoriteFruits || []).map((id) =>
      fruits.find((f) => f.id === id)
    );

    return {
      user: user?.name || 'Unknown',
      email: user?.email || 'N/A',
      favorites: favoriteFruitDetails,
    };
  });

  res.json(fullList);
});

export default router;