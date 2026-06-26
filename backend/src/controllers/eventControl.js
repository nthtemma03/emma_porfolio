import pool from '../config/db.js';
import { generateQR } from '../utils/qr.js';

const memoryEvents = [];

//create event
export const createEvent = async (req, res) => {
    try {
        const { name, event_date, event_time, guest_count, table_count, table_shape } = req.body;

        const result = await pool.query(
            'INSERT INTO events (name, event_date, event_time, guest_count, table_count, table_shape) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, event_date, event_time, guest_count, table_count, table_shape]
        );

        const event = result.rows[0];
        const qrCode = await generateQR(event.id);

        await pool.query(
            'UPDATE events SET qr_code = $1 WHERE id = $2',
            [qrCode, event.id]
        );

        res.status(201).json({
            message: 'Event created successfully',
            event: { ...event, qr_code: qrCode }
        });
    } catch (error) {
        console.warn('Database unavailable, using in-memory event store:', error.message);

        const fallbackEvent = {
            id: Date.now(),
            name: req.body.name,
            event_date: req.body.event_date,
            event_time: req.body.event_time,
            guest_count: Number(req.body.guest_count || 0),
            table_count: Number(req.body.table_count || 0),
            table_shape: req.body.table_shape || null,   // ⭐ added
            qr_code: null
        };

        memoryEvents.unshift(fallbackEvent);

        res.status(201).json({
            message: 'Event created successfully using fallback storage',
            event: fallbackEvent
        });
    }
};

//get event details
export const getEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');

        res.status(200).json({
            message: 'Events retrieved successfully',
            events: result.rows
        });
    } catch (error) {
        console.warn('Database unavailable, returning in-memory events:', error.message);
        res.status(200).json({
            message: 'Events retrieved successfully from fallback storage',
            events: memoryEvents
        });
    }
};

//Update event details
export const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { name, date, location } = req.body;

        const result = await pool.query(
            'UPDATE events SET name = $1, date = $2, location = $3 WHERE id = $4 RETURNING *',
            [name, date, location, eventId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({
            message: 'Event updated successfully',
            event: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating event', error);
        res.status(500).json({ message: 'Failed to update event' });
    }
};

//Delete event
export const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        await pool.query('DELETE FROM events WHERE id = $1', [eventId]);

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event', error);
        res.status(500).json({ message: 'Failed to delete event' });
    }
};

