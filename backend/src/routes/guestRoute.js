import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Guests route is ready' });
});

export default router;
