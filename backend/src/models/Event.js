import pool from '../config/db.js';

export const fetchEvents = async () => {
  const result = await pool.query('SELECT * FROM events ORDER BY id DESC');
  return result.rows;
};

export const insertEvent = async (data) => {
  const { title, date, location } = data;

  const result = await pool.query(
    'INSERT INTO events (title, date, location) VALUES ($1, $2, $3) RETURNING *',
    [title, date, location]
  );

  return result.rows[0];
};
