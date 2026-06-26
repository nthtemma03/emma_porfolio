import express from 'express';
import cors from 'cors';
import eventRouter from './routes/eventRoute.js';
import guestRouter from './routes/guestRoute.js';
import rsvpRouter from './routes/rsvpRoutes.js';
import seatingRouter from './routes/seatingRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', eventRouter);
app.use('/guests', guestRouter);
app.use('/rsvp', rsvpRouter);
app.use('/seating', seatingRouter);

export default app;
