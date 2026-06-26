import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Seating route is ready' });
});

export default router;
